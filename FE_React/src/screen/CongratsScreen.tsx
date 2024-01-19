import { Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import TopUpButton from "../components/TopUpButton";
import { useNavigation } from "@react-navigation/native";
import { socket } from "../utils/socket";
import { MdOutlineLogout } from "react-icons/md";

export default function CongratsScreen() {
  const navigation = useNavigation();
  const [data, setData] = useState([]);

  const LoginNavigate = () => {
    navigation.navigate("Login" as never);
  };

  const HomeNavigate = () => {
    navigation.navigate("Home" as never);
  };

  useEffect(() => {
    socket.emit("user", { score: 0 });
    socket.on("user", user => {
      setData(user.sort((a, b) => b.score - a.score));
      console.log(user);
    });
  }, []);
  return (
    <ImageBackground source={require("../../assets/images/bg_game.png")} style={{ flex: 1, opacity: 0.95 }}>
      <ScrollView style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
        <StatusBar />

        <TopUpButton onPress={LoginNavigate} />

        <Image source={require("../../assets/images/2.png")} style={[styles.iconText]} />

        {/* <View style={[styles.score]}>
          <Image
            source={require("../../assets/images/score.png")}
            style={{ width: 40, height: 40 }}
          />
          <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>100</Text>
        </View> */}

        <View style={{ alignItems: "center" }}>
          <Text style={{ color: "white", fontSize: 35, fontWeight: "bold", marginTop: 30 }}>Congratulations!</Text>

          {data.length !== 0 &&
            data.map((user, idx) => (
              <>
                {idx == 0 && (
                  <View
                    style={{
                      marginTop: 20,
                      backgroundColor: "#F4CE14",
                      paddingHorizontal: 40,
                      paddingVertical: 20,
                      borderRadius: 10,
                      marginBottom: 13,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: 20,
                    }}
                  >
                    <Image
                      source={user.avatar}
                      style={{
                        width: 130,
                        height: 130,
                        borderRadius: 65,
                        borderColor: "white",
                        borderWidth: 2,
                      }}
                    />
                    <Text style={styles.nameText}>{user.name}</Text>
                  </View>
                )}

                {idx !== 0 && (
                  <View style={[styles.optionButton]}>
                    <Image
                      source={user.avatar}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 100,
                        marginRight: 20,
                        borderColor: "white",
                        borderWidth: 2,
                      }}
                    />
                    <View style={{ marginLeft: 5 }}>
                      <Text style={styles.optionText}>{user.name}</Text>
                      <Text style={styles.scoreText}>Score: {user.score}</Text>
                    </View>
                  </View>
                )}
              </>
            ))}
        </View>

        <View style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity style={styles.homeNavigate} onPress={HomeNavigate}>
            <MdOutlineLogout size={20} />
            Back home
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  optionButton: {
    flexDirection: "row",
    backgroundColor: "#bbb",
    textShadowColor: "black",
    padding: 15,
    borderRadius: 20,
    marginVertical: 10,
    width: 300,
    alignItems: "center",
  },

  optionText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    textShadowColor: "black",
    textShadowRadius: 2,
    textShadowOffset: { width: 1, height: 1 },
  },

  iconText: {
    width: 180,
    height: 180,
    marginRight: 5,
    position: "absolute",
    top: -55,
    left: -30,
    zIndex: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  nameText: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "black",
    textShadowRadius: 2,
    textShadowOffset: { width: 1, height: 1 },
  },

  scoreText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },

  score: {
    marginRight: 5,
    position: "absolute",
    top: 10,
    left: 150,
    zIndex: 1,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  homeNavigate: {
    backgroundColor: "skyblue",
    width: 150,
    paddingVertical: 10,
    color: "#000",
    fontWeight: "bold",
    textShadowColor: "white",
    textShadowRadius: 2,
    textShadowOffset: { width: 1, height: 1 },
    borderRadius: 10,
    marginTop: 18,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
  },
});
