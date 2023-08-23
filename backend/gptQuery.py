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
    restaurants_df['open'] = restaurants_df['open'].astype(str).str.split().str[-1]
    restaurants_df['close'] = restaurants_df['close'].astype(str).str.split().str[-1]


    # Convert the longitude and latitude to a coordinate dictionary
    restaurants_df['coordinate'] = restaurants_df.apply(lambda row: {'longitude': row['longitude'], 'latitude': row['latitude']}, axis=1)

    # Drop the separate longitude and latitude columns
    restaurants_df.drop(columns=['longitude', 'latitude'], inplace=True)

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
                "content": "Your task is to generate a list of restaurants based on the provided data and return it in a structured JSON format. Follow these steps:\n"
                "1. Review the list of restaurants.\n"
                "2. Determine the actual time the user plans to visit the restaurant based on their input. Inputs might be like '5시간 뒤에', '밤 11시', '23시', etc. Convert this to 'hour:minute:second' format. "
                "Given the current time is " + datetime.now().strftime("%H:%M:%S") + ", calculate the user's intended visit time.\n"
                "For example, if the current time is 15:30:00 and if user said that he will visit after 3 hours, intended visit time is 18:30:00.\n"
                "For example, if the current time is 15:30:00 and if user said that he will visit after 30 minutes, intended visit time is 16:00:00.\n"
                "3. Select the restaurants open at the intended visit time. Ensure the calculated time falls between the 'open' and 'close' times of the restaurant.\n"
                "When determining if the calculated time falls between 'open' and 'close' time, consider the hours first and if they have same hour, consider minutes. If the minute is also the same, consider it as 'do not fall'.\n"
                "4. Combine the selected restaurants into an array named 'restaurants'.\n"
                "5. Include a 'message' in Korean summarizing your selection.\n"
                "6. Your final response format should be: {message: 'your_message', restaurants: [selected_restaurants_list]}. This is the most important.\n"
            },
            {
                "role": "system",
                "content": "Here's the list of available data: " + fetch_data_from_db()
            },
            {
                "role": "user",
                "content": params["message"]
            },
        ],

        temperature=0,
    )


    # Print the generated response
    answer =response.choices[0].message["content"]
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
                + "Your restaurants[] must be part of List of data below. restaurants[] can be an empty array. "
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
                + ""
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
