import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import React from "react";
import { fetchData } from "../services/fetchData";



const MyMapComponent = withScriptjs(withGoogleMap((props) =>{
    
  return <GoogleMap
    googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBx88sfhulbtSOSN1U3UxWL-P67PEExBiE&v=3.exp&libraries=geometry,drawing,places"
    defaultZoom={8}
    defaultCenter={{ lat: props.cityCord.lat, lng: props.cityCord.lon }}
    center={{ lat: props.cityCord.lat, lng: props.cityCord.lon }}
  >
    {props.isMarkerShown && <Marker position={{  lat: props.cityCord.lat, lng: props.cityCord.lon }} />}
  </GoogleMap>
}))

export default MyMapComponent;

