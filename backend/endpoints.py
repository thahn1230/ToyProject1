# endpoints.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def read_root():
    return {"message": "Hello World!"}


@router.post("/test")
def test(params: dict):
    
    return {"query": "query here",
    "answer" : "answer here"
    }
