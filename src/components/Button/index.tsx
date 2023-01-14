/* eslint-disable react-native/no-inline-styles */
import { ActivityIndicator, Platform, ViewStyle } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import styled from "styled-components/native";
import CustomText from "../CustomText";
import Fonts from "../../constants/Fonts";

const BtnWrap = styled.TouchableOpacity<{
  width?: string;
  height?: string;
  bgColor?: string;
  borderRadius?: string;
  jc?: string;
  customStyle?: {} | null;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) => props.bgColor};
  border-radius: ${(props) => props.borderRadius};
  justify-content: ${(props) => props?.jc || "center"};
  align-items: center;
  ${(props) => props.customStyle};
  z-index: 1;
`;

const ViewWrap = styled.View<{
  width?: string;
  height?: string;
  bgColor?: string;
  borderRadius?: string;
  jc?: string;
  customStyle?: {} | null;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) => props.bgColor};
  border-radius: ${(props) => props.borderRadius};
  justify-content: ${(props) => props?.jc || "center"};
  align-items: center;
  ${(props) => props.customStyle};
  padding-top: ${Platform.OS === "ios" ? "10px" : "0px"};
  z-index: 1;
`;

const DisabledWrap = styled.View<{
  width?: string;
  height?: string;
  bgColor?: string;
  borderRadius?: string;
  jc?: string;
  customStyle?: {} | null;
}>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) => props.bgColor};
  border-radius: ${(props) => props.borderRadius};
  justify-content: ${(props) => props?.jc || "center"};
  align-items: center;
  ${(props) => props.customStyle};
  padding-top: ${Platform.OS === "ios" ? "10px" : "0px"};
  position: absolute;
  bottom: 0px;
  z-index: 3;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

type ButtonProps = {
  text: string;
  bgColor?: string;
  textColor?: string;
  width?: string;
  height?: string;
  borderRadius?: string;
  jc?: string;
  style?: ViewStyle;
  btnStyle?: ViewStyle;
  loading?: boolean;
  disabled?: boolean;
  textSize?: number;
  icon?: JSX.Element | null;
  iconRight?: boolean;
  fontWeight?: string;
  onPress?: any;
  fontFamily?: string;
};

const Button = ({
  text = "",
  bgColor = Colors.primary,
  textColor = Colors.white,
  width = "100%",
  height = "56px",
  borderRadius = "80px",
  jc = "center",
  style,
  loading = false,
  disabled = false,
  textSize = 14,
  icon = null,
  iconRight = false,
  fontWeight,
  onPress = () => {},
  btnStyle,
  fontFamily = Fonts?.GraphikRegular,
}: ButtonProps) => {
  return (
    <>
      {disabled ? (
        <ViewWrap
          width={width}
          height={height}
          style={style}
          borderRadius={borderRadius}
          jc={jc}
          bgColor={bgColor}
        >
          {loading ? (
            <ActivityIndicator
              style={{
                alignSelf: "center",
                position: "relative",
                top: Platform.OS === "ios" ? -5 : 0,
              }}
              size="small"
              color={Colors.white}
            />
          ) : (
            <CustomText
              color={textColor}
              align="center"
              top={Platform.OS === "ios" ? -10 : 0}
              fontWeight={fontWeight ? fontWeight : "400"}
              fontFamily={Fonts?.GraphikRegular}
              fontSize={textSize}
            >
              {text}
            </CustomText>
          )}
          <DisabledWrap
            borderRadius={borderRadius}
            width={"100%"}
            height={height}
            bgColor={"rgba(255,255,255, 0.4)"}
          />
        </ViewWrap>
      ) : (
        <BtnWrap
          width={width}
          height={height}
          customStyle={style}
          borderRadius={borderRadius}
          jc={jc}
          style={btnStyle}
          bgColor={bgColor}
          onPress={onPress}
        >
          {loading ? (
            <ActivityIndicator
              style={{ alignSelf: "center" }}
              size="small"
              color={Colors.white}
            />
          ) : (
            <Row>
              {icon && !iconRight && icon}
              <CustomText
                color={textColor}
                align="center"
                fontWeight={fontWeight ? fontWeight : "400"}
                fontFamily={fontFamily}
                fontSize={textSize}
              >
                {text}
              </CustomText>
              {icon && iconRight && icon}
            </Row>
          )}
        </BtnWrap>
      )}
    </>
  );
};

export default Button;
