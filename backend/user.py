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


# not yet updated
# @router.get("/user/profile")
# def get_user_info(token: TokenData = Depends(verify_user)): 
#     query = f"""
#     SELECT *
#     FROM db.user_information
#     WHERE id = "{token["id"]}"
#     """

#     user_df = pd.read_sql(query, engine)

#     id = user_df["id"].iloc[0]
#     name = user_df["name"].iloc[0]
#     job_position = user_df["job_position"].iloc[0]
#     company = user_df["company"].iloc[0]
#     email_address = user_df["email_address"].iloc[0]
#     phone_number = user_df["phone_number"].iloc[0]
#     user_type = user_df["user_type"].iloc[0]

#     return {"id" : id,
#             "name" : name,
#             "job_position" : job_position,
#             "company" : company,
#             "email_address" : email_address,
#             "phone_number" : phone_number,
#             "user_type" : user_type,
#             }

# # not yet updated
# @router.post("/user/change_info")
# async def change_user_info(params: dict, token: TokenData = Depends(verify_user)):

#     user_id = token["id"]
#     name = params["join_info"]["name"]
#     job_position = params["join_info"]["job_position"]
#     company = params["join_info"]["company"]
#     email_address = params["join_info"]["email_address"]
#     phone_number = params["join_info"]["phone_number"]
#     user_type = params["join_info"]["user_type"]
#     try :
#         with Session(engine) as session:
#             session.execute(
#                 text(
#                     """
#                     UPDATE `user_information` SET `name` = :name, 
#                     `job_position` = :job_position, `company` = :company,
#                     `email_address` = :email_address, 
#                     `phone_number` = :phone_number,
#                     `user_type` = :user_type
#                     WHERE (`id` = :user_id)
#                 """
#                 ),
#                 {
#                     "user_id": user_id,
#                     "name": name, 
#                     "job_position": job_position, 
#                     "company": company, 
#                     "email_address": email_address, 
#                     "phone_number": phone_number, 
#                     "user_type": user_type,
#                 }
#             )

#             session.commit()
#     except Exception as e:
#         print("An error occurred: ", e)
#         session.rollback()
#         return False

#     return True

# # not yet updated
# @router.post("/user/change_pw")
# async def change_password(params: dict, token: TokenData = Depends(verify_user)):
    user_id = token["id"]
    query = f"""
        SELECT password FROM user_information
        WHERE id = "{user_id}"
    """
    current_pw_db = pd.read_sql(query, engine)["password"].iloc[0]
    current_pw_client = params["pw_info"]["current_pw"]
    changed_pw = params["pw_info"]["changed_pw"]
    
    # 파알못 팀장님 string 값비교는 == != 입니다
    # is, is not은 객체 비교라서 엄연히 달라요
    # -의문의 기홍씨-
    if current_pw_db != current_pw_client :
        print("Password not correct")
        return False
    else :
        try :
            with Session(engine) as session:
                session.execute(
                    text(
                        """
                        UPDATE `user_information` SET `password` = :password
                        WHERE (`id` = :user_id)
                    """
                    ),
                    {
                        "user_id": user_id,
                        "password": changed_pw, 
                    }
                )

                session.commit()
        except Exception as e:
                print("An error occurred: ", e)
                session.rollback()
                return False
            
    return True