import React from "react";
import { Alert } from "react-native";
import Loading from "./Loading";
import * as Location from "expo-location";

export default class App extends React.Component {
  state = {
    isLoading: true,
  };
  getLocation = async () => {
    try {
      const response = await Location.requestPermissionsAsync();
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      this.setState({ isLoading: false });
      //Send to API and get Weather (날씨 API를 가져와라)
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
