# endpoints.py
from fastapi import APIRouter
from fastapi.responses import JSONResponse

import openai
import os
import requests
from queryConfig import GPT_API_KEY
from datetime import datetime

import json

from dbAccess import create_db_connection
import pandas

GPT_Router = APIRouter()
engine = create_db_connection()
connection = engine.connect()

openai.api_key = GPT_API_KEY


@GPT_Router.get("/")
def read_root():
    return {"message": "Hello World!"}


def fetch_data_from_db():
    query = """
        SELECT 
            name,
            category,
            location,
            open,
            close,
            contact,
            ST_X(coordinate) as longitude,
            ST_Y(coordinate) as latitude
        FROM db.restaurants
    """

    restaurants_df = pandas.read_sql(query, engine)

    # Convert 'open' and 'close' columns from Timedelta to string
    restaurants_df["open"] = restaurants_df["open"].astype(str).str.split().str[-1]
    restaurants_df["close"] = restaurants_df["close"].astype(str).str.split().str[-1]

    # Convert the longitude and latitude to a coordinate dictionary
    restaurants_df["coordinate"] = restaurants_df.apply(
        lambda row: {"longitude": row["longitude"], "latitude": row["latitude"]}, axis=1
    )

    # Drop the separate longitude and latitude columns
    restaurants_df.drop(columns=["longitude", "latitude"], inplace=True)

    # Convert DataFrame to a dictionary
    restaurants_dict = restaurants_df.to_dict(orient="records")

    # Convert dictionary to a JSON string
    restaurants_str = json.dumps(restaurants_dict, ensure_ascii=False)

    return restaurants_str


@GPT_Router.post("/query")
def generate_response(params: dict):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-16k",
        messages=[
            {
                "role": "system",
                "content": "Here's the list of available data: " + fetch_data_from_db(),
            },
            {
                "role": "system",
                "content": "The current time(hh:mm:ss) now is: "
                + datetime.now().strftime("%H:%M:%S"),
            },
            {
                "role": "system",
                "content": "Here's the description of the provided data.\n"
                "The provided data is the database of the restaurants with some information in it. This DBMS is using MySQL.\n"
                "In this database, There are 3 tables, 'restaurants', 'reviews', 'user_information'",
            },
            {
                "role": "system",
                "content": "Your task is to generate a list of restaurants based on the provided data. Your response must be in a structured JSON-like format. Here are your instructions: \n"
                "1. Review the list of restaurants.\n"
                "2. Calculate the actual time the user will go to the restaurant. They might specify the time in different ways such as 'after 5 hours', 'at 23:00:00', 'at 23', etc. Parse the user's input to determine this time in the format 'hh:mm:ss'.\n"
                "Once you've determined this time, consider it with restaurants' 'open' and 'close' time. The calculated time should be between the 'open' and 'close' times of the restaurant.\n"
                "3. Use the data of the open restaurants directly without modifying the structure.\n"
                "4. Combine the selected restaurants into an array named 'restaurants'.\n"
                "5. Your response should also include a 'message' in Korean describing your selection.\n"
                "6. Your final response should be only: {message: 'your_message', restaurants: [selected_restaurants_list]}. Please ensure the data is in a structured, JSON-like format.\n"
                "7. Once again, you must consider and calculate the time that user said. If the calculated time that user said is later than the 'close' time of the restaurant, then that restaurant is not valid and must not be shown or suggested.\n"
                "for example, if user said he will go to the restaurants after 5 hours at 18:00:00, that means that he will arrive at the restaurants at 23:00:00. So the calculated timeis 23:00:00.\n"
                "The name '양미옥' restaurants' 'close' time is 20:40:00. It's after the calculated time which is 23:00:00. Then the '양미옥' restaurant is invalid, so it must not be suggested and shown to user.",
            },
            {"role": "user", "content": params["message"]},
        ],

        temperature=0,
    )

    # Print the generated response
    answer = response.choices[0].message["content"]
    print(answer)
    return {"answer": answer}


# Everything below stands for testing. Ignore them.
@GPT_Router.get("/test/query/1")
def test_response():
    print("hi")
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {
                "role": "system",
                "content": "You have to answer in the following format : {message : string, restaurants: {name: string;category: string;coordinate: { latitude: number; longitude: number };location: string;last_order: string;contact: string;}[]}."
                + "And content of message must be korean."
                + "In the restaurants array, there should be objects in list below."
                + "In the restaurants array, ther should be additional information, which is the coordinate of the restaurant. You have to convert location into coordinate. "
                + "Your restaurants[] must be part of List of data below. restaurants[] can be an empty array. ",
            },
            {"role": "system", "content": "List of data is as follows : " + test_data},
            {
                "role": "system",
                "content": "Time now is : "
                + datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                + " so your answer must include open restaurants.",
            },
            {"role": "user", "content": "recommend me some japanese food."},
        ],
        temperature=0.2,
    )

    # Print the generated response
    print(response.choices[0].message["content"])
    return response.choices[0].message["content"]


@GPT_Router.get("/test/query/2")
def test_response():
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {
                "role": "system",
                "content": "for every object in the restaurants list, you have to check if the restaurant is open or not"
                + "",
            },
            {"role": "system", "content": "List of data is as follows : " + test_data},
            {
                "role": "system",
                "content": "Time now is : "
                + datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                + " so your answer must include open restaurants.",
            },
            {"role": "user", "content": "recommend me some japanese food."},
        ],
        temperature=0.2,
    )

    # Print the generated response
    print(response.choices[0].message["content"])
    return response.choices[0].message["content"]


@GPT_Router.get("/test/function")
def test_function():
    fetch_data_from_db()
    return
