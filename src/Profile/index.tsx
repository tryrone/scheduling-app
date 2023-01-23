import { Alert, StatusBar } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import SafeAreaWrap from "../components/SafeAreaWrap";
import Colors from "../constants/Colors";
import Fonts from "../constants/Fonts";
import CustomText from "../components/CustomText";
import styled from "styled-components/native";
import { boldArrow } from "../../assets/images";
import { ArrowRight } from "../../assets/svg";
import { clearLocalData, getLocalLoginData } from "../utils";

const NameWrap = styled.View`
  height: 80px;
  width: 80px;
  border-radius: 50px;
  background-color: ${Colors?.tomato_red};
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: 20px;
`;

const SpacedRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const IconWrap = styled.View`
  height: 50px;
  width: 50px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  background-color: ${Colors?.grey_7};
`;

const Icon = styled.Image`
  height: 25px;
  width: 25px;
`;

const Profile = ({ navigation }: any) => {
  const [username, setUsername] = useState("User");

  const clearStorageData = async () => {
    const response: any = await clearLocalData();
    console.log({ response });
    if (response) {
      navigation?.navigate("Login");
    } else {
      Alert.alert("Unable to Log out at the moment, please try again later.");
    }
  };

  useLayoutEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const user = await getLocalLoginData();
    setUsername(user?.name);
  };
  return (
    <SafeAreaWrap style={{ paddingHorizontal: 20 }}>
      <StatusBar barStyle="dark-content" animated />

      <NameWrap>
        <CustomText
          color={Colors?.white}
          fontSize={34}
          fontFamily={Fonts?.DMSansBold}
          fontWeight="700"
          align="center"
        >
          {username[0]}
        </CustomText>
      </NameWrap>

      <CustomText
        color={Colors?.black}
        fontSize={20}
        fontFamily={Fonts?.DMSansBold}
        fontWeight="500"
        align="center"
        top={16}
      >
        {username}
      </CustomText>

      <SpacedRow onPress={clearStorageData} style={{ marginTop: 30 }}>
        <Row>
          <IconWrap>
            <Icon source={boldArrow} resizeMode="contain" />
          </IconWrap>

          <CustomText
            color={Colors?.black}
            fontSize={14}
            fontFamily={Fonts?.DMSansBold}
            fontWeight="600"
            left={15}
          >
            Log out
          </CustomText>
        </Row>

        <ArrowRight />
      </SpacedRow>
    </SafeAreaWrap>
  );
};

export default Profile;
