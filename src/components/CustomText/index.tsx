import React from "react";
import Colors from "../../constants/Colors";
import Text from "react-native-text";
import styled from "styled-components/native";
import { TextStyle as TextStyleProps } from "react-native";

const TextStyle = styled(Text)<{
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  color?: string;
  top?: number;
  right?: number;
  left?: number;
  bottom?: number;
  align?: string;
  customStyle?: {} | null;
  maxWidth?: string;
  transform?: string;
}>`
  font-size: ${({ fontSize }) => fontSize || 14}px;
  font-family: ${({ fontFamily }) => fontFamily || "Graphik-Regular"}; 
  font-style: normal;
  font-weight: ${({ fontWeight }) => fontWeight || "400"}
  color: ${({ color }) => color};
  margin-top: ${({ top }) => top || 0}px;
  margin-right: ${({ right }) => right || 0}px;
  margin-left: ${({ left }) => left || 0}px;
  margin-bottom: ${({ bottom }) => bottom || 0}px;
  text-align: ${({ align }) => align || "left"};
  text-transform: ${({ transform }) => transform || "none"};
  max-width: ${({ maxWidth }) => maxWidth || "auto"};
  ${({ customStyle }) => customStyle};
`;

type CustomTextProp = {
  fontSize?: number;
  fontFamily?: string;
  children: string;
  fontWeight?: string;
  color?: string;
  top?: number;
  right?: number;
  left?: number;
  bottom?: number;
  align?: string;
  style?: TextStyleProps | null;
  maxWidth?: string;
  numberOfLines?: number;
  transform?: string;
  lineHeight?: number;
};

const CustomText = ({
  fontSize = 14,
  fontFamily = "Graphik-Regular",
  children,
  fontWeight,
  color = Colors.black,
  top,
  right,
  left,
  bottom,
  align,
  style,
  maxWidth,
  numberOfLines,
  transform,
}: CustomTextProp) => {
  return (
    <TextStyle
      top={top}
      right={right}
      left={left}
      fontWeight={fontWeight}
      color={color}
      bottom={bottom}
      fontSize={fontSize}
      customStyle={style}
      fontFamily={fontFamily}
      numberOfLines={numberOfLines}
      transform={transform}
      maxWidth={maxWidth}
      align={align}
    >
      {children}
    </TextStyle>
  );
};

export default CustomText;
