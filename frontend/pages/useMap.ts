import { useEffect, useRef, useState } from "react";

function useMap(data: any) {
  const mapRef = useRef<HTMLElement | null | any>(null);
  const [myLocation, setMyLocation] = useState<
    { latitude: number; longitude: number } | string
  >("");

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

  useEffect(() => {
    for (var restaurant of data) {
      var newMarker = new naver.maps.Marker({
        position: new naver.maps.LatLng(
          restaurant.coordinate.latitude,
          restaurant.coordinate.longitude
        ),
        map: mapRef.current,
        title: restaurant.name,
        icon: {
          content: [
            '<div class="cs_mapbridge">',
            '<div class="map_group _map_group crs">',
            '<div class="map_marker _marker num1 num1_big"> ',
            '<span class="ico _icon"></span>',
            '<span class="shd"></span>',
            "</div>",
            "</div>",
            "</div>",
          ].join(""),
          size: new naver.maps.Size(38, 58),
          anchor: new naver.maps.Point(19, 58),
        },
        draggable: true,
      });
    }
  }, [data]);

  return {
    myLocation,
  };
}

export default useMap;
