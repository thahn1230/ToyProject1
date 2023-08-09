import styled from "@emotion/styled";

export const ChatContainerWrapper = styled.div`
  width: 20%;
  height: 100%;
  border: 1px solid blue;
`;

export const ChatHeader = styled.div`
  width: 100%;
  height: 5%;
  border: 1px solid blue;
`;
export const ChatBody = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  // border: 1px solid black;
`;

export const ChatMessages = styled.div`
  overflow-y: scroll;
  width: 100%;
  height: 94%;
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  // height: 300px;
  border: 1px solid black;
`;

export const ChatMessage = styled.div`
  width: 300px;
  height: 30px;
  display: flex;
  border: 1px solid black;
  margin: 2px;
  flex-shrink: 0;
`;

export const ChatInputWrapper = styled.div`
  width: 100%;
  height: 6%;
  border: 1px solid black;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
