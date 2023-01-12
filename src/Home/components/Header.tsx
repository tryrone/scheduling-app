import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { headShotImage } from "../../../assets/images";
import CustomText from "../../components/CustomText";
import Fonts from "../../constants/Fonts";
import Colors from "../../constants/Colors";
import { MoreSvg } from "../../../assets/svg";

const ProfileImage = styled.Image`
  height: 40px;
  width: 40px;
  border-radius: 10px;
`;

const HeadWrap = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Header = () => {
  return (
    <HeadWrap>
      <Row>
        <ProfileImage source={headShotImage} resizeMode="cover" />
        <CustomText
          left={15}
          fontFamily={Fonts.DMSansBold}
          fontWeight="700"
          fontSize={24}
          color={Colors?.black}
        >
          Hi, Amanda!
        </CustomText>
      </Row>
      <MoreSvg />
    </HeadWrap>
  );
};

export default Header;
