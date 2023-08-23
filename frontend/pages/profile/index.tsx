import HeaderLeft from "@/components/Header/HeaderLeft";
import HeaderRight from "@/components/Header/HederRight";
import { HomeBody, HomeHeader } from "@/components/home/home.styles";
import {
  ProfileBody,
  ProfileBodyContent,
  ProfileBodyHeader,
  ReviewContainer,
} from "@/components/profile/profile.styles";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useSWRConfig } from "swr";

export default function ProfilePage() {
  const [reviews, setReviews] = useState([]);
  const [userName, setUserName] = useState("");
  const [currentReview, setCurrentReview] = useState("");
  const { mutate } = useSWRConfig();

  useEffect(() => {
    getReviews();
    fetchUserName();
  }, []);

  const fetchUserName = () => {
    // 유저 이름을 가져오는 로직 추가
    // 예시로 localStorage에서 가져오는 것으로 가정
    const storedUserName = localStorage.getItem("name");
    
    setUserName(storedUserName);
  };

  const getReviews = () => {
    // 리뷰 데이터를 JSON 파일로부터 가져오는 로직 추가
    fetch("/reviews.json") // reviews.json 파일의 경로에 맞게 수정
      .then((response) => response.json())
      .then((data) => {
        setReviews(data.reviews);
      })
      .catch((error) => console.error("Error:", error));
  };

  const writeReviewToFile = (data) => {
    // 새 리뷰를 JSON 파일에 추가하는 로직 추가
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
        // 리뷰 추가 후 리뷰 목록 업데이트
        setReviews(updatedReviews);
      })
      .catch((error) => console.error("Error:", error));
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
            <div style={{ display: 'flex', width: '100%' , height: '100vh'}}>
              <div style={{ flex: 1, width: '100%'}}>
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <textarea
                    style={{ width: '100%', flex: 1 }}
                    rows={5}
                    value={currentReview}
                    onChange={(e) => setCurrentReview(e.target.value)}
                  />
                  <button
                    style={{ alignSelf: 'flex-end' }}
                    onClick={() => {
                      writeReviewToFile({ description: currentReview });
                      setCurrentReview(""); // 작성 후 칸 비우기
                    }}
                  >
                    리뷰 작성
                  </button>
                </div>
              </div>
              <div style={{ flex: 1 }}>
                <h3>작성한 리뷰 목록</h3>
                <ul>
                  {reviews.map((review, index) => (
                    <li key={index}>{review.description}</li>
                  ))}
                </ul>
              </div>
            </div>
            </ReviewContainer>
        </ProfileBodyContent>
      </ProfileBody>
    </>
  );
}
