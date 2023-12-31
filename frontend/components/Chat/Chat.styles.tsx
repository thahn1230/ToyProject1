import styled from "@emotion/styled";

export const ChatContainerWrapper = styled.div`
  width: 30%;
  height: 100%;
  padding: 3%;
  // border: 1px solid blue;
`;

export const ChatBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  // background-color: lightgray;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  // border: 1px solid black;
  padding: 5px;
`;

export const ChatMessages = styled.div`
  overflow-y: scroll;
  width: 100%;
  height: 90%;
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
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
  flex-shrink: 0;
  padding: 10px 20px 10px 20px;
  word-break: break-all;
  // opacity: 0.7;
  font-family: "Roboto", sans-serif;
`;

export const ChatMessageRestaurantWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  flex-shrink: 0;
  border-radius: 10px;
  box-shadow: ${(props) =>
    props.selected ? "0px 0px 10px 0px rgba(0, 0, 0, 0.5)" : ""};
  :hover {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    transition: 0.5s;
  }
  // border: 1px solid black;
  :active {
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 1);
  }
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
  font-weight: ${(props) => (props.role === "title" ? "bold" : "normal")};
  font-size: ${(props) => (props.role === "title" ? "1.2rem" : "0.8rem")};
  "font-weight: bold;"}// border: 1px solid black;
`;

export const ChatInputContainer = styled.div`
  width: 95%;
  height: 55px;
  display: flex;
  margin: 15px;
  padding: 0px 0px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  // border: 1px solid black;
`;

export const ChatInputWrapper = styled.input`
  width: 80%;
  height: 50px;
  border-radius: 20px;
  padding: 20px;
  border: 1px solid #229954;
  font-size: 1rem;
  font-family: "Roboto", sans-serif;

  &:focus {
    outline: none;
  }
`;

export const ChatInputButton = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #229954;
  &:hover {
    // background-color: #27ae60;
    opacity: 0.8;
    color: white;
    transition: 0.5s;
  }
  // border: none;
`;
