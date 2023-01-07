import React from "react";
import { Text } from "react-native";
import SafeAreaWrap from "../components/SafeAreaWrap";
import Header from "./components/Header";
import PremiumCard from "./components/PremiumCard";

const Home = () => {
  return (
    <SafeAreaWrap>
      <>
        <Header />
        <PremiumCard />
      </>
    </SafeAreaWrap>
  );
};

export default Home;
