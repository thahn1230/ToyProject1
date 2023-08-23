import styled from "styled-components";

export const ProfileBody = styled.div`
  display: flex;
  width: 100%;
  height: 90vh;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  margin: 0px;
  background-color: #f2f2f2;
  opacity: 0.8;
  z-index: 1;
`;

export const ProfileBodyHeader = styled.div`
  width: 90%;
  height: 25%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

export const ProfileBodyHeaderTitle = styled.div``;

export const ProfileBodyContent = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
`;

export const ProfileBodyContentTitle = styled.div``;

export const ReviewContainer = styled.div`
  width: 95%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ReviewWriteContainer = styled.div`
  width: 100%;
  height: 95%;
  display: flex;
  flex-direction: column;
`;


export const ReviewBox = styled.div`
  width: 97%;
  padding-top: 17px;
  height: 500px;
  flex-direction: column;
  overflow-y: scroll;
  padding-right: 10px;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
`;



export const FixedHeightReview = styled.div`
  height: 100px;
  margin-bottom: 8px;
  padding: 8px;
  border: 1px solid #ccc;
  overflow: hidden; /* 내용이 100px를 넘어갈 경우 내용을 숨김 */
`;
