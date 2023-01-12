import moment from "moment";
import React, { useState } from "react";
import { View, ScrollView, Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { ChevDownSvg } from "../../../assets/svg";
import CustomText from "../../components/CustomText";
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";
import {
  AdgendaDataItem,
  calculateData,
  getTime,
  returnCurrentWeek,
} from "../../utils";

const { width: windowWidth } = Dimensions?.get("window");

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

const Dot = styled.View<{
  bgColor?: string;
}>`
    height: 10px;
    width: 10px;
    border-radius: ${10 / 2}px
    background-color: ${({ bgColor }) => bgColor || Colors?.tomato_red}
`;

const Line = styled.View<{
  lineBg: string;
  height: string;
}>`
  height: ${({ height }) => height};
  width: 2px;
  background-color: ${({ lineBg }) => lineBg};
  position: absolute;
  left: 4px;
  top: 6px;
`;

const DrowdownWrap = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 12px;
  background-color: ${Colors?.grey_6};
  border-radius: 20px;
`;

const BubbleWrap = styled.View<{
  bgColor?: string;
  width: number;
  height: number;
  left: number;
  top?: number;
  padding?: number;
}>`
  height: ${({ height }) => height}px;
  width: ${({ width }) => width}px;
  left: ${({ left }) => left}px;
  top: ${({ top }) => top || 0}px;
  border-radius: 20px;
  border-top-left-radius: 0px;
  padding: ${({ padding }) => padding || 16}px;
  background-color: ${({ bgColor }) => bgColor || Colors?.light_red};
  justify-content: space-between;
  overflow: hidden;
  position: absolute;
`;

type WeekDayProp = {
  dayText: string;
  dayNumber: string;
  isSelected: boolean;
  onPress: (() => void) | undefined;
};

type TimeLineItemProps = {
  timeText: string;
  isLast: boolean;
  AdgendaData: AdgendaDataItem[];
  dotColor: string;
  bubbleColor: string;
};

type BubbleProps = {
  startTime?: string;
  endTime?: string;
  text?: string;
  bg: string;
};

const WeekDay = ({
  isSelected = false,
  dayNumber,
  dayText,
  onPress,
}: WeekDayProp): JSX.Element => {
  return (
    <TouchableOpacity
      onPress={onPress}
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
    </TouchableOpacity>
  );
};

const WeekDaysContainer: React.FC = (): JSX.Element => {
  const week = returnCurrentWeek();
  const [selectedDay, setSelectedDay] = useState(moment().format("D-MMM-YYYY"));
  return (
    <SpaceBetween>
      {week?.map((day, index) => {
        const isToday = selectedDay === moment(day).format("D-MMM-YYYY");
        return (
          <WeekDay
            onPress={() => {
              setSelectedDay(moment(day).format("D-MMM-YYYY"));
            }}
            key={`${day}${index}`}
            dayNumber={moment(day).format("D")}
            dayText={moment(day).format("ddd")}
            isSelected={isToday}
          />
        );
      })}
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

const Bubble = ({ startTime, endTime, text, bg }: BubbleProps) => {
  const startHour = startTime ? parseInt(startTime.split(":")[0]) : 0;
  const endHour = endTime ? parseInt(endTime.split(":")[0]) : 0;
  const startMin = startTime ? parseInt(startTime.split(":")[1]) : 0;
  const endMin = endTime ? parseInt(endTime.split(":")[1]) : 0;
  const left = windowWidth * 0.12;
  const width = windowWidth * 0.61;

  const { height } = calculateData({
    startHr: startHour,
    endHr: endHour,
    endMin: endMin,
    startMin: startMin,
  });

  const hr = endHour - startHour;

  return (
    <BubbleWrap
      left={left || 0}
      height={height || 0}
      width={width || 0}
      bgColor={bg}
      padding={hr === 0 ? 4 : undefined}
    >
      <CustomText
        numberOfLines={1}
        fontWeight="600"
        fontFamily={Fonts?.DMSansBold}
        fontSize={hr === 0 ? 10 : 18}
      >
        {text || ""}
      </CustomText>
      <CustomText
        fontWeight="400"
        color={Colors?.dark_grey}
        fontFamily={Fonts?.GraphikRegular}
        fontSize={hr === 0 ? 12 : 15}
      >
        {startTime} - {endTime}
      </CustomText>
    </BubbleWrap>
  );
};

const TimeLineItem = ({
  timeText,
  isLast,
  AdgendaData,
  bubbleColor,
  dotColor,
}: TimeLineItemProps): JSX.Element => {
  const isCurrentHour = AdgendaData?.filter(
    (adgendaItem) =>
      parseInt(adgendaItem?.startTime?.split(":")[0]) ===
      parseInt(timeText?.split(":")[0], 10)
  )?.[0];

  return (
    <SpaceBetween style={{ height: 80 }}>
      <Row>
        {!isLast && <Line lineBg={dotColor} height="100%" />}

        <Dot bgColor={dotColor} />

        <CustomText left={16} fontSize={15} fontFamily={Fonts?.GraphikRegular}>
          {timeText}
        </CustomText>
      </Row>

      {isCurrentHour && (
        <View style={{ flex: 2.3 }}>
          <Bubble
            startTime={isCurrentHour?.startTime}
            bg={bubbleColor}
            endTime={isCurrentHour?.endTime}
            text={isCurrentHour?.text}
          />
        </View>
      )}
    </SpaceBetween>
  );
};

const AdgendaComponent = (params: any): JSX.Element => {
  const twentyForHourTime = getTime();
  const newParams = params?.params?.params;

  const AdgendaData = [
    { startTime: "00:00 AM", endTime: "01:30 AM", text: "Going For a walk" },
    { startTime: "13:00 PM", endTime: "14:00 PM", text: "Going For a walk" },
    { startTime: "03:00 AM", endTime: "04:59 AM", text: "Walking the Dog" },
    {
      startTime: "05:00 AM",
      endTime: "06:00 AM",
      text: "Getting Favour flowers",
    },
    {
      startTime: "17:00 PM",
      endTime: "18:00 PM",
      text: "Getting Favour flowers",
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      {twentyForHourTime?.map((time, index) => {
        return (
          <TimeLineItem
            isLast={index === twentyForHourTime?.length - 1}
            timeText={time}
            key={`${time}-${index}`}
            AdgendaData={AdgendaData}
            dotColor={newParams?.dotColor}
            bubbleColor={newParams?.bgColor}
          />
        );
      })}
    </View>
  );
};

const Schedule = (params: any): JSX.Element => {
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
        <AdgendaComponent params={params} />
      </ScrollView>
    </Container>
  );
};

export default Schedule;
