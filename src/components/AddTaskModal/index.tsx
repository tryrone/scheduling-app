import { Animated, Dimensions, Modal } from "react-native";
import React, { useEffect, useRef, useState } from "react";
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

const AddTaskModal = ({ visible, setVisible }: AddTaskModalProp) => {
  const [calenderModalVisible, setCalenderModalVisible] = useState(false);
  const [taskData, setTaskData] = useState({
    title: "",
    Date: "",
    time: "",
  });

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
      setVisible(false);
    }, 300);
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
              // width: "100%",
              // alignSelf: "flex-end",
              // marginBottom: 20,
              // flex: 1,
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

              <TextInput placeholder="Title" value="" />

              <TextInput
                onWrapPress={setCalenderModalVisible}
                disabled
                placeholder="Date"
                value=""
                marginTop={16}
              />

              <CustomTimePicker
                placeholder="e.g 12:00 pm"
                onValueChange={(e) => {
                  console.log({ e });
                  // setFieldValue("cutoff_order_time", e);
                }}
                style={{ flex: 1 }}
                top={10}
                value={""}
              />

              <DropDown
                placeholder="Select Task Type"
                onValueChange={(e) => {
                  console.log({ e });
                  // setFieldValue("deliveryType", e);
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
                value={""}
              />

              <Button
                style={{ marginTop: 16 }}
                text="Create Task"
                disabled={false}
                bgColor={Colors?.black}
              />
            </Container>
          </Animated.View>
        </Wrapper>
        <CalenderModal
          visible={calenderModalVisible}
          setVisible={setCalenderModalVisible}
        />
      </KeyboardShift>
    </Modal>
  );
};

export default AddTaskModal;
