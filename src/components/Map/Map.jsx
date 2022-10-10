import { useEffect, useRef, useState } from "react";
// --- (1), (2) & (3): install and import ---
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import {GeoSearchControl, OpenStreetMapProvider} from "leaflet-geosearch"
import L, { marker } from "leaflet";
import { Icon } from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/leaflet.css";
import './react-leaflet-geosearch.css';
// --- ---------------------------------- ---

export function Map() {
  const [LatLng, setLatLng] = useState([43.855647048388406,-79.333713054657]);

  // map will center on user's location upon loading
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        setLatLng([latitude, longitude]);
    let marker = L.marker([LatLng[0], LatLng[1]])
    });
  }, []);

  const SearchField = () => {
    const map = useMap()
    const provider = new OpenStreetMapProvider()
    useEffect(() => {
    const searchControl = new GeoSearchControl({
      provider: provider,
      searchLabel: "Enter address",
      notFoundMessage: 'Sorry, that address could not be found.',
      showMarker: false,
      marker: {
        icon: new Icon({iconUrl: icon}),
        // draggable: true,
      },
      popupFormat: ({ query, result }) => result.label,
      maxMarkers: 1,
      updateMap: true,
      autoClose: false,
      keepResult: false,
      style: 'button',
    });
      map.on('geosearch/showlocation', (result) => {
    //   console.log(result.location)
      setLatLng([result.location.y, result.location.x])
    })
      // map.on('geosearch/marker/dragend', () => {})

      map.addControl(searchControl);
      return () => map.removeControl(searchControl)
    }, [])
    return null;
  }

  // Function for Dropping Pins, getting Lat/Lng data back
  const MapEvents = () => {
    useMapEvents({
      click(e) {
        setLatLng([e.latlng.lat, e.latlng.lng])
      },
    });
    return LatLng ? (
      <Marker
        position={LatLng}
        icon={
          new Icon({
            iconUrl: icon,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })
        }
      >
        <Popup>Your address at: Lat {LatLng[0]}, Long {LatLng[1]}</Popup>
      </Marker>
    ) : null;
  };

  // this function will re-center map at the Dropped Pin
  const RecenterAuto = ({coords}) => {
    const map = useMap()
    useEffect(() => {
      map.setView(coords)
    }, )
  }


  return (
    <MapContainer center={[0,0]} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // --- (7) Alternative map style (attribution and url copied from the leaflet extras website) ---
        // attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
        // url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
        // --- -------------------------------------------------------------------------------------- ---
      />
      <SearchField 
        
      />
      return LatLng ? (
      <Marker
        position={LatLng}
        icon={
          new Icon({
            iconUrl: icon,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })
        }
      >
        <Popup>Your address at: Lat {LatLng[0]}, Long {LatLng[1]}</Popup>
      </Marker>
    ) : null;
      {/* <MapEvents /> */}
      <RecenterAuto coords={LatLng} />
    </MapContainer>
  );
}
