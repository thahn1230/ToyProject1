# endpoints.py
from fastapi import APIRouter
from fastapi.responses import JSONResponse
import openai
import os
import requests

router = APIRouter()

openai.api_key = "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"

@router.get("/")
def read_root():
    return {"message": "Hello World!"}


@router.get("/test")
def test(params: dict):
    
    return {"query": "query here",
    "answer" : "answer here",
     "method" : "post"
    }


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
        model="gpt-3.5-turbo-16k-0613",
        messages=[
        #     {
        #     "role" : "system",
        #     "content" : prompt
        # },
        {
            "role" : "user",
            "content" : params['message']
        }
        ],
        temperature=0.2
        )

    print(response.choices[0].message['content'])  # Print the generated response
    return response.choices[0].message['content']

@router.get("/test/query/asd")
def test_response(params:dict):
    #openai.api_key = "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"
  

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
            {
            "role": "user",
            "content": "User message goes here."
            }
        ],
        temperature=0.2
    )

    print(response.choices[0].message['content'])  # Print the generated response
    return response