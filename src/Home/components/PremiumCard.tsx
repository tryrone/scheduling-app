import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { RightArrow, StarSvg } from "../../../assets/svg";
import CustomText from "../../components/CustomText";
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

const Container = styled.View`
  padding-horizontal: 16px;
`;

const CardWrap = styled.View`
  width: 100%;
  height: 130px;
  padding: 20px 0px 0px 20px;
  background-color: ${Colors?.black};
  flex-direction: row;
  justify-content: space-between;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
`;

const StarWrap = styled.View`
  height: 30px;
  width: 30px;
  border-radius: ${30 / 2}px;
  justify-content: center;
  align-items: center;
  background-color: ${Colors?.dark_grey};
`;

const ArrowBtnWrap = styled.View`
  height: 50px;
  width: 50px;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  background-color: ${Colors?.blue};
  position: absolute;
  bottom: 0px;
  right: 0px;
`;

const Row = styled.View`
  flex-direction: row;
`;

const StarIcon = (): JSX.Element => {
  return (
    <StarWrap>
      <StarSvg />
    </StarWrap>
  );
};

const ArrowBtn = (): JSX.Element => {
  return (
    <ArrowBtnWrap>
      <RightArrow />
    </ArrowBtnWrap>
  );
};

const PremiumCard = (): JSX.Element => {
  return (
    <Container>
      <CardWrap>
        <Row>
          <StarIcon />

          <View style={{ marginLeft: 12, width: "70%" }}>
            <CustomText
              fontFamily={Fonts.DMSansBold}
              fontWeight="700"
              fontSize={16}
              color={Colors?.white}
            >
              Go Premium!
            </CustomText>
            <CustomText
              top={7}
              fontFamily={Fonts.GraphikRegular}
              fontWeight="400"
              lineHeight={24}
              fontSize={17}
              color={Colors?.dark_grey_2}
            >
              Get unlimited access to all our features!
            </CustomText>
          </View>
        </Row>

        <ArrowBtn />
      </CardWrap>
    </Container>
  );
};

export default PremiumCard;
