import Head from "next/head";
import { useEffect } from "react";

export default function ProfilePage() {

  useEffect(()=>{
    const getReviews = () => {
      fetch("http://localhost:8000/user/reviews", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
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
          console.log("review retrieved : ")
          console.log(response)
          // setReviews(response.reviews);
        })
        .catch((error) => console.error("Error:", error));
  
      // setData([{ name: "test", coordinate: { latitude: 0, longitude: 0 } }]);
      // setMessages([{ isUser: false, content: "test" }, …messages]);
    };
    getReviews();
  },[])


  return (
    <>
      <Head>
        <title>profile</title>
      </Head>

      <h1>Profile Page</h1>
    </>
  );
}
