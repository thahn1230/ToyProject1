import Head from "next/head";
import {
  HomeBody,
  HomeHeader,
  MapContainer,
} from "../../components/home/home.styles";
import HeaderLeft from "../../components/Header/HeaderLeft";
import ChatContainer from "../../components/Chat/ChatContainer";
import { useState } from "react";
import { RestaurantType } from "@/types/restaurant.type";
import useMap from "@/pages/useMap";
import HeaderRight from "../../components/Header/HederRight";
import styled from "styled-components";
import { Routes } from "react-router-dom";

const MapBox = styled.div`
  width: 100%;
  height: 100%;
`;

export default function Home() {
  const [data, setData] = useState<Array<RestaurantType>>([]);
  useMap(data);

  const [selectedRestaurant, setSelectedRestaurant] =
    useState<RestaurantType | null>(null);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <HomeHeader>
        <HeaderLeft />
        <HeaderRight />
      </HomeHeader>
      <HomeBody>
        <MapContainer>
          <MapBox id="map"></MapBox> {/* MapBox 컴포넌트 사용 */}
        </MapContainer>
        <ChatContainer
          data={data}
          setData={setData}
          setRestaurant={setSelectedRestaurant}
        />
      </HomeBody>
    </>
  );
}
