import Image from "next/image";
import { HeaderLeftWrapper } from "./HeaderLeft.styles";
import { HeaderRightWrapper, LoginButton } from "./HeaderRight.styles";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { Router, useRouter } from "next/router";

const HeaderRight = () => {
  const profileModalRef = useRef<HTMLDivElement | null>(null);
  const [token, setToken] = useState<{} | null>(null);
  const handleLogout = () => {
    localStorage.removeItem("token");
    router.reload();
  };
  const router = useRouter();

  useEffect(() => {
    const newToken = localStorage.getItem("token");
    setToken(newToken);
  }, [token]);

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
          <Link href="/profile">
            <Image
              src="/ProfileImage.png"
              width={50}
              height={50}
              alt="profile"
            ></Image>
          </Link>
          <div>{localStorage.getItem("name")}</div>
          <FiLogOut onClick={handleLogout}></FiLogOut>
        </>
      )}
    </HeaderRightWrapper>
  );
};

export default HeaderRight;
