import React, { useEffect, useLayoutEffect, useState } from "react";
import SafeAreaWrap from "../components/SafeAreaWrap";
import styled from "styled-components/native";
import Colors from "../constants/Colors";
import { AppIconSvg } from "../../assets/svg";
import CustomText from "../components/CustomText";
import Fonts from "../constants/Fonts";
import Button from "../components/Button";
import { githubIcon, googleIcon, twitterIcon } from "../../assets/images";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import appLogger from "../logger";
import { makeRedirectUri } from "expo-auth-session";
import { getLocalDeviceData, storeLocalLoginData } from "../utils";

const Container = styled.View`
  border-radius: 32px;
  background-color: ${Colors?.blue_100};
  padding-horizontal: 10px;
  padding-bottom: 34px;
  width: 100%;
  padding-top: 22px;
  justify-content: center;
  align-items: center;
`;

const IconImage = styled.Image`
  height: 24px;
  width: 24px;
  margin-right: 15px;
  position: relative;
  bottom: 2px;
  border-radius: ${24 / 2}px;
`;

WebBrowser.maybeCompleteAuthSession();

const Login = ({ navigation }: any) => {
  // web client id: 675869283230-19opr8g3f9d5fk0gq56d55q7nv0bjqfg.apps.googleusercontent.com
  // ios client id: 675869283230-g2ccfd64l49ok8n149j7vn26fi0j7s76.apps.googleusercontent.com
  // android client id: 675869283230-0pifoqa7rieeuhgudvafn51aehh0rs99.apps.googleusercontent.com

  const redirectUri = makeRedirectUri({
    useProxy: false,
    scheme: "com.scheduleapp.tega",
    path: "/@tyrone/schedule-app",
  });

  const [accessToken, setAccessToken] = useState(null);
  const [request, response, promptAsync]: any = Google.useAuthRequest({
    expoClientId:
      "675869283230-19opr8g3f9d5fk0gq56d55q7nv0bjqfg.apps.googleusercontent.com",
    iosClientId:
      "675869283230-g2ccfd64l49ok8n149j7vn26fi0j7s76.apps.googleusercontent.com",
    androidClientId:
      "675869283230-0pifoqa7rieeuhgudvafn51aehh0rs99.apps.googleusercontent.com",
    redirectUri,
  });

  useLayoutEffect(() => {
    userData();
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response?.authentication?.accessToken);

      accessToken && fetchGoogleUserInfo();
    }
  }, [response, accessToken]);

  const userData = async () => {
    const user = await getLocalDeviceData();
    if (user) {
      navigation?.navigate("AuthenticatedStack");
    }
  };

  const fetchGoogleUserInfo = async () => {
    try {
      let response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const userInfo = await response.json();
      const storageResp = await storeLocalLoginData(userInfo);
      console.log({ storageResp });
      if (storageResp) {
        navigation?.navigate("AuthenticatedStack");
      }
    } catch (error) {
      appLogger.info({ error });
    }
  };

  return (
    <SafeAreaWrap style={{ paddingHorizontal: 10, paddingTop: 31 }}>
      <Container>
        <AppIconSvg />

        <CustomText
          align="center"
          top={17}
          fontSize={30}
          fontWeight="700"
          fontFamily={Fonts?.DMSansBold}
        >
          Hi Welcome
        </CustomText>
        <CustomText
          align="center"
          top={9}
          fontSize={16}
          fontWeight="400"
          color={"rgba(0, 0, 0, 0.7)"}
          fontFamily={Fonts?.GraphikRegular}
        >
          Now your schedules are in one place and always under control.
        </CustomText>

        <Button
          style={{ marginTop: 20 }}
          textSize={16}
          bgColor={Colors?.white}
          borderRadius="10px"
          textColor={"rgba(0, 0, 0, 0.54)"}
          fontWeight="500"
          text="Continue with Google"
          height="54px"
          btnStyle={{ alignItems: "flex-start", paddingLeft: 15 }}
          fontFamily={Fonts?.DMSansMedium}
          icon={<IconImage source={googleIcon} resizeMode="cover" />}
          onPress={() => {
            promptAsync({ showInRevents: true });
          }}
        />

        <Button
          style={{ marginTop: 16 }}
          textSize={16}
          bgColor={Colors?.blue_200}
          borderRadius="10px"
          fontWeight="500"
          text="Continue with Twitter"
          height="54px"
          btnStyle={{ alignItems: "flex-start", paddingLeft: 15 }}
          fontFamily={Fonts?.DMSansMedium}
          icon={<IconImage source={twitterIcon} resizeMode="cover" />}
        />

        <Button
          style={{
            marginTop: 16,
          }}
          disabled={!request}
          textSize={16}
          bgColor={Colors?.white}
          borderRadius="10px"
          textColor={Colors?.black}
          fontWeight="500"
          text="Continue with Github"
          height="54px"
          btnStyle={{ alignItems: "flex-start", paddingLeft: 15 }}
          fontFamily={Fonts?.DMSansMedium}
          icon={<IconImage source={githubIcon} resizeMode="contain" />}
        />
      </Container>
    </SafeAreaWrap>
  );
};

export default Login;
