import React from "react";
import { Alert } from "react-native";
import Loading from "./Loading";
import Weather from "./Weather";
import axios from "axios";
import * as Location from "expo-location";

const API_KEY = "your key";

export default class App extends React.Component {
  state = {
    isLoading: true,
    temp: 0,
    condition: "Null",
    name: "",
  };

  getWeather = async (latitude, longitude) => {
    const {
      data: {
        main: { temp },
        weather,
        name,
      },
    } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
    );

    console.log(name);
    this.setState({
      isLoading: false,
      condition: weather[0].main,
      temp,
      name,
    });
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
    const { isLoading, temp, condition, name } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <Weather temp={Math.round(temp)} condition={condition} name={name} />
    );
  }
}
