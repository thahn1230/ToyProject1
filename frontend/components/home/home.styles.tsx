import styled from "@emotion/styled";

export const HomeHeader = styled.header`
  display: flex;
  width: 100%;
  height: 10vh;
  border: 1px solid green;
`;

export const HomeBody = styled.div`
  display: flex;
  width: 100%;
  height: 90vh;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid black;
  margin: 0px;
`;
export const MapContainer = styled.div`
  width: 80%;
  height: 100%;
  background-color: #f0f0f0;
  border: 1px solid red;
`;
export const ChatContainer = styled.div`
  width: 20%;
  height: 100%;
  border: 1px solid blue;
`;

export const ChatHeader = styled.div`
  width: 100%;
  height: 10%;
  border: 1px solid black;
`;
export const ChatBody = styled.div`
  width: 100%;
  height: 90%;
  border: 1px solid black;
`;

export const ChatMessages = styled.div`
  width: 100%;
  height: 60%;
`;

export const ChatInput = styled.input`
  width: 100%;
  height: 10%;
`;