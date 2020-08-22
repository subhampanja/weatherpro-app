import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import API from "./api/API";
import WeatherInfo from "./component/WeatherInfo";
import UnitsPicker from "./component/UnitsPicker";
import { colors } from "./utils/Index";
import ReloadIcon from "./component/ReloadIcon";
import WeatherDetails from "./component/WeatherDetails";

export default function App() {
  const [errorMessege, setErrorMessege] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState("metric");
  useEffect(() => {
    load();
  }, [unitsSystem]);

  const load = async () => {
    setCurrentWeather(null);
    setErrorMessege(null);
    try {
      let { status } = await Location.requestPermissionsAsync();

      if (status !== "granted") {
        setErrorMessege(
          "Access to the location is needed to run the application"
        );
        return;
      }
      const location = await Location.getCurrentPositionAsync();

      const { latitude, longitude } = location.coords;

      const weatherUrl = `${API.base}lat=${latitude}&lon=${longitude}&units=${unitsSystem}&appid=${API.key}`;

      const response = await fetch(weatherUrl);

      const result = await response.json();

      if (response.ok) {
        setCurrentWeather(result);
      } else {
        setErrorMessege(result.message);
      }
    } catch (error) {
      setErrorMessege(error.message);
    }
  };
  if (currentWeather) {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <View style={styles.main}>
          <UnitsPicker
            unitsSystem={unitsSystem}
            setUnitsSystem={setUnitsSystem}
          />
          <ReloadIcon load={load} />
          <WeatherInfo currentWeather={currentWeather} />
        </View>
        <WeatherDetails
          currentWeather={currentWeather}
          unitsSystem={unitsSystem}
        />
      </View>
    );
  } else if (errorMessege) {
    return (
      <View style={styles.container}>
        <Text>{errorMessege}</Text>
        <StatusBar style="auto" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  main: {
    flex: 1,
    justifyContent: "center",
  },
});
