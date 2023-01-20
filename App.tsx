import { useFonts } from "expo-font";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/Home";
import styled from "styled-components/native";
import { homeIcon, profileIcon } from "./assets/images";
import { PlusIcon } from "./assets/svg";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import Detail from "./src/DetailScreen";
import Login from "./src/Login";
import * as Linking from "expo-linking";
import Profile from "./src/Profile";

const Tab = createBottomTabNavigator();

const HomeIconImage = styled.Image`
  height: 25px;
  width: 25px;
`;

const ProfileIconImage = styled.Image`
  height: 25px;
  width: 25px;
`;

const AddWrap = styled.View`
  height: 50px;
  width: 50px;
  border-radius: 10px;
  background-color: black;
  justify-content: center;
  align-items: center;
  position: relative;
  bottom: 20px;
`;

const AddScreen = () => <></>;

const AddBtn = () => {
  return (
    <AddWrap>
      <PlusIcon />
    </AddWrap>
  );
};

const HomeStack = createStackNavigator();

export default function App() {
  const prefix = Linking.createURL("/");
  const Stack = createStackNavigator();

  const [fontsLoaded] = useFonts({
    "Graphik-Medium": require("./assets/fonts/Graphik-Medium.otf"),
    "Graphik-Regular": require("./assets/fonts/Graphik-Regular.otf"),
    "DMSans-Medium": require("./assets/fonts/DMSans-Medium.ttf"),
    "DMSans-Bold": require("./assets/fonts/DMSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const HomeStackNavigation = () => {
    return (
      <HomeStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="HomePage"
      >
        <Tab.Screen name="HomePage" component={Home} />
        <Tab.Screen name="Detail" component={Detail} />
      </HomeStack.Navigator>
    );
  };

  const AuthenticatedStack = () => {
    return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: -1,
            },
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 10,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return <HomeIconImage source={homeIcon} resizeMode="contain" />;
            },
            tabBarShowLabel: false,
          }}
          component={HomeStackNavigation}
        />
        <Tab.Screen
          name="Add"
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return <AddBtn />;
            },
            tabBarShowLabel: false,
          }}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
            },
          }}
          component={AddScreen}
        />

        <Tab.Screen
          name="Profile"
          options={{
            tabBarIcon: ({ focused, color, size }) => {
              return (
                <ProfileIconImage source={profileIcon} resizeMode="contain" />
              );
            },
            tabBarShowLabel: false,
          }}
          component={Profile}
        />
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={Login} />

        <Stack.Screen
          name="AuthenticatedStack"
          component={AuthenticatedStack}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
