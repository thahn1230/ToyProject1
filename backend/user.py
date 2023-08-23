from fastapi import APIRouter
from fastapi.responses import JSONResponse

from fastapi import Depends, FastAPI, HTTPException, Header

from fastapi import FastAPI, HTTPException, status
from fastapi.security import HTTPBasic, HTTPBasicCredentials

from dbAccess import create_db_connection
from sqlalchemy.orm import Session
from sqlalchemy import text

import pandas as pd
import jwt
from pydantic import BaseModel
from userLoginConfig import SECRET_KEY, ACCESS_TOKEN_EXPIRE_MINUTES

UserRouter = APIRouter()
engine = create_db_connection()
connection = engine.connect()

class Token(BaseModel):
    user_id: str

# Endpoint to retrieve reviews for a specific user
@UserRouter.get("/user/reviews")
def get_user_reviews(Authorization: str =  Header(None)): 
    user_id = Authorization.split(" ")[1]

    query = f"""
        SELECT *
        FROM db.revies
        WHERE id = "{user_id}";
    """

    reviews_df = pd.read_sql(query, engine)
    print(reviews_df)
    return 0

@UserRouter.get("/get_restaurants_name")
def get_restaurants_name():
    query = """
        SELECT name FROM db.restaurants;
    """

    restaurants_name_df = pd.read_sql(query, engine)

    return JSONResponse(restaurants_name_df.to_json(force_ascii=False, orient="records"))
