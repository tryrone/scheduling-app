import { Animated, Dimensions, Modal } from "react-native";
import React, { useEffect, useReducer, useRef, useState } from "react";
import styled from "styled-components/native";
import Colors from "../../constants/Colors";
import { BlurView } from "expo-blur";
import TextInput, { CustomTimePicker, DropDown } from "../TextInput";
import CustomText from "../CustomText";
import Fonts from "../../constants/Fonts";
import Button from "../Button";
import KeyboardShift from "../TextInput/keyoardAvoidingView";
import CalenderModal from "./CalenderModal";
import { AlarmSvg } from "../../../assets/svg";
import moment from "moment";
import { checkObjectValues } from "../../utils";

const { height } = Dimensions.get("window");

const Container = styled.View`
  padding: 16px;
  background-color: ${Colors?.white};
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  width: 100%;
`;

const Wrapper = styled.View`
  flex: 1;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.3);
`;

const SpacedRow = styled.View<{
  mt?: number;
}>`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${({ mt }) => mt || 0}px;
  margin-bottom: 45px;
`;

const BlurWrap = styled(BlurView)`
  height: 100%;
  width: 100%;
  zindex: 3px;
  position: absolute;
  top: 0;
`;

const CloseBtn = styled.TouchableOpacity`
  flex: 1;
`;

type AddTaskModalProp = {
  visible: boolean;
  setVisible: (val: boolean) => {};
};

type TaskDataProp = {
  title: string;
  date: string;
  startTime: string;
  end: string;
  group: string;
};

const AddTaskModal = ({ visible, setVisible }: AddTaskModalProp) => {
  const [calenderModalVisible, setCalenderModalVisible] = useState(false);
  const [error, setError] = useState("");
  const [taskData, setTaskData] = useReducer(
    (prev: TaskDataProp, next: any | TaskDataProp) => {
      const newEvent = { ...prev, ...next };

      return newEvent;
    },
    {
      title: "",
      date: "",
      startTime: "",
      endTime: "",
      group: "",
    }
  );

  const translateY = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(translateY, {
        toValue: 1,
        delay: 50,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const closeModal = () => {
    Animated.timing(translateY, {
      toValue: height,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      setError("");
      setTaskData({
        title: "",
        date: "",
        startTime: "",
        endTime: "",
        group: "",
      });
      setVisible(false);
    }, 300);
  };

  const onSubmit = () => {
    if (taskData?.endTime < taskData?.startTime) {
      return setError("end time cannot be less that start time");
    }
    if (!checkObjectValues(taskData)) {
      const payload = {
        title: taskData?.title,
        date: "",
        startTime: "",
        endTime: "",
        group: taskData?.group,
      };

      console.log({ taskData });
    } else {
      setError("All fields must be filled");
    }
  };

  return (
    <Modal visible={visible} transparent={true}>
      <KeyboardShift>
        <Wrapper>
          <BlurWrap intensity={5} />
          <CloseBtn onPress={closeModal} />
          <Animated.View
            style={{
              transform: [{ translateY }],
            }}
          >
            <Container style={{ zIndex: 4 }}>
              <CustomText
                align="center"
                top={16}
                bottom={16}
                fontFamily={Fonts?.DMSansBold}
                fontSize={18}
              >
                Input Task
              </CustomText>

              <TextInput
                placeholder="Title"
                value={taskData?.title}
                returnValue
                handleChange={(e) => setTaskData({ title: e })}
                key="title"
              />

              <TextInput
                onWrapPress={setCalenderModalVisible}
                disabled
                returnValue
                placeholder="Date"
                value={
                  taskData?.date
                    ? `${moment(taskData?.date).format("Do, MMMM YYYY")}`
                    : ""
                }
                marginTop={16}
                key="date"
              />

              <SpacedRow style={{ backgroundColor: "red" }} mt={10}>
                <CustomTimePicker
                  placeholder="Start Time"
                  onValueChange={(e) => {
                    setTaskData({ startTime: e });
                  }}
                  style={{ flex: 1 }}
                  value={taskData?.startTime}
                  key="startTime"
                />
                <CustomTimePicker
                  placeholder="End Time"
                  onValueChange={(e) => {
                    setTaskData({ endTime: e });
                  }}
                  style={{ flex: 1, marginLeft: 10 }}
                  value={taskData?.endTime}
                  key="endTime"
                />
              </SpacedRow>

              <DropDown
                placeholder="Select Group"
                onValueChange={(e) => {
                  setTaskData({ group: e });
                }}
                top={10}
                style={{ marginBottom: 16 }}
                pickerItems={[
                  { value: "Personal", label: "Personal" },
                  { value: "Health", label: "Health" },
                  {
                    value: "Work",
                    label: "Work",
                  },
                ]}
                value={taskData?.group}
              />

              {error?.length > 0 && (
                <CustomText
                  fontWeight="400"
                  fontSize={14}
                  fontFamily={Fonts?.DMSansMedium}
                  color={Colors.error}
                >
                  {error}
                </CustomText>
              )}

              <Button
                style={{ marginTop: 16 }}
                text="Create Task"
                disabled={checkObjectValues(taskData)}
                onPress={onSubmit}
                bgColor={Colors?.black}
              />
            </Container>
          </Animated.View>
        </Wrapper>
        <CalenderModal
          visible={calenderModalVisible}
          setDate={(val: any) => setTaskData({ date: val })}
          setVisible={setCalenderModalVisible}
        />
      </KeyboardShift>
    </Modal>
  );
};

export default AddTaskModal;
