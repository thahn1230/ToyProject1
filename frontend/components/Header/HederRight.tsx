import Image from "next/image";
import { HeaderLeftWrapper } from "./HeaderLeft.styles";
import { HeaderRightWrapper, LoginButton } from "./HeaderRight.styles";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { Router, useRouter } from "next/router";

const HeaderRight = () => {
  const profileModalRef = useRef<HTMLDivElement | null>(null);
  const [showModal, setShowModal] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.reload();
  };
  const router = useRouter();

  useEffect(() => {
    const handleOutsideClick = (e: { target: any }) => {
      if (showModal && !profileModalRef.current?.contains(e.target)) {
        setShowModal(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [showModal]);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  return (
    <HeaderRightWrapper>
      {!token ? (
        <LoginButton>
          <Link
            href="/login"
            style={{
              width: "100%",
              height: "100%",
              textDecoration: "none",
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              fontFamily: "Roboto, sans-serif",
              color: "black",
              fontWeight: "bold",
              fontSize: "1rem",
              // border: "1px solid black",
            }}
          >
            <div>로그인</div>
            <FiLogIn style={{ width: "25px", height: "25px" }}></FiLogIn>
          </Link>
        </LoginButton>
      ) : (
        <>
          <FiLogOut onClick={handleLogout}></FiLogOut>
          <div>{localStorage.getItem("name")}</div>
          <Link href="/profile">
            <Image
              src="/ProfileImage.png"
              width={50}
              height={50}
              alt="profile"
            ></Image>
          </Link>
        </>
      )}
    </HeaderRightWrapper>
  );
};

export default HeaderRight;
