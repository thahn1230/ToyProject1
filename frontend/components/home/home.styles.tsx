import styled from "@emotion/styled";

export const HomeHeader = styled.header`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0px 10px;
  height: 10vh;
  // background-color: #0b6121;
  opacity: 1;
  box-shadow: 0px 0px 10px 0px rgba(4, 38, 13, 0.6);
  z-index: 2;
`;

export const HomeBody = styled.div`
  display: flex;
  width: 100%;
  height: 90vh;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin: 0px;
  background-color: #f2f2f2;
  opacity: 0.8;
  z-index: 1;
`;

export const MapContainer = styled.div`
  padding: 3%;
  width: 80%;
  height: 100%;
`;
