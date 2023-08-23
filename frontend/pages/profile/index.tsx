import HeaderLeft from "@/components/Header/HeaderLeft";
import HeaderRight from "@/components/Header/HederRight";
import { HomeBody, HomeHeader } from "@/components/home/home.styles";
import {
  ProfileBody,
  ProfileBodyContent,
  ProfileBodyHeader,
  ReviewContainer,
  ReviewWriteContainer,
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

import LeaveReview from "@/components/profile/LeaveReview";
// import "@/styles/LeaveReview.css"


export default function ProfilePage() {
  const [reviews, setReviews] = useState([]);
  const [userName, setUserName] = useState("");
  const [currentReview, setCurrentReview] = useState("");
  const [dropdownValue1, setDropdownValue1] = useState("");
  const [dropdownValue2, setDropdownValue2] = useState("");
  const { mutate } = useSWRConfig();

  const options = [
    "옵션 1",
    "옵션 2",
    "옵션 3",
    // ... 더 많은 옵션들
  ];

  useEffect(() => {
    getReviews();
    fetchUserName();
  }, []);

  const fetchUserName = () => {
    const storedUserName = localStorage.getItem("name");
    setUserName(storedUserName);
  };

  const getReviews = () => {
    fetch("/reviews.json")
      .then((response) => response.json())
      .then((data) => {
        setReviews(data.reviews);
      })
      .catch((error) => console.error("Error:", error));
  };

  const writeReviewToFile = (data) => {
    const newReview = { description: data.description };
    const updatedReviews = [...reviews, newReview];

    fetch("/reviews.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ reviews: updatedReviews }),
    })
      .then(() => {
        setReviews(updatedReviews);
      })
      .catch((error) => console.error("Error:", error));
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

            <div style={{ display: 'flex', width: '100%', height: '100vh' }}>
              <div style={{ flex: 1, paddingLeft: '8px', paddingBottom: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <StyledDropdownButton value={dropdownValue1} onChange={handleDropdownChange1}>
                    {options.map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </StyledDropdownButton>
                </div>
                
                <ReviewWriteContainer>
                  <div style={{ flex: '1 1 auto', overflow: 'hidden' }}>
                    <textarea
                      style={{ width: '100%', height: '100%', resize: 'none', border: '1px solid #ccc', padding: '8px' }}
                      value={currentReview}
                      onChange={(e) => setCurrentReview(e.target.value)}
                    />
                  </div>
                  <button
                    style={{ alignSelf: 'flex-end', marginTop: '8px' }}
                    onClick={() => {
                      if (currentReview.trim() === "") {
                        window.alert("리뷰를 작성해주세요!");
                      } else {
                        writeReviewToFile({ description: currentReview });
                        setCurrentReview(""); // 작성 후 칸 비우기
                      }
                    }}
                  >
                    리뷰 작성
                  </button>
                </ReviewWriteContainer>
              </div>
              <div style={{ flex: 1, overflow: 'auto', paddingLeft: '16px' }}>
                <h3>작성한 리뷰 목록</h3>
                <div>
                  {reviews.map((review, index) => (
                    <div key={index}>{review.description}</div>
                  ))}
                </div>
              </div>
            </div>
          </ReviewContainer>
        </ProfileBodyContent>
      </ProfileBody>
    </>
  );
}
