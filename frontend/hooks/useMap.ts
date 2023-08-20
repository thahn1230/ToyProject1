import { MapContainer } from "@/components/home/home.styles";
import { RestaurantType } from "@/types/restaurant.type";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

function useMap(
  data: any,
  selectedRestaurant: RestaurantType | null,
  setSelectedRestaurant: any
) {
  const mapRef = useRef<HTMLElement | null | any>(null);
  const [myLocation, setMyLocation] = useState<
    { latitude: number; longitude: number } | string
  >("");
  const [markers, setMarkers] = useState<naver.maps.Marker[]>([]);

  useEffect(() => {
    // geolocation 이용 현재 위치 확인, 위치 미동의 시 기본 위치로 지정
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setMyLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    } else {
      window.alert("현재 위치를 알 수 없어 기본 위치로 지정합니다.");
      setMyLocation({ latitude: 37.4862618, longitude: 127.1222903 });
    }
  }, []);

  useEffect(() => {
    if (typeof myLocation !== "string") {
      // 현재 위치 추적
      let currentPosition = [myLocation.latitude, myLocation.longitude];

      // Naver Map 생성
      mapRef.current = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(currentPosition[0], currentPosition[1]),
        zoomControl: true,
      });
    }
  }, [myLocation]);

  // export interface RestaurantType {
  //     name: string;
  //     category: string;
  //     coordinate: { latitude: number; longitude: number };
  //     location: string;
  //     last_order: string;
  //     contact: string;
  //   }

  useEffect(() => {
    // 기존 마커와 인포윈도우 제거
    markers.forEach((marker: any) => {
      marker.setMap(null);
      if (marker.infowindow) {
        marker.infowindow.close();
      }
    });

    const newMarkers = [];

    // 새로운 마커 생성
    for (var restaurant of data) {
      (function (restaurant) {
        const selected =
          selectedRestaurant && restaurant.name === selectedRestaurant.name;

        const content = !selected
          ? `
          <div class="marker" >
            <div class="marker_text">
              ${restaurant.name}
            </div>
          </div>`
          : `
          <div class="iw_inner">
            <div class="iw_header">
              <div class="iw_title iw_header_content">${restaurant.name}</div>
              <div class="iw_category iw_header_content">${restaurant.category}</div>
            </div>
              <p>${restaurant.location}</p>
              <p>Last Order: ${restaurant.last_order}</p>
              <p>Contact: ${restaurant.contact}</p>
          </div>
        `;
        // const content = `<div style="width:1px;height:1px;border:1px solid black;"></div>`;

        var marker: any = new naver.maps.Marker({
          position: new naver.maps.LatLng(
            restaurant.coordinate.latitude,
            restaurant.coordinate.longitude
          ),
          icon: {
            content: content,
          },
          map: mapRef.current,
        });
        newMarkers.push(marker);

        naver.maps.Event.addListener(marker, "click", function (e) {
          if (selected) {
            setSelectedRestaurant(null);
          } else {
            setSelectedRestaurant(restaurant);
          }
        });

        // var contentString = [
        //   '<div class="iw_inner">',
        //   "   <h3>" + restaurant.name + "</h3>",
        //   "   <h3>" + restaurant.category + "</h3>",
        //   "   <h3>" + restaurant.last_order + "</h3>",
        //   "   <h3>" + restaurant.contact + "</h3>",
        //   "</div>",
        // ].join("");

        // const infoWindow = new naver.maps.InfoWindow({
        //   content: InfoWindowcontentString,
        //   anchorSize: new naver.maps.Size(0, 20),
        //   borderWidth: 0,
        //   backgroundColor: "transparent",
        //   disableAnchor: false,
        // });

        // naver.maps.Event.addListener(marker, "click", function (e) {
        //   if (infoWindow.getMap()) {
        //     infoWindow.close();
        //   } else {
        //     infoWindow.open(mapRef.current, marker);
        //   }
        // });

        // marker.infoWindow = infoWindow; // 마커와 인포윈도우 연결

        // if (selectedRestaurant && restaurant.name === selectedRestaurant.name) {
        //   infoWindow.open(mapRef.current, marker);
        // }
      })(restaurant);
    }

    setMarkers(newMarkers); // 새로운 마커로 업데이트
    if (selectedRestaurant) {
      const { latitude, longitude } = selectedRestaurant.coordinate;
      mapRef.current.setCenter(new naver.maps.LatLng(latitude, longitude));
    }
  }, [data, selectedRestaurant]);

  // useEffect(()=> {
  //   var marker = new naver.maps.Marker({
  //     position: new naver.maps.LatLng(37.2968448, 126.970108),
  //     map: mapRef.current
  //   });

  //   var contentString = [
  //     '<div class="iw_inner">',
  //     '   <h3>서울특별시청</h3>',
  //     '   <p>{res.contact}<br>',
  //     '       <img src="./img/hi-seoul.jpg" width="55" height="55" alt="서울시청" class="thumb" /><br>',
  //     '       02-120 | 공공,사회기관 > 특별,광역시청<br>',
  //     '       <a href="http://www.seoul.go.kr" target="_blank">www.seoul.go.kr/</a>',
  //     '   </p>',
  //     '</div>'
  // ].join('');

  //   var infowindow = new naver.maps.InfoWindow({
  //       content: contentString
  //   });

  //   naver.maps.Event.addListener(marker, "click", function(e) {
  //     if (infowindow.getMap()) {
  //         infowindow.close();
  //     } else {
  //         infowindow.open(mapRef.current, marker);
  //     }
  // });

  // }, [myLocation]);

  return {
    myLocation,
  };
}

export default useMap;
