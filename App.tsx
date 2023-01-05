import { useFonts } from "expo-font";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/Home";
import styled from "styled-components/native";
import { homeIcon, profileIcon } from "./assets/images";
import { PlusIcon } from "./assets/svg";

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

const ProfileScreen = () => <></>;
const AddScreen = () => <></>;

const AddBtn = () => {
  return (
    <AddWrap>
      <PlusIcon />
    </AddWrap>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    "DMSans-Regular": require("./assets/fonts/DMSans-Regular.ttf"),
    "DMSans-Bold": require("./assets/fonts/DMSans-Bold.ttf"),
    "DMSans-Medium": require("./assets/fonts/DMSans-Medium.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
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
            shadowOpacity: 0.001,
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
          component={Home}
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
          component={ProfileScreen}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
