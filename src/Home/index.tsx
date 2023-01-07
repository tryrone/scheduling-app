import React from "react";
import SafeAreaWrap from "../components/SafeAreaWrap";
import Header from "./components/Header";
import PremiumCard from "./components/PremiumCard";
import Tasks from "./components/Tasks";
import { ScrollView } from "react-native";

type HomeProp = {
  navigation: any;
};

const Home = ({ navigation }: HomeProp) => {
  return (
    <SafeAreaWrap>
      <>
        <Header />
        <PremiumCard />
        <ScrollView showsVerticalScrollIndicator={false}>
          <Tasks navigation={navigation} />
        </ScrollView>
      </>
    </SafeAreaWrap>
  );
};

export default Home;
