import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { headShotImage } from "../../../assets/images";
import CustomText from "../../components/CustomText";
import Fonts from "../../constants/Fonts";
import Colors from "../../constants/Colors";
import { MoreSvg } from "../../../assets/svg";
import { getLocalLoginData } from "../../utils";

const ProfileImage = styled.View`
  height: 40px;
  width: 40px;
  border-radius: 10px;
  background-color: ${Colors?.tomato_red};
  justify-content: center;
  align-items: center;
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

type userDataProps = {
  user_id: string;
  name: string;
};

const Header = () => {
  const [userData, setUserData] = useState<userDataProps>();

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const user = await getLocalLoginData();
    setUserData(user);
  };

  return (
    <HeadWrap>
      <Row>
        <ProfileImage>
          <CustomText
            fontFamily={Fonts.DMSansBold}
            fontWeight="700"
            fontSize={24}
            color={Colors?.white}
          >
            {userData?.name?.[0] || "U"}
          </CustomText>
        </ProfileImage>
        <CustomText
          left={15}
          fontFamily={Fonts.DMSansBold}
          fontWeight="700"
          fontSize={24}
          color={Colors?.black}
        >
          Hi, {userData?.name?.split(" ")?.[0] || "User"}!
        </CustomText>
      </Row>
      <MoreSvg />
    </HeadWrap>
  );
};

export default Header;
