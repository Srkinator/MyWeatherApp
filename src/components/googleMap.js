import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import React from "react";
import { fetchData } from "../services/fetchData";



const MyMapComponent = withScriptjs(withGoogleMap((props) =>{

    
  return <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: props.cityCord.lat, lng: props.cityCord.lon }}
    center={{ lat: props.cityCord.lat, lng: props.cityCord.lon }}
  >
    {props.isMarkerShown && <Marker position={{  lat: props.cityCord.lat, lng: props.cityCord.lon }} />}
  </GoogleMap>
}))

export default MyMapComponent;