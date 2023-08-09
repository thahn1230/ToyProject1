# endpoints.py
from fastapi import APIRouter

router = APIRouter()

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
