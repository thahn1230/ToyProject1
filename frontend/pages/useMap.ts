import { MapContainer } from "@/components/home/home.styles";
import { useEffect, useRef, useState } from "react";

function useMap(data: any) {
  const mapRef = useRef<HTMLElement | null | any>(null);
  const [myLocation, setMyLocation] = useState<
    { latitude: number; longitude: number } | string
  >("");
  const [markers, setMarkers] = useState<naver.maps.Marker[]>([])

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
  // 기존 마커 제거
  for(var i in markers)
  {
    markers[i].setMap(null)
  }
  // 새로운 마커 생성
  for (var restaurant of data) {
    (function(restaurant) {
      var marker = new naver.maps.Marker({
        position: new naver.maps.LatLng(restaurant.coordinate.latitude, restaurant.coordinate.longitude),
        map: mapRef.current,
      });
      markers.push(marker)

      var contentString = [
        '<div class="iw_inner">',
        '   <h3>' + restaurant.name + '</h3>',
        '   <h3>' + restaurant.category + '</h3>',
        '   <h3>' + restaurant.last_order + '</h3>',
        '   <h3>' + restaurant.contact + '</h3>',
        '</div>',
      ].join('');

      var infowindow = new naver.maps.InfoWindow({
        content: contentString,
      });

      naver.maps.Event.addListener(marker, "click", function (e) {
        if (infowindow.getMap()) {
          infowindow.close();
        } else {
          infowindow.open(mapRef.current, marker);
        }
      });
    })(restaurant);
  }
}, [data]);




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
