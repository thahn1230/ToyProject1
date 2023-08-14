import { useEffect, useRef, useState } from 'react';

function useMarker(data:any) {
  const mapRef = useRef<HTMLElement | null | any>(null);
//   const [markers, setMarkers] = useState<
//     { latitude: number; longitude: number } | string
//   >('');

// export interface RestaurantType {
//     name: string;
//     category: string;
//     coordinate: { latitude: number; longitude: number };
//     location: string;
//     last_order: string;
//     contact: string;
//   }
  
  useEffect(() => {
    for(var restaurant in data)
    {
        var newMarker =  new naver.maps.Marker({
            position: new naver.maps.LatLng(data.coordinate.latitude, data.coordinate.longitude),
            map: map,
            title: data.name,
            icon: {
                content: [
                            '<div class="cs_mapbridge">',
                                '<div class="map_group _map_group crs">',
                                    '<div class="map_marker _marker num1 num1_big"> ',
                                        '<span class="ico _icon"></span>',
                                        '<span class="shd"></span>',
                                    '</div>',
                                '</div>',
                            '</div>'
                        ].join(''),
                size: new naver.maps.Size(38, 58),
                anchor: new naver.maps.Point(19, 58),
            },
            draggable: true
        });
    }
  }, [data]);

}

export default useMarker;