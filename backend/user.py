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
def get_user_reviews(params: dict, user_id: str = Header(None)):
    restaurant_name = params["restaurant_name"]
    rating = params["rating"]
    description = params["description"]

    try:
        with Session(engine) as session:
            session.execute(
                text(
                    """
                    INSERT INTO reviews (user_id, restaurant_name, rating, description)
                    VALUES (:user_id, :restaurant_name, :rating, :description);
                """
                ),
                {
                    "user_id": user_id,
                    "restaurant_name": restaurant_name,
                    "rating": rating,
                    "description": description,
                },
            )

            session.commit()
            return True
    except Exception as e:
        print("An error occurred: ", e)
        session.rollback()
        return False
