import React from "react";
import CustomText from "../../components/CustomText";
import Colors from "../../constants/Colors";
import styled from "styled-components/native";
import Fonts from "../../constants/Fonts";
import { blueHeart, orangeUser, redBag } from "../../../assets/images";
import { useIsFocused } from "@react-navigation/native";
import { TaskDataProp } from "../../components/AddTaskModal";
import {
  Groups,
  returnDoneAndUpcomingTasks,
  returnGroupData,
} from "../../utils";
import { Dimensions } from "react-native";
import * as Animatable from "react-native-animatable";

const { height } = Dimensions.get("window");

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
  width: 100%;
  height: ${height * 0.23}px;
  border-radius: 15px;
  background-color: ${({ bgColor }) => bgColor};
  padding: 12px;
  margin-bottom: 15px;
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
  height: ${height * 0.23}px;
  width: 100%%;
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
  pastTasks?: number;
  upcomingTasks?: number;
  delay: number;
  animationType: string | Record<string, string> | any;
};

const TaskItem = ({
  bgColor,
  iconImage,
  title,
  textColor,
  doneTextColor = textColor,
  lightPillColor,
  onPress,
  pastTasks,
  upcomingTasks,
  animationType,
  delay,
}: TaskItemProps): JSX.Element => {
  return (
    <Animatable.View
      style={{ width: "48%" }}
      delay={delay}
      animation={animationType}
    >
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
          {upcomingTasks !== undefined && (
            <Pill bgColor={lightPillColor}>
              <CustomText
                color={textColor}
                fontSize={14}
                fontFamily={Fonts?.DMSansBold}
                fontWeight="700"
              >
                {upcomingTasks} left
              </CustomText>
            </Pill>
          )}

          {pastTasks !== undefined && (
            <Pill bgColor={Colors?.white}>
              <CustomText
                color={doneTextColor}
                fontSize={14}
                fontFamily={Fonts?.DMSansBold}
                fontWeight="700"
              >
                {pastTasks} done
              </CustomText>
            </Pill>
          )}
        </Row>
      </ItemWrap>
    </Animatable.View>
  );
};

type TaskBtnProp = {
  navigation: {
    navigate: (prop: string, args?: Record<string, any>) => {};
  };
  setAddTaskModalVisible: (e: boolean) => void;
  currentWeekData: TaskDataProp[];
};

const AddTaskBtn = ({
  setAddTaskModalVisible,
  animationType,
  delay,
}: any): JSX.Element => {
  return (
    <Animatable.View
      style={{ width: "48%" }}
      delay={delay}
      animation={animationType}
    >
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
    </Animatable.View>
  );
};

const Tasks = ({
  navigation,
  setAddTaskModalVisible,
  currentWeekData,
}: TaskBtnProp): JSX.Element => {
  const personalData = returnGroupData(currentWeekData, Groups.Personal);
  const workData = returnGroupData(currentWeekData, Groups.Work);
  const healthData = returnGroupData(currentWeekData, Groups.Health);

  const isFocused = useIsFocused();

  const { pastTasks: personalPastTasks, upcomingTasks: personalUpcomingTasks } =
    returnDoneAndUpcomingTasks(currentWeekData, Groups.Personal);

  const { pastTasks: workPastTasks, upcomingTasks: workUpcomingTasks } =
    returnDoneAndUpcomingTasks(currentWeekData, Groups.Work);

  const { pastTasks: healthPastTasks, upcomingTasks: healthUpcomingTasks } =
    returnDoneAndUpcomingTasks(currentWeekData, Groups.Health);

  const slideInLeft = {
    from: {
      left: -1000,
    },
    to: {
      left: 0,
    },
  };
  const slideInRight = {
    from: {
      right: -1000,
    },
    to: {
      right: 0,
    },
  };

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
          pastTasks={personalPastTasks?.length}
          upcomingTasks={personalUpcomingTasks?.length}
          onPress={() =>
            navigation?.navigate("Detail", {
              dotColor: Colors?.lemon,
              bgColor: Colors?.light_yellow,
              title: "Personal",
              dataList: personalData,
            })
          }
          animationType={slideInLeft}
          delay={0}
        />

        <TaskItem
          bgColor={Colors?.light_red}
          textColor={Colors?.tomato_red}
          title="Work"
          lightPillColor={Colors?.light_red_2}
          iconImage={redBag}
          pastTasks={workPastTasks?.length}
          upcomingTasks={workUpcomingTasks?.length}
          onPress={() =>
            navigation?.navigate("Detail", {
              dotColor: Colors?.tomato_red,
              bgColor: Colors?.light_red,
              title: "Work",
              dataList: workData,
            })
          }
          animationType={slideInRight}
          delay={150}
        />

        <TaskItem
          bgColor={Colors?.light_blue}
          textColor={Colors?.blue}
          title="Health"
          lightPillColor={Colors?.light_blue_2}
          iconImage={blueHeart}
          pastTasks={healthPastTasks?.length}
          upcomingTasks={healthUpcomingTasks?.length}
          onPress={() =>
            navigation?.navigate("Detail", {
              dotColor: Colors?.blue,
              bgColor: Colors?.light_blue,
              title: "Health",
              dataList: healthData,
            })
          }
          animationType={slideInLeft}
          delay={200}
        />

        <AddTaskBtn
          navigation={navigation}
          setAddTaskModalVisible={setAddTaskModalVisible}
          animationType={slideInRight}
          delay={250}
        />
      </RowWrapped>
    </Container>
  );
};

export default Tasks;
