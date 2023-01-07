import React from "react";
import { View, ViewStyle, TextStyle, ScrollView } from "react-native";
import styled from "styled-components/native";
import { ChevDownSvg } from "../../../assets/svg";
import CustomText from "../../components/CustomText";
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

const Container = styled.View`
  flex: 1;
  background-color: ${Colors?.white};
  margin-top: 16px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 16px;
`;

const SpaceBetween = styled.View<{
  marginTop?: number;
  marginBottom?: number;
}>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({ marginTop }) => marginTop || 0}px;
  margin-bottom: ${({ marginBottom }) => marginBottom || 0}px;
`;

const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

const DrowdownWrap = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px;
  background-color: ${Colors?.grey_6};
  border-radius: 20px;
`;

const TimeItemWrap = styled.View<{
  lineBg?: string;
}>`
  height: 70px;
  justify-content: space-between;
  padding-left: 10px;
  position: relative;
  flex: 1;
`;

const Dot = styled.View<{
  bgColor?: string;
}>`
    height: 10px;
    width: 10px;
    border-radius: ${10 / 2}px
    background-color: ${({ bgColor }) => bgColor || Colors?.tomato_red}
`;

const BubbleWrap = styled.View<{
  bgColor?: string;
}>`
  height: 100%;
  width: 100%;
  border-radius: 20px;
  border-top-left-radius: 0px;
  padding: 16px;
  background-color: ${({ bgColor }) => bgColor || Colors?.light_red};
  justify-content: space-between;
  overflow: hidden;
`;

const Line = styled.View<{
  lineBg: string;
  height: string;
}>`
  height: ${({ height }) => height};
  width: 2px;
  background-color: ${({ lineBg }) => lineBg};
  position: absolute;
  left: -2px;
  top: 6px;
`;

type WeekDayProp = {
  dayText: string;
  dayNumber: string;
  isSelected: boolean;
};

type TimeItemProp = {
  endDotColor: string;
  timeLineColor: string;
  startTime?: string;
  endTime: string;
};

type AdgendaItemProp = {
  bubbleBgColor: string;
  endDotColor: string;
  timeLineColor: string;
  startTime?: string;
  endTime: string;
};

type BubbleProp = {
  bg: string;
};

const WeekDay = ({
  isSelected = false,
  dayNumber,
  dayText,
}: WeekDayProp): JSX.Element => {
  return (
    <View
      style={{
        alignItems: "center",
        backgroundColor: isSelected ? Colors?.light_grey_2 : Colors?.white,
        paddingHorizontal: 6,
        paddingVertical: 10,
        borderRadius: 20,
      }}
    >
      <CustomText
        fontSize={14}
        fontFamily={Fonts.GraphikRegular}
        fontWeight="600"
        color={isSelected ? Colors?.black : Colors?.grey_4}
      >
        {dayText}
      </CustomText>
      <CustomText
        fontSize={14}
        top={4}
        fontFamily={Fonts.DMSansBold}
        fontWeight={isSelected ? "700" : "600"}
        color={isSelected ? Colors?.black : Colors?.grey_5}
      >
        {dayNumber}
      </CustomText>
    </View>
  );
};

const WeekDaysContainer: React.FC = (): JSX.Element => {
  return (
    <SpaceBetween>
      <WeekDay dayNumber="24" dayText="Sun" isSelected={false} />
      <WeekDay dayNumber="25" dayText="Mon" isSelected={false} />
      <WeekDay dayNumber="26" dayText="Tue" isSelected={false} />
      <WeekDay dayNumber="27" dayText="Wed" isSelected={false} />
      <WeekDay dayNumber="28" dayText="Thu" isSelected />
      <WeekDay dayNumber="29" dayText="Fri" isSelected={false} />
      <WeekDay dayNumber="30" dayText="Sat" isSelected={false} />
    </SpaceBetween>
  );
};

const TimelineDropdown: React.FC = (): JSX.Element => {
  return (
    <DrowdownWrap>
      <CustomText
        fontSize={13}
        fontFamily={Fonts.DMSansBold}
        fontWeight="800"
        right={3}
        color={Colors?.black}
      >
        Timeline
      </CustomText>
      <ChevDownSvg />
    </DrowdownWrap>
  );
};

