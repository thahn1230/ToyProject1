# endpoints.py
from fastapi import APIRouter
from fastapi.responses import JSONResponse

import openai
import os
import requests
import pandas as pd
from queryConfig import GPT_API_KEY
from queryConfig import test_data
from datetime import datetime

import json
from dbAccess import create_db_connection

router = APIRouter()
engine = create_db_connection()
connection = engine.connect()

openai.api_key = GPT_API_KEY


@router.get("/")
def read_root():
    return {"message": "Hello World!"}


@router.get("/test")
def test(params: dict):
    return {"query": "query here", "answer": "answer here", "method": "post"}


@router.post("/test")
def test(params: dict):
    print(params)

    return {"query": "query here", "answer": "answer here", "method": "post"}


@router.post("/test/query")
def generate_response(params: dict):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You have to answer in the following format : {message : string, restaurants:[]}."
                + "And content of message must be korean."
                + "In the restaurants array, there should be objects in list below."
                + "In the restaurants array, ther should be additional information, which is the coordinate of the restaurant. You have to convert location into coordinate",
            },
            {"role": "system", "content": "List of data is as follows : " + test_data},
            {
                "role": "system",
                "content": "Time now is : "
                + datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                + " so your answer must include open restaurants.",
            },
            {"role": "user", "content": params["message"]},
        ],
        temperature=0.2,
    )

    # Print the generated response
    answer = json.loads(response.choices[0].message["content"])
    print(answer["message"])
    return {"answer": response.choices[0].message["content"]}


# for testing. ignore it


@router.get("/test/query/asd")
def test_response():
    print("hi")
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You have to answer in the following format : {message : string, restaurants:[]}."
                + "And content of message must be korean."
                + "In the restaurants array, there should be objects in list below."
                + "In the restaurants array, ther should be additional information, which is the coordinate of the restaurant. You have to convert location into coordinate",
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


@router.get("/get_restaurants_name")
def get_restaurants_name():
    query = """
        SELECT name FROM restaurants 
    """

    name_data = pd.read_sql(engine, query)

    return JSONResponse(name_data.to_json(force_ascii=False, orient="records"))
