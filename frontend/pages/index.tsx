import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import type { NextPage } from "next";
import styled from "styled-components";
import useMap from "./useMap";

import {
  HomeBody,
  HomeHeader,
  MapContainer,
} from "../components/home/home.styles";
import ChatContainer from "@/components/Chat/ChatContainer";
import { RestaurantType } from "@/types/restaurant.type";
import HeaderLeft from "@/components/Header/HeaderLeft";
import HeaderRight from "@/components/Header/HederRight";
import { BrowserRouter, Route } from "react-router-dom";
import Link from "next/link";

const MapBox = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
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