const TimeLineHeader: React.FC = (): JSX.Element => {
  return (
    <SpaceBetween marginTop={30} marginBottom={30}>
      <CustomText
        fontSize={24}
        fontFamily={Fonts.DMSansBold}
        fontWeight="800"
        color={Colors?.black}
      >
        Tasks
      </CustomText>

      <TimelineDropdown />
    </SpaceBetween>
  );
};

const TimeItem = ({
  endDotColor,
  timeLineColor,
  startTime,
  endTime,
}: TimeItemProp): JSX.Element => {
  const startDotStyle: ViewStyle = {
    position: "absolute",
    top: 0,
    left: -16,
  };
  const endDotStyle: ViewStyle = {
    position: "absolute",
    bottom: 0,
    left: -16,
  };

  const startTextStyle: TextStyle = {
    position: "relative",
    top: -3,
  };
  const endTextStyle: TextStyle = {
    position: "relative",
    top: 3,
  };

  return (
    <TimeItemWrap>
      <Row>
        {startTime && <Dot style={startDotStyle} />}

        <CustomText
          fontSize={15}
          style={startTextStyle}
          fontFamily={Fonts?.GraphikRegular}
        >
          {startTime || ""}
        </CustomText>
      </Row>

      <Row>
        <Dot style={endDotStyle} bgColor={endDotColor} />
        <CustomText
          fontSize={15}
          style={endTextStyle}
          fontFamily={Fonts?.GraphikRegular}
        >
          {endTime}
        </CustomText>
      </Row>
      <Line
        height={startTime ? "100%" : "150%"}
        style={{ top: startTime ? 0 : -35 }}
        lineBg={timeLineColor}
      />
    </TimeItemWrap>
  );
};

const Bubble = ({ bg }: BubbleProp): JSX.Element => {
  return (
    <BubbleWrap bgColor={bg}>
      <CustomText
        numberOfLines={1}
        fontWeight="600"
        fontFamily={Fonts?.DMSansBold}
        fontSize={18}
      >
        Go for a walk with dog
      </CustomText>
      <CustomText
        fontWeight="400"
        color={Colors?.dark_grey}
        fontFamily={Fonts?.GraphikRegular}
        fontSize={15}
      >
        9:00am - 10:00am
      </CustomText>
    </BubbleWrap>
  );
};

const AdgendaItem = ({
  bubbleBgColor,
  endDotColor,
  timeLineColor,
  startTime,
  endTime,
}: AdgendaItemProp): JSX.Element => {
  return (
    <SpaceBetween style={{ height: 80, marginBottom: 16 }}>
      <TimeItem
        endTime={endTime}
        startTime={startTime}
        endDotColor={endDotColor}
        timeLineColor={timeLineColor}
      />
      <View style={{ flex: 2.3 }}>
        <Bubble bg={bubbleBgColor} />
      </View>
    </SpaceBetween>
  );
};

const AdgendaComponent: React.FC = (): JSX.Element => {
  return (
    <View>
      <AdgendaItem
        bubbleBgColor={Colors?.light_red}
        timeLineColor={Colors?.tomato_red}
        endDotColor={Colors?.blue}
        startTime="9:00am"
        endTime="10:00am"
      />
      <AdgendaItem
        bubbleBgColor={Colors?.light_blue}
        timeLineColor={Colors?.blue}
        endDotColor={Colors?.blue}
        endTime="11:00am"
      />
      <AdgendaItem
        bubbleBgColor={Colors?.light_yellow}
        timeLineColor={Colors?.lemon}
        endDotColor={Colors?.lemon}
        endTime="12:00pm"
      />
      <AdgendaItem
        bubbleBgColor={Colors?.light_red}
        timeLineColor={Colors?.tomato_red}
        endDotColor={Colors?.tomato_red}
        endTime="1:00pm"
      />
      <AdgendaItem
        bubbleBgColor={Colors?.light_red}
        timeLineColor={Colors?.tomato_red}
        endDotColor={Colors?.tomato_red}
        endTime="2:00pm"
      />
      <AdgendaItem
        bubbleBgColor={Colors?.light_blue}
        timeLineColor={Colors?.blue}
        endDotColor={Colors?.blue}
        endTime="3:00pm"
      />
    </View>
  );
};

const Schedule = (): JSX.Element => {
  return (
    <Container>
      <WeekDaysContainer />
      <TimeLineHeader />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 7,
        }}
        showsVerticalScrollIndicator={false}
      >
        <AdgendaComponent />
      </ScrollView>
    </Container>
  );
};

export default Schedule;
