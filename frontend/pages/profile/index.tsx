import HeaderLeft from "@/components/Header/HeaderLeft";
import HeaderRight from "@/components/Header/HederRight";
import { HomeBody, HomeHeader } from "@/components/home/home.styles";
import {
  ProfileBody,
  ProfileBodyContent,
  ProfileBodyHeader,
  ReviewContainer,
  ReviewWriteContainer,
  ReviewBox,
  FixedHeightReview,
} from "@/components/profile/profile.styles";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useSWRConfig } from "swr";
import styled from "styled-components";

const StyledDropdownButton = styled.select`
  padding: 2.5px;
  border: 1px solid #ccc;
  border-radius: 5px; /* 테두리를 둥글게 만듭니다 */
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1); /* 미세한 그림자 추가 */
  font-size: 13px;
`;

import LeaveStars from "@/components/profile/LeaveStars";
import { handleClientScriptLoad } from "next/script";
// import "@/styles/LeaveReview.css"

interface reviewI {
  restaurant_name: string;
  rating: number;
  description: string;
}

export default function ProfilePage() {
  const [reviews, setReviews] = useState<reviewI[]>([]);
  const [reviewList, setReviewList] = useState<JSX.Element[]>([
    <div key={0}>Loading...</div>,
  ]);
  const [writtenReview, setWrittenReview] = useState<reviewI>();

  const [userName, setUserName] = useState("");
  const [currentReview, setCurrentReview] = useState("");

  const [options, setOptions] = useState([]);
  const [dropdownValue1, setDropdownValue1] = useState("");
  const [dropdownValue2, setDropdownValue2] = useState("");
  const [rating, setRating] = useState(0)
  const { mutate } = useSWRConfig();

  const [rating, setRating] = useState(0);

  useEffect(() => {
    console.log(writtenReview);
  }, [writtenReview]);

  useEffect(() => {
    const writtenReview = reviews.find(
      (item) => item.restaurant_name === dropdownValue1
    );
    console.log(writtenReview);
    setWrittenReview(writtenReview);
    if (writtenReview !== undefined) {
      setCurrentReview(writtenReview.description);
      setRating(writtenReview.rating);
    } else {
      setCurrentReview("");
      setRating(0);
    }
  }, [dropdownValue1]);

  useEffect(() => {
    getReviews();
    fetchUserName();
    fetchRestaurantList();
  }, []);

  const fetchRestaurantList = () => {
    fetch("http://localhost:8000" + "/get_restaurants_name", {
      method: "GET",
      headers: {
        Authorization: `Bearer `,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((response) => {
        const namelist = JSON.parse(response).map((item: any) => item.name);

        setOptions(namelist);
        setDropdownValue1(namelist[0]);
      })
      .catch((error) => console.error("Error:", error));
  };

  const fetchUserName = () => {
    const storedUserName = localStorage.getItem("name");
    if (storedUserName === null) return;
    setUserName(storedUserName);
  };

  const renderStar = (index: number, rating: number) => {
    let starClass = "star";

    if (rating >= index) {
      starClass += " filled";
    } else if (rating > index - 1) {
      starClass += " half-filled";
    }

    return <div key={index} className={starClass}></div>;
  };



  useEffect(()=>{
    setReviewList(
      reviews.map((review: reviewI, index: number) => (
        <div key={index} style={{}}>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: "10px" }}>
              {review.restaurant_name}{" "}
            </div>
            <div style={{ display: "flex" }}>
              {[1, 2, 3, 4, 5].map((index) =>
                renderStar(index, review.rating)
              )}{" "}
            </div>
          </div>
          <div>{review.description} </div>
          <div>---</div>
        </div>
      ))
    );
  },[reviews])

  const getReviews = () => {
    fetch("http://localhost:8000/user/reviews", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // 유저 아이디에 따라 수정
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((userReviews) => {
        setReviews(JSON.parse(userReviews));
      })
      .catch((error) => console.error("Error:", error));
  };

  const writeReviewToFile = () => {
    if (currentReview.trim() === "") {
      window.alert("리뷰를 작성해주세요!");
      return;
    } else if (dropdownValue1 === "") {
      window.alert("레스토랑을 선택해주세요!");
      return;
    }

    const newReview = {
      restaurant_name: dropdownValue1,
      rating: rating,
      description: currentReview,
    };

    fetch("http://localhost:8000/user/new_review", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`, // 유저 아이디에 따라 수정
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        review_info: {
          restaurant_name: dropdownValue1,
          rating: rating,
          description: currentReview,
        },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(() => {
        const updatedReviews: reviewI[] = [...reviews, newReview];
        setReviews(updatedReviews);
        setCurrentReview(""); // 작성 후 칸 비우기
      })
      .catch((error) => console.error("Error:", error));
  };

  const onStarChange = (newRating: number) => {
    setRating(newRating);
  };

  const handleDropdownChange1 = (e) => {
    setDropdownValue1(e.target.value);
  };

  const handleDropdownChange2 = (e) => {
    setDropdownValue2(e.target.value);
  };


  return (
    <>
      <Head>
        <title>프로필</title>
      </Head>

      <HomeHeader>
        <HeaderLeft />
        <HeaderRight />
      </HomeHeader>
      <ProfileBody>
        <ProfileBodyContent>
          <ReviewContainer>
            <div style={{ display: "flex", width: "100%", height: "100vh" }}>
              <div
                style={{
                  flex: 1,
                  paddingLeft: "8px",
                  paddingBottom: "8px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <StyledDropdownButton
                    value={dropdownValue1}
                    onChange={handleDropdownChange1}
                  >
                    {options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </StyledDropdownButton>
                </div>

                {writtenReview !== undefined ? (
                  <LeaveStars
                    initialRating={rating}
                    onChange={onStarChange}
                  ></LeaveStars>
                ) : (
                  <LeaveStars
                    initialRating={0}
                    onChange={onStarChange}
                  ></LeaveStars>
                )}

                <ReviewWriteContainer>
                  <div style={{ flex: "1 1 auto", overflow: "hidden" }}>
                    <textarea
                      style={{
                        width: "100%",
                        height: "100%",
                        resize: "none",
                        border: "1px solid #ccc",
                        padding: "8px",
                      }}
                      value={currentReview}
                      onChange={(e) => setCurrentReview(e.target.value)}
                    />
                  </div>
                  <button
                    style={{ alignSelf: "flex-end", marginTop: "8px" }}
                    onClick={() => {
                      if (currentReview.trim() === "") {
                        window.alert("리뷰를 작성해주세요!");
                      } else if(rating ===0){
                        window.alert("별점을 매겨주세요!");
                      }
                      else {
                        writeReviewToFile();
                        setCurrentReview(""); // 작성 후 칸 비우기
                      }
                    }}
                  >
                    리뷰 작성
                  </button>
                </ReviewWriteContainer>
              </div>
              <div style={{ flex: 1, overflow: "auto", paddingLeft: "16px" }}>
                <h3>작성한 리뷰 목록</h3>
                <div>{reviewList}</div>
              </div>
            </div>
          </div>

          </ReviewContainer>
        </ProfileBodyContent>
      </ProfileBody>
    </>
  );
}

