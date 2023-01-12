import { Modal } from "react-native";
import React from "react";
import CalendarPicker from "react-native-calendar-picker";
import { CalenderNext, CalenderPrev } from "../../../assets/svg";
import styled from "styled-components/native";
import { BlurView } from "expo-blur";
import Colors from "../../constants/Colors";
import { getCurrentWeekEndDay, getCurrentWeekStartDay } from "../../utils";

const BlurWrap = styled(BlurView)`
  height: 100%;
  width: 100%;
  zindex: 3px;
  position: absolute;
  top: 0;
`;

const CenteredContainer = styled.View`
  height: 100%;
  width: 100%;
  flex: 1;
  justify-content: center;
  algin-items: center;
`;

const CalenderContainer = styled.View`
  background-color: ${Colors?.white};
  border-radius: 12px;
  padding-vertical: 10px;
  width: 95%;
  align-self: center;
`;

type CalenderModalProps = {
  visible: boolean;
  setVisible: (e: boolean) => void;
  setDate: (e: any) => void;
};

const CalenderModal = ({
  visible,
  setVisible,
  setDate,
}: CalenderModalProps) => {
  // const calanderRef = useRef();

  const onDateChange = (date: any) => {
    setDate(date);
    setVisible(false);
  };

  return (
    <Modal visible={visible} transparent={true}>
      <CenteredContainer>
        <BlurWrap intensity={20} />

        <CalenderContainer
          style={{
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 7,
            },
            shadowOpacity: 0.43,
            shadowRadius: 9.51,

            elevation: 15,
          }}
        >
          <CalendarPicker
            // ref={calanderRef}
            startFromMonday={true}
            allowRangeSelection={false}
            minDate={getCurrentWeekStartDay()}
            maxDate={getCurrentWeekEndDay()}
            selectedDayColor={Colors?.primary}
            selectedDayTextColor={Colors.black}
            selectedDayTextStyle={{
              color: Colors.black,
              fontSize: 15,
              fontWeight: "600",
            }}
            disabledDatesTextStyle={{
              color: Colors.subtitle_text_2,
              fontSize: 15,
              fontWeight: "600",
            }}
            onDateChange={onDateChange}
            nextComponent={<CalenderNext />}
            previousComponent={<CalenderPrev />}
            dayLabelsWrapper={{
              borderTopWidth: 0,
              borderBottomWidth: 0,
            }}
            monthTitleStyle={{
              color: Colors.black,
              fontSize: 20,
              fontWeight: "700",
            }}
            yearTitleStyle={{
              color: Colors.black,
              fontSize: 20,
              fontWeight: "700",
              marginLeft: 15,
            }}
            customDayHeaderStyles={() => {
              return {
                textStyle: {
                  color: Colors.subtitle_text_2,
                  fontSize: 15,
                  fontWeight: "600",
                },
              };
            }}
            textStyle={{
              color: Colors.black,
              fontSize: 15,
              fontWeight: "600",
            }}
            selectedRangeStartStyle={{
              backgroundColor: Colors.primary,
              height: 32,
              width: 32,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
            }}
            selectedRangeEndStyle={{
              backgroundColor: Colors.primary,
              height: 32,
              width: 32,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 4,
              borderBottomLeftRadius: 4,
              borderBottomRightRadius: 4,
            }}
            selectedRangeStyle={{
              backgroundColor: Colors.grey_green,
              width: 77,
              height: 32,
            }}
            selectedRangeStartTextStyle={{
              color: Colors.white,
            }}
            selectedRangeEndTextStyle={{
              color: Colors.white,
            }}
          />
        </CalenderContainer>
      </CenteredContainer>
    </Modal>
  );
};

export default CalenderModal;
