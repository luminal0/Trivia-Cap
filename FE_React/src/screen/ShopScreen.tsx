import React from "react";
import DiamondShopCard from "./DiamondShopCard";
import AvatarShopCard from "./AvatarShopCard";
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import TopUpButton from "../components/TopUpButton";

const ShoppingPanel: React.FC = () => {
  return (
    <ImageBackground
      source={require("../../assets/images/bg1.png")}
      style={{ flex: 1, opacity: 0.95 }}
    >
      <StatusBar />
      <TopUpButton />
      <View style={styles.container}>
      <Image
        source={require('../../assets/images/shop.png')} // 
        style={styles.image}
      />    
          <View style={styles.cardsContainer}>
          <View style={styles.cardWrapper}>
            <DiamondShopCard />
          </View>
          <View style={styles.cardWrapper}>
            <AvatarShopCard />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "white",
  },
  cardsContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  cardWrapper: {
    flexDirection: "row",
    width: "45%",
    alignItems: "center",
  },
  image: {
    width: 300, 
    height: 300,
    marginTop: -80,
  },
});

export default ShoppingPanel;
