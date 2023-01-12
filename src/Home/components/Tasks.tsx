import React, { Key } from "react";
import CustomText from "../../components/CustomText";
import Colors from "../../constants/Colors";
import styled from "styled-components/native";
import Fonts from "../../constants/Fonts";
import { blueHeart, orangeUser, redBag } from "../../../assets/images";
import { NavigationProp } from "@react-navigation/native";

const Container = styled.View`
  padding-horizontal: 16px;
  margin-top: 20px;
`;

const RowWrapped = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 18px;
`;

const ItemWrap = styled.TouchableOpacity<{
  bgColor: string;
}>`
  width: 48%;
  height: 170px;
  border-radius: 15px;
  background-color: ${({ bgColor }) => bgColor};
  padding: 12px;
  margin-bottom: 10px;
  justify-content: space-between;
`;

const IconImage = styled.Image`
  height: 25px;
  width: 25px;
`;

const Pill = styled.View<{
  bgColor: string;
}>`
  padding: 8px;
  border-radius: 20px;
  background-color: ${({ bgColor }) => bgColor};
  justify-content: center;
  align-items: center;
  width: 47%;
`;

const Row = styled.View<{
  justifyContent?: string;
}>`
  flex-direction: row;
  align-items: center;
  justify-content: ${({ justifyContent }) => justifyContent || "space-between"};
`;

const AddTaskWrap = styled.TouchableOpacity`
  height: 170px;
  width: 48%;
  border: 2px dashed ${Colors?.grey_2};
  justify-content: center;
  align-items: center;
  border-radius: 15px;
`;

type TaskItemProps = {
  bgColor: string;
  iconImage: number;
  title: string;
  textColor: string;
  doneTextColor?: string;
  lightPillColor: string;
  onPress: (() => void) | undefined;
};

const TaskItem = ({
  bgColor,
  iconImage,
  title,
  textColor,
  doneTextColor = textColor,
  lightPillColor,
  onPress,
}: TaskItemProps): JSX.Element => {
  return (
    <ItemWrap bgColor={bgColor} onPress={onPress}>
      <IconImage source={iconImage} resizeMode="contain" />
      <CustomText
        color={Colors?.black}
        fontSize={16}
        top={35}
        bottom={25}
        fontFamily={Fonts?.DMSansBold}
        fontWeight="700"
      >
        {title}
      </CustomText>
      <Row>
        <Pill bgColor={lightPillColor}>
          <CustomText
            color={textColor}
            fontSize={14}
            fontFamily={Fonts?.DMSansBold}
            fontWeight="700"
          >
            3 left
          </CustomText>
        </Pill>

        <Pill bgColor={Colors?.white}>
          <CustomText
            color={doneTextColor}
            fontSize={14}
            fontFamily={Fonts?.DMSansBold}
            fontWeight="700"
          >
            1 done
          </CustomText>
        </Pill>
      </Row>
    </ItemWrap>
  );
};

type TaskBtnProp = {
  navigation: {
    navigate: (prop: string, args?: Record<string, string>) => {};
  };
  setAddTaskModalVisible: (e: boolean) => void;
};

const AddTaskBtn = ({ setAddTaskModalVisible }: any): JSX.Element => {
  return (
    <AddTaskWrap onPress={() => setAddTaskModalVisible(true)}>
      <Row>
        <CustomText
          color={Colors?.black}
          fontSize={30}
          fontFamily={Fonts?.DMSansBold}
          fontWeight="700"
          style={{
            position: "relative",
            bottom: 1,
          }}
        >
          +
        </CustomText>
        <CustomText
          left={4}
          color={Colors?.black}
          fontSize={20}
          fontFamily={Fonts?.DMSansBold}
          fontWeight="700"
        >
          Add
        </CustomText>
      </Row>
    </AddTaskWrap>
  );
};

const Tasks = ({
  navigation,
  setAddTaskModalVisible,
}: TaskBtnProp): JSX.Element => {
  return (
    <Container>
      <CustomText
        color={Colors?.black}
        fontSize={20}
        fontFamily={Fonts?.DMSansBold}
        fontWeight="700"
      >
        Tasks
      </CustomText>

      <RowWrapped>
        <TaskItem
          bgColor={Colors?.light_yellow}
          textColor={Colors?.lemon}
          title="Personal"
          doneTextColor={Colors?.lemon}
          lightPillColor={Colors?.light_yellow_2}
          iconImage={orangeUser}
          onPress={() =>
            navigation?.navigate("Detail", {
              dotColor: Colors?.lemon,
              bgColor: Colors?.light_yellow,
              title: "Personal",
            })
          }
        />
        <TaskItem
          bgColor={Colors?.light_red}
          textColor={Colors?.tomato_red}
          title="Work"
          lightPillColor={Colors?.light_red_2}
          iconImage={redBag}
          onPress={() =>
            navigation?.navigate("Detail", {
              dotColor: Colors?.tomato_red,
              bgColor: Colors?.light_red,
              title: "Work",
            })
          }
        />
        <TaskItem
          bgColor={Colors?.light_blue}
          textColor={Colors?.blue}
          title="Health"
          lightPillColor={Colors?.light_blue_2}
          iconImage={blueHeart}
          onPress={() =>
            navigation?.navigate("Detail", {
              dotColor: Colors?.blue,
              bgColor: Colors?.light_blue,
              title: "Health",
            })
          }
        />

        <AddTaskBtn
          navigation={navigation}
          setAddTaskModalVisible={setAddTaskModalVisible}
        />
      </RowWrapped>
    </Container>
  );
};

export default Tasks;
