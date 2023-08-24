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
    fetch_data = fetch_data_from_db()
    time = datetime.now().strftime("%H:%M:%S")
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo-16k",
        messages=[
            {
                "role": "system",
                "content": "Here's the list of restaurants: " + fetch_data,
            },
            {
                "role": "system",
                "content": "The current time(hh:mm:ss) now is: " + time,
            },
            {
                "role": "system",
                "content": "Here's the description of the provided data.\n"
                "The provided data is the database of the restaurants with some information in it. This DBMS is using MySQL.\n"
                "In this database, There are 3 tables, 'restaurants', 'reviews', 'user_information'\n"
                "Use 'open' and 'close' columns to find out the validity of the restaurants' time. 'open' is opening time and 'close' is closing time.",
            },
            {
                "role": "system",
                "content": "Your task is to generate a list of restaurants based on the provided data. Your response must be in a structured JSON-like format. Here are your instructions: \n"
                "1. Review the list of restaurants.\n"
                "2. Calculate the actual time the user will go to the restaurant. They might specify the time in different ways such as 'now', 'after 5 hours', 'at 23:00:00', 'at 23', etc. Parse the user's input to determine this time in the format 'hh:mm:ss'.\n"
                "Once you've determined this time, consider the validity with restaurants' 'open' and 'close' time.\n"
                "Format of time is hour:minute:second. Hour should be bigger or equal than that of opening time, and should be smaller or equal than that of closing time. If hours are same, then compare minute in the same way.\n"
                "If it does not match the condition, never insert it into the restaurants array in your response.\n"
                "3. Use the data of the open restaurants directly without modifying the structure.\n"
                "4. Combine the selected restaurants into an array named 'restaurants'.\n"
                "5. Your final response should be only: {message: 'your_message', restaurants: [selected_restaurants_list]}. Please ensure the data is in a structured, JSON-like format.\n"
                "6. Your response, in 'message', it should also include a 'message' in Korean describing your selection and the calculated time.\n"
                "7. Once again, you must consider and calculate the time that user said. If the calculated time that user said is later than the 'close' time of the restaurant, then that restaurant is not valid and must not be shown or suggested.\n",
            },
            {"role": "user", "content": params["message"]},
        ],
        temperature=0.2,
    )

    # Print the generated response
    answer = response.choices[0].message["content"]
    print(answer)
    return {"answer": answer}
