import React, { Component } from 'react';
import './App.css';
// import { Switch, Route } from "react-router-dom";
// import SingleCity from "../src/components/singleCity";
// // import FeedFrame from "../src/common/feedFrame";
// import Search from "../src/common/search";
import { fetchData } from "./services/fetchData";
import { Sparklines, SparklinesLine, SparklinesReferenceLine } from "react-sparklines";
import MyMapComponent from "./components/googleMap";

const style = {
  height: "100%"
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      cityData: null,
      cityCord: "",
      error:""
    }

    this.handleChange = this.handleChange.bind(this);
    this.searchClick = this.searchClick.bind(this);
    this.searchClick = this.searchClick.bind(this);
  }

  componentDidMount() {
    fetchData.getData("forecast", "Belgrade", (response) => {

      this.setState({
        cityData: response.data.list,
        cityCord: response.data.city.coord
      });

    });

  }

  handleChange(event) {
    const searchString = event.target.value;
    this.setState({
      searchTerm: searchString
    });

  }

  handleKeyPress =(e)=> {
    if (e.key === "Enter") {
        this.searchClick();
    }
}

  searchClick() {
    fetchData.getData("forecast", this.state.searchTerm, response => {
      this.setState({
        cityData: response.data.list,
        cityCord: response.data.city.coord,
        searchTerm: ""
      });
    },
    error =>{
      alert("Please enter a valid city");
      this.setState({
        searchTerm:""
      });
    });
  }

  render() {
    if (this.state.cityData == null) {
      return <p>loading...</p>
    }
    const temperatureHourlie = [];
    this.state.cityData.map((hour) => {
      temperatureHourlie.push(hour.main.temp)

    });

    const humidityHourlie = [];
    this.state.cityData.map((hum) => {
      humidityHourlie.push(hum.main.humidity)
    });

    const pressureArray = [];
    this.state.cityData.map((pressure) => {
      pressureArray.push(pressure.main.pressure)
    });

    const windArray = [];
    this.state.cityData.map((wind) => {
      windArray.push(wind.wind.speed)
    });

    const forecastArray = [];
    this.state.cityData.map((fc) => {
      forecastArray.push(fc.weather)
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h5 id="title">Weather Search</h5>
          </div>
        </div>
        <div className="row">
          <div className="col-md-10">
            <div className="input-group">
              <input id= "search" type="text" className="form-control" placeholder="Search for a 5-days city forecast " onKeyDown={this.handleKeyPress} onChange={this.handleChange} value={this.state.searchTerm} />
            </div>
          </div>
          <div className="col-md-2">
            <button type="button" className="btn btn-primary" onClick={this.searchClick}>Search</button>
          </div>
        </div>
        <div className="row">
          <div className="col-12 extra">
            <div id="map">
              <MyMapComponent cityCord={this.state.cityCord}
                isMarkerShown={true}
                googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `400px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
              />
            </div>
            </div>
          </div>
          <div className="row">
          <div className="col-md-6 extra">
          <h2 style={{color:"red"}}>Temperature(C)</h2>
            <Sparklines data={temperatureHourlie}>
              <SparklinesLine style={style} color="red" />
              <SparklinesReferenceLine type="mean" />
            </Sparklines> 
              <h2 style={{color:"red"}}>Average temperature : {temperatureHourlie[1]}C</h2>
          </div>
          <div className="col-md-6  extra">
          <h2 style={{color:"blue"}}>Humidity (%)</h2>
            <Sparklines data={humidityHourlie}>
              <SparklinesLine style={style} color="blue" />
              <SparklinesReferenceLine type="mean" />
            </Sparklines>
              <h2 style={{color:"blue"}}>Average humidity : {humidityHourlie[1]}%</h2>
            </div>
          </div>
          <div className="row">
          <div className="col-md-6 extra">
          <h2 style={{color:"yellow"}}>Pressure (hPa)</h2>
            <Sparklines data={pressureArray}>
              <SparklinesLine style={style} color="yellow" />
              <SparklinesReferenceLine type="mean" />
            </Sparklines>
              <h2 style={{color:"yellow"}}>Average pressure : {pressureArray[1]}hPa</h2>
          </div>
          <div className="col-md-6 extra">
          <h2 style={{color:"green"}}>Wind speed (km/h)</h2>
            <Sparklines data={windArray}>
              <SparklinesLine style={style} color="green" />
              <SparklinesReferenceLine type="mean" />
            </Sparklines>
              <h2 style={{color:"green"}}>Average wind speed : {windArray[1]}km/h</h2>
            </div>
          </div>
      </div>
    );
  }
}

export default App;
