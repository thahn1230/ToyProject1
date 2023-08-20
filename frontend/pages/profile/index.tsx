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
import { useState } from "react";
import { useSWRConfig } from "swr";

export default function ProfilePage() {
  const [reviews, setReviews] = useState([]);
  const { mutate } = useSWRConfig();

  const getReviews = () => {
    fetch("http://localhost:8000/query", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((response) => {
        setReviews(response.reviews);
      })
      .catch((error) => console.error("Error:", error));

    // setData([{ name: "test", coordinate: { latitude: 0, longitude: 0 } }]);
    // setMessages([{ isUser: false, content: "test" }, ...messages]);
  };

  const handleWriteReview = (data: { description: string; rating: number }) => {
    fetch("http://localhost:8000/query", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rating: data.rating,
        description: data.description,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        mutate("http://localhost:8000/query");
        return response.json();
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.error("Error:", error));
  };
  return (
    <>
      <Head>
        <title>profile</title>
      </Head>

      <HomeHeader>
        <HeaderLeft />
        <HeaderRight />
      </HomeHeader>
      <ProfileBody>
        <ProfileBodyHeader>
          <ProfileBodyHeader></ProfileBodyHeader>
        </ProfileBodyHeader>
        <ProfileBodyContent>
          <ReviewContainer></ReviewContainer>
        </ProfileBodyContent>
      </ProfileBody>
    </>
  );
}
