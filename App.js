import React from "react";
import { Alert } from "react-native";
import Loading from "./Loading";
import axios from "axios";
import * as Location from "expo-location";

const API_KEY = "d0c6d0e2fff77f9c75b5c2f747dc0eb0";

export default class App extends React.Component {
  state = {
    isLoading: true,
  };

  getWeather = async (latitude, longitude) => {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}`
    );
    console.log(data);
  };

  getLocation = async () => {
    try {
      const response = await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      this.setState({ isLoading: false });

      //Send to API and get Weather (날씨 API를 가져와라)
      this.getWeather(latitude, longitude);
    } catch (error) {
      Alert.alert("널 찾을수가 없어", "So Sad");
    }
  };

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const { isLoading } = this.state;
    return isLoading ? <Loading /> : null;
  }
}
