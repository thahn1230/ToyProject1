from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.security import OAuth2PasswordBearer
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from dbAccess import create_db_connection
from sqlalchemy.orm import Session
from sqlalchemy import text
from functools import wraps

import pandas as pd
import jwt
from datetime import datetime, timedelta
from userLoginConfig import SECRET_KEY, ACCESS_TOKEN_EXPIRE_MINUTES

LoginRouter = APIRouter()
engine = create_db_connection()
connection = engine.connect()

# 로그인
# jwt토큰을 사용하지 않고, id로 유저를 식별함
@LoginRouter.post("/login")
async def login(params: dict):

    user_id = params["login_info"]["id"]
    password = params["login_info"]["password"]

    query = f"""
        SELECT *
        FROM db.user_information
        WHERE id = "{user_id}" AND password = "{password}"
    """

    login_df = pd.read_sql(query, engine)

    if login_df.empty:
        return {"status": False, "token": ""}
    else:
        return {"status": True, "token": user_id}


# 회원가입
@LoginRouter.post("/sign_up")
async def sign_up(params: dict):
    user_id = params["join_info"]["id"]
    password = params["join_info"]["password"]
    name = params["join_info"]["name"]

    idDupQuery = f"""
        SELECT *
        FROM db.user_information
        WHERE id = "{user_id}";
    """

    login_df = pd.read_sql(idDupQuery, engine)

    if not login_df.empty:
        return {"status" : False, "message" : "이미 존재하는 ID입니다."}

    with Session(engine) as session:
        session.execute(
            text(
                """
                INSERT INTO db.user_information VALUES (:id, :password, :name);
            """
            ),
            {"id": user_id, "password": password, "name": name}
        )

        session.commit()

    return {"status" : True, "message" : "성공적으로 회원가입이 완료되었습니다."}
