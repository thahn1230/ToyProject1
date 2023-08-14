import styled from "@emotion/styled";

export const ChatContainerWrapper = styled.div`
  width: 30%;
  height: 100%;
  border: 1px solid blue;
`;

export const ChatBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: lightgray;

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
  // border: 1px solid black;
`;

export const ChatMessageWrapper = styled.div`
  width: 90%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin: 2px;
  flex-shrink: 0;
  word-break: break-all;
  // border: 1px solid black;
`;

export const ChatMessageTextWrapper = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  // border: 1px solid black;
  margin-bottom: 10px;
  flex-shrink: 0;
  padding: 10px 15px;
  word-break: break-all;
  font-family: "Roboto", sans-serif;
`;

export const ChatMessageRestaurantWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin: 2px;
  flex-shrink: 0;
  // border: 1px solid black;
`;

export const ChatMessageRestaurantTextWrapper = styled.div`
  width: auto;
  height: auto;
  display: flex;
  flex-direction: column;
  margin: 2px;
  flex-shrink: 0;
  // border-radius: 10px;
  padding: 5px;
  word-break: break-all;
  // background-color: #e6e5eb;
  // border: 1px solid black;
`;

export const ChatInputWrapper = styled.div`
  width: 95%;
  height: 6%;
  display: flex;
  margin: 15px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  border: 1px solid black;
`;

export const ChatInputButton = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid black;
  border-radius: 50%;
  &:hover {
    background-color: black;
    color: white;
    transition: 0.5s;
  }
`;
