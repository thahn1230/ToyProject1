import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import type { NextPage } from "next";
import styled from "styled-components";
import useMap from "./useMap";
import useMarker from "./useMarker";
import {
  HomeBody,
  HomeHeader,
  MapContainer,
} from "../components/home/home.styles";
import ChatContainer from "@/components/Chat/ChatContainer";
import { RestaurantType } from "@/types/restaurant.type";

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

      <HomeHeader>Header</HomeHeader>
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
