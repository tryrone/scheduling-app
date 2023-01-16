import React from "react";
import { StatusBar } from "react-native";
import SafeAreaWrap from "../components/SafeAreaWrap";
import Colors from "../constants/Colors";
import DetailHeader from "./components/DetailHeader";
import Schedule from "./components/Schedule";

const Detail = ({ navigation, route }: any): JSX.Element => {
  const params = route?.params;

  return (
    <SafeAreaWrap safeAreaBg={Colors?.black} bg={Colors?.black}>
      <StatusBar backgroundColor={Colors?.black} animated />
      <>
        <DetailHeader navigation={navigation} params={params} />
        <Schedule params={params} />
      </>
    </SafeAreaWrap>
  );
};

export default Detail;
