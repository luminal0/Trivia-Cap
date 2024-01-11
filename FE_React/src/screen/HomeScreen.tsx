import React, { useState, useEffect } from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import MyButton from "../components/Button";
import TopUpButton from "../components/TopUpButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import { jwtDecode } from "jwt-decode";
import Modal from "react-native-modal";
import { API } from "../utils/api";
import ModalAvatar from "../components/ModalAvatar";
import axios from "axios";

interface UserInfo {
  picture?: string;
  email: string;
  verified_email: boolean;
  name: string;
}

export default function HomeScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState<UserInfo | null>(null);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [triggerFetch, setTriggerFetch] = useState(0);

  const getUserName = async () => {
    try {
      // const token = await AsyncStorage.getItem("user");
      // const response = await API.get("api/v1/detail-user", {
      //   headers: {
      //     Authorization: "Bearer " + token,
      //   },
      // });
      const token = await AsyncStorage.getItem("user");
      const user = jwtDecode(token) as UserInfo;
      setName(user.name);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getUserAvatar = async () => {
    try {
      const token = await AsyncStorage.getItem("user");
      const response = await API.get("api/v1/detail-user", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      console.log(response);
      setAvatar(response.data.data.avatar);
    } catch (error) {
      console.error(error.message);
    }
  };

  const getUser = async () => {
    try {
      const data = await AsyncStorage.getItem("user");
      if (data) {
        const userData = jwtDecode(data) as UserInfo;
        setUser(userData);
      }
    } catch (error) {
      console.error("Error getting user data:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleTopUp = () => {
    navigation.navigate("Shop" as never);
  };

  useEffect(() => {
    getUser();
    getUserName();
    getUserAvatar();
  }, [triggerFetch]);

  return (
    <ImageBackground
      source={require("../../assets/images/bg1.png")}
      style={{ flex: 1, opacity: 0.95 }}
    >
      <ScrollView style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
        <StatusBar />
        <TopUpButton onPress={handleTopUp} />
        <TouchableOpacity
          style={{
            position: "absolute",
            top: 35,
            right: -25,
            zIndex: 1,
            borderRadius: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <ModalAvatar setTriggerFetch={setTriggerFetch} />
        </TouchableOpacity>

        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../assets/images/2.png")}
            style={{ width: 430, height: 130, borderRadius: 65, marginTop: 30 }}
          />

          <View style={{ marginTop: 20 }}>
            <Image
              source={{
                uri: avatar,
              }}
              style={{ width: 130, height: 130, borderRadius: 65 }}
            />
            <Text
              style={{
                color: "white",
                fontSize: 25,
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {name}
            </Text>
          </View>

          <View style={{ marginTop: 80, alignItems: "center" }}>
            <MyButton
              text="Play Game"
              background="#39A7FF"
              textColor="white"
              navigateTo="Lobby"
            />
            <MyButton
              text="Logout"
              background="#BE3144"
              textColor="white"
              navigateTo="Login"
              onPress={handleLogout}
            />
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({});
