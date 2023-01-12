import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";
import { WhiteChevLeft, WhiteMoreSvg } from "../../../assets/svg";
import CustomText from "../../components/CustomText";
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

const Row = styled.View`
  flex-direction: row;
`;

const SpaceBetween = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Container = styled.View`
  padding: 16px;
  width: 100%;
`;

const BackWrap = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  border-radius: ${40 / 2}px;
  justify-content: center;
  align-items: center;
  position: relative;
  right: 10px;
  bottom: 6px;
`;

const DetailHeader = ({ navigation, params }: any) => {
  return (
    <Container>
      <SpaceBetween>
        <Row>
          <BackWrap onPress={() => navigation?.goBack()}>
            <WhiteChevLeft />
          </BackWrap>

          <View style={{ marginLeft: 12 }}>
            <CustomText
              fontSize={24}
              fontFamily={Fonts?.DMSansBold}
              fontWeight="700"
              color={Colors?.white}
            >
              {params?.title} tasks
            </CustomText>
            <CustomText
              fontSize={16}
              top={10}
              fontFamily={Fonts?.DMSansBold}
              fontWeight="600"
              color={Colors?.grey_3}
            >
              You have 3 new tasks for today!
            </CustomText>
          </View>
        </Row>
        <WhiteMoreSvg />
      </SpaceBetween>
    </Container>
  );
};

export default DetailHeader;
