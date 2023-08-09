# endpoints.py
from fastapi import APIRouter
from fastapi.responses import JSONResponse
import openai
import os
import requests
from queryConfig import GPT_API_KEY
router = APIRouter()

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

    return {"query": "query here",
    "answer" : "answer here",
    "method" : "post"
    }

@router.post("/test/query")
def generate_response(params:dict):
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
        {
            "role": "system",
            "content": "you have to answer everything in korean"
        },
        {
            "role" : "user",
            "content" : params['message']
        }
        ],
        temperature=0.2
        )

    print(response.choices[0].message['content'])  # Print the generated response
    return {'answer':response.choices[0].message['content']}

# for testing. ignore it
@router.get("/test/query/asd")
def test_response():
    print("hi")
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
            "role": "system",
            "content": "you have to answer everything in korean"
            },
            {
            "role": "user",
            "content": "tell me about keyboard"
            }
        ],
        temperature=0.2
    )

    print(response.choices[0].message['content'])  # Print the generated response
    return response.choices[0].message['content']
