# endpoints.py
from fastapi import APIRouter
from fastapi.responses import JSONResponse

import openai
import os
import requests
from queryConfig import GPT_API_KEY
from queryConfig import test_data
from datetime import datetime

import json

GPT_Router = APIRouter()

openai.api_key = GPT_API_KEY


@GPT_Router.get("/")
def read_root():
    return {"message": "Hello World!"}


@GPT_Router.post("/query")
def generate_response(params: dict):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "Please respond in the specified format: {message: string, restaurants: [{name: string, category: string, coordinate: {latitude: number, longitude: number}, location: string, last_order: string, contact: string}]}."
                + "Ensure your response is in Korean."
                + "You will receive a list of restaurants, and you should select objects from them."
                + "If there is no relevant data, leave the restaurants[] empty."
            },
            {"role": "system",
                "content": "The list of available data is as follows: " + test_data},
            {
                "role": "system",
                "content": "The current time is: "
                + datetime.now().strftime("%Y-%m-%d %H:%M:%S")
                + " Your response should only include currently open restaurants from the given list.",
            },
            {"role": "user", "content": params["message"]},
        ],
        temperature=0,


    )

    # Print the generated response
    answer = json.loads(response.choices[0].message["content"])
    print(answer["message"])
    return {"answer": response.choices[0].message["content"]}


# Everything below stands for testing. Ignore them.
@GPT_Router.get("/query/test/1")
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

@GPT_Router.get("/query/test/2")
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
