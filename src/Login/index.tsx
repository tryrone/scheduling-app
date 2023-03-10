import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
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
import { makeRedirectUri, useAuthRequest, startAsync } from "expo-auth-session";
import { getLocalLoginData, storeLocalLoginData } from "../utils";

const Container = styled.View`
  border-radius: 32px;
  background-color: ${Colors?.blue_100};
  padding-horizontal: 10px;
  padding-bottom: 34px;
  width: 100%;
  padding-top: 22px;
  padding-bottom: 62px;
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
  // Twitter OAuth

  const requestTokenURL = "http://127.0.0.1:3000/request-token";
  const accessTokenURL = "http://127.0.0.1:3000/access-token";
  const userDataURL = "http://127.0.0.1:3000/user-data";

  // github OAuth
  const githubDiscovery = {
    authorizationEndpoint: "https://github.com/login/oauth/authorize",
    tokenEndpoint: "https://github.com/login/oauth/access_token",
    revocationEndpoint:
      "https://github.com/settings/connections/applications/XXXXX",
  };

  // google OAuth
  const redirectUri = makeRedirectUri({
    useProxy: false,
    scheme: "com.scheduleapp.tega",
    path: "/@tyrone/schedule-app",
  });
  const [twitterError, setTwitterError]: any = useState();
  const [accessToken, setAccessToken] = useState(null);
  const [request, response, promptAsync]: any = Google.useAuthRequest({
    expoClientId: "XXXXX.apps.googleusercontent.com",
    iosClientId: "XXXXX.apps.googleusercontent.com",
    androidClientId: "XXXX.apps.googleusercontent.com",
    redirectUri,
  });

  const [githubRequest, githubResponse, githubPromptAsync]: any =
    useAuthRequest(
      {
        clientId: "XXXX",
        scopes: ["identity"],
        redirectUri: makeRedirectUri({
          useProxy: true,
          scheme: "com.scheduleapp.tega",
        }),
      },
      githubDiscovery
    );

  useLayoutEffect(() => {
    userData();
  }, []);

  useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response?.authentication?.accessToken);

      accessToken && fetchGoogleUserInfo();
    }
  }, [response, accessToken]);

  useEffect(() => {
    if (githubResponse?.type === "success") {
      appLogger.info({ githubResponse });
    }
  }, [githubResponse]);

  const userData = async () => {
    const user = await getLocalLoginData();
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
      const userDetails = {
        user_id: userInfo?.id,
        name: userInfo?.name,
      };
      const storageResp = await storeLocalLoginData(userDetails);

      if (storageResp) {
        navigation?.navigate("AuthenticatedStack");
      }
    } catch (error) {
      appLogger.info({ error });
    }
  };

  function toQueryString(params: any) {
    return (
      "?" +
      Object.entries(params)
        .map(
          ([key, value]: any) =>
            `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        )
        .join("&")
    );
  }

  const onTwitterLogin = useCallback(async () => {
    try {
      // Step #1 - first we need to fetch a request token to start the browser-based authentication flow
      const requestParams = toQueryString({
        callback_url: "https://auth.expo.io/@tyrone/schedule-app",
      });
      const requestTokens = await fetch(requestTokenURL + requestParams).then(
        (res) => res.json()
      );

      // appLogger.info("Request tokens fetched!", requestTokens);

      // Step #2 - after we received the request tokens, we can start the auth session flow using these tokens
      const authResponse: any = await startAsync({
        authUrl:
          "https://api.twitter.com/oauth/authenticate" +
          toQueryString(requestTokens),
      });

      // appLogger.info("Auth response received!", authResponse);

      // Validate if the auth session response is successful
      // Note, we still receive a `authResponse.type = 'success'`, thats why we need to check on the params itself
      if (authResponse.params && authResponse.params.denied) {
        return setTwitterError(
          "AuthSession failed, user did not authorize the app"
        );
      }

      // Step #3 - when the user (successfully) authorized the app, we will receive a verification code.
      // With this code we can request an access token and finish the auth flow.
      const accessParams = toQueryString({
        oauth_token: requestTokens?.oauth_token,
        oauth_token_secret: requestTokens?.oauth_token_secret,
        oauth_verifier: authResponse?.params?.oauth_verifier,
      });
      const accessTokens = await fetch(accessTokenURL + accessParams).then(
        (res) => res.json()
      );

      // appLogger.info("Access tokens fetched!", accessTokens);

      const userDetails = {
        user_id: accessTokens?.user_id,
        name: accessTokens?.screen_name,
      };

      const storageResp = await storeLocalLoginData(userDetails);

      if (storageResp) {
        navigation?.navigate("AuthenticatedStack");
      }

      // Now let's store the username in our state to render it.
      // You might want to store the `oauth_token` and `oauth_token_secret` for future use.
    } catch (error: any) {
      console.log("Something went wrong...", error);
      setTwitterError(error?.message);
    } finally {
    }
  }, []);

  return (
    <SafeAreaWrap style={{ paddingHorizontal: 10, paddingTop: 31 }}>
      <Container
        style={{
          shadowColor: "rgba(0,0,0,0.2)",
          shadowOffset: {
            width: 0,
            height: 7,
          },
          shadowOpacity: 0.41,
          shadowRadius: 9.11,
          elevation: 14,
        }}
      >
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
          Now your schedules are in one place and??always under control.
        </CustomText>

        <Button
          style={{ marginTop: 20 }}
          textSize={16}
          bgColor={Colors?.white}
          borderRadius="10px"
          disabled={!request}
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
          onPress={() => {
            onTwitterLogin();
          }}
        />

        {/* <Button
          style={{
            marginTop: 16,
          }}
          disabled={!githubRequest}
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
          onPress={() => {
            githubPromptAsync();
          }}
        /> */}
      </Container>
    </SafeAreaWrap>
  );
};

export default Login;
