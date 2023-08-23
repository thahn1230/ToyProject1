import styled, { css, keyframes } from "styled-components";

export const LoginBox = styled.div`
  width: 50%;
  height: 80%;
  // padding: 50px 0px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

export const LoginHeader = styled.div`
  width: 100%;
  height: 30%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  // border: 1px solid #bdc3c7;
`;

export const LoginTitle = styled.div`
  width: 30%;
  height: 40px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 18px;
  font-weight: 100;
  padding-top: 20px;
  font-family: "Noto Sans KR", sans-serif;
  padding: 10px 10px;
  position: relative;
  cursor: pointer;
  &:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${(props) => (props.active ? "100%" : "0")};
    height: 2px;
    background-color: black;
    transition: width 0.3s ease-in-out;
  }
`;

export const LoginBody = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LoginInputWrapper = styled.div`
  width: 50%;
  height: 50px;
  margin-top: 20px;
  border: 1px solid #bdc3c7;
  border-radius: 5px;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
`;

export const LoginInputTitle = styled.div`
  width: auto;
  height: 20px;
  top: -22.5%;
  display: flex;
  padding: 0px 5px;
  align-items: center;
  justify-content: center;
  font-family: "Noto Sans KR", sans-serif;
  background-color: white;
  font-size: 13px;
  position: absolute;
`;

export const LoginInput = styled.input`
  width: 60%;
  border: none;
  font-size: 20px;
  font-family: "Noto Sans KR", sans-serif;
  flex-grow: 1;
  &:focus {
    outline: none;
  }
  font-size: 15px;
  //   border: 1px solid #bdc3c7;
  // position: absolute;
`;

export const PasswordVissibleButton = styled.div`
  height: 25px;
  width: 25px;
  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

export const LoginButtonWrapper = styled.button`
  width: 50%;
  height: 50px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  background-color: #0b6121;
  color: white;
  font-size: 20px;
  font-family: "Noto Sans KR", sans-serif;

  &:focus {
    outline: none;
  }
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;
