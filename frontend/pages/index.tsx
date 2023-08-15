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

export default function Home() {
  return (
    <Link href="/home">
      <a>Home</a>
    </Link>
  );
}
