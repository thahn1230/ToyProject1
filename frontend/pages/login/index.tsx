import { LoginButton } from "@/components/Header/HeaderRight.styles";
import {
  LoginBody,
  LoginBox,
  LoginButtonWrapper,
  LoginHeader,
  LoginInput,
  LoginInputTitle,
  LoginInputWrapper,
  LoginTitle,
  PasswordVissibleButton,
} from "@/components/login/Login.styles";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";

export default function Login() {
  const [isSignIn, setIsSignIn] = useState(true);
  const handleIsSignIn = () => {
    if (!isSignIn) {
      setIsSignIn(true);

      setId("");
      setPw("");
      setPwCheck("");
      setName("");
    }
  };
  const handleIsSignUp = () => {
    if (isSignIn) {
      setIsSignIn(false);

      setId("");
      setPw("");
      setPwCheck("");
      setName("");
    }
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handlePasswordVisible = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [pwCheck, setPwCheck] = useState("");
  const [name, setName] = useState("");
  const [isPwCheck, setIsPwCheck] = useState(true);
  useEffect(() => {
    if (pwCheck === "" || pwCheck === pw) setIsPwCheck(true);
    else setIsPwCheck(false);
  }, [pwCheck]);

  const router = useRouter();

  const handleSignIn = async () => {
    await fetch("http://10.221.71.119:8000" + "/login", {
      method: "POST",
      headers: {
        Authorization: `Bearer `,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login_info: { id: id, password: pw },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((response) => {
        if (response.status) {
          localStorage.setItem("token", response.token);
          localStorage.setItem("name", response.name);
        }
        if (localStorage.getItem("token")) router.push("/");
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleSignUp = async () => {
    if (id === "") return alert("아이디를 입력하세요");
    if (pw === "") return alert("비밀번호를 입력하세요");
    if (pwCheck === "") return alert("비밀번호를 다시 입력하세요");
    if (name === "") return alert("이름을 입력하세요");
    if (!isPwCheck) return alert("비밀번호가 일치하지 않습니다");
    await fetch("http://10.221.71.119:8000" + "/sign_up", {
      method: "POST",
      headers: {
        Authorization: `Bearer `,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        join_info: { id: id, password: pw, name: name },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((response) => {
        if (response.status) {
          alert(response.message);
          setId("");
          setPw("");
          setPwCheck("");
          setName("");
          setIsSignIn(true);
        } else {
          alert(response.message);
          setId("");
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoginBox>
        <LoginHeader>
          <LoginTitle active={isSignIn} onClick={handleIsSignIn}>
            Sign In
          </LoginTitle>
          <LoginTitle active={!isSignIn} onClick={handleIsSignUp}>
            Sign Up
          </LoginTitle>
        </LoginHeader>
        <LoginBody>
          <LoginInputWrapper>
            <LoginInputTitle>ID</LoginInputTitle>
            <LoginInput
              placeholder="아이디를 입력하세요"
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              style={{ width: "245px" }}
            ></LoginInput>
          </LoginInputWrapper>
          <LoginInputWrapper>
            <LoginInputTitle>Password</LoginInputTitle>
            <LoginInput
              placeholder={
                isSignIn
                  ? "비밀번호를 입력하세요"
                  : "새로운 비밀번호를 입력하세요"
              }
              type={isPasswordVisible ? "text" : "password"}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              style={{ width: isSignIn ? "210px" : "245px" }}
            ></LoginInput>
            {isSignIn &&
              (isPasswordVisible ? (
                <PasswordVissibleButton>
                  <AiFillEye
                    onClick={handlePasswordVisible}
                    style={{ width: "100%", height: "100%" }}
                  />
                </PasswordVissibleButton>
              ) : (
                <PasswordVissibleButton>
                  <AiFillEyeInvisible
                    onClick={handlePasswordVisible}
                    style={{ width: "100%", height: "100%" }}
                  />
                </PasswordVissibleButton>
              ))}
            {}
          </LoginInputWrapper>
          {!isSignIn && (
            <>
              <LoginInputWrapper
                style={{
                  border: isPwCheck ? "1px solid #bdc3c7" : "1px solid red",
                }}
              >
                <LoginInputTitle
                  style={{
                    color: isPwCheck ? "black" : "red",
                  }}
                >
                  Password Check
                </LoginInputTitle>
                <LoginInput
                  placeholder="비밀번호를 다시 입력하세요"
                  type={isPasswordVisible ? "text" : "password"}
                  value={pwCheck}
                  onChange={(e) => setPwCheck(e.target.value)}
                  style={{ width: isSignIn ? "210px" : "245px" }}
                ></LoginInput>
              </LoginInputWrapper>
              <LoginInputWrapper>
                <LoginInputTitle>Name</LoginInputTitle>
                <LoginInput
                  placeholder="이름을 입력하세요"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={{ width: "245px" }}
                ></LoginInput>
              </LoginInputWrapper>
            </>
          )}
          <LoginButtonWrapper onClick={isSignIn ? handleSignIn : handleSignUp}>
            {isSignIn ? "Sign In" : "Sign Up"}
          </LoginButtonWrapper>
        </LoginBody>
      </LoginBox>
    </div>
  );
}
