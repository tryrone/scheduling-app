import React from "react";
import SafeAreaWrap from "../components/SafeAreaWrap";
import Colors from "../constants/Colors";
import DetailHeader from "./components/DetailHeader";
import Schedule from "./components/Schedule";

const Detail = ({ navigation }: any): JSX.Element => {
  return (
    <SafeAreaWrap safeAreaBg={Colors?.black} bg={Colors?.black}>
      <>
        <DetailHeader navigation={navigation} />
        <Schedule />
      </>
    </SafeAreaWrap>
  );
};

export default Detail;
