/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-undef */
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import {
  KeyboardTypeOptions,
  Platform,
  Pressable,
  View,
  ViewStyle,
} from "react-native";
import styled from "styled-components/native";
import { ClockSvg, SelectIconSvg } from "../../../assets/svg";
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";
import CustomText from "../CustomText";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import RNPickerSelect from "react-native-picker-select";

const Wrapper = styled.View<{
  width?: number;
  active?: boolean;
  marginTop?: number;
}>`
  height: 56px;
  width: ${(props) => props?.width || 100}%;
  border-width: 1px;
  border-color: ${(props) =>
    props?.active ? Colors?.primary : Colors?.border};
  border-radius: 4px;
  background-color: ${(props) =>
    props?.active ? "rgba(154, 226, 254, 0.1)" : Colors?.white};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${(props) => props?.marginTop || 0}px;
  padding-horizontal: 12px;
  z-index: 4;
`;

const DisabledView = styled.View<{
  width?: number;
  marginTop?: number;
}>`
  height: 56px;
  width: ${(props) => props?.width || 100}%;
  margin-top: ${(props) => props?.marginTop || 0}px;
  z-index: 6;
  position: absolute;
  background-color: rgba(0, 0, 0, 0);
`;

const TextWrap: any = styled.TextInput`
  height: 100%;
  width: 100%;
  font-family: ${Fonts?.GraphikRegular};
  font-size: 14px;
  font-weight: 400;
  color: ${Colors?.black};
  align-items: center;
`;

const ViewWrap = styled.View<{
  width?: string;
  top?: number;
  bottom?: number;
  viewStyle?: {};
}>`
  position: relative;
  width: ${({ width }) => width || "100%"};
  margin-top: ${({ top }) => top}px;
  margin-bottom: ${({ bottom }) => bottom || 0}px;
  ${({ viewStyle }) => viewStyle};
`;

const Row = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const InputWithIcon = styled.Pressable<{
  bgColor: string;
  borderColor: string;
}>`
  flex-direction: row;
  width: 100%;
  background-color: ${({ bgColor }) => bgColor};
  padding-horizontal: 16px;
  height: 55px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${({ borderColor }) => borderColor};
  justify-content: space-between;
  align-items: center;
`;

const DropDownContent = styled.View`
  width: 80%;
`;

const InputWithIconTwo = styled.Pressable<{
  active: boolean;
}>`
  flex-direction: row;
  width: 100%;
  padding-horizontal: 16px;
  height: 55px;
  border-width: 1px;
  justify-content: space-between;
  align-items: center;
  border-color: ${(props) =>
    props?.active ? Colors?.primary : Colors?.border};
  border-radius: 4px;
  background-color: ${(props) =>
    props?.active ? "rgba(154, 226, 254, 0.1)" : Colors?.white};
`;

const GrayContainer = styled.View`
  width: 100%;
  border-radius: 8px;
  height: 56px;
  background-color: rgba(242, 242, 242, 0.5);
  padding-horizontal: 16px;
  z-index: 3;
  position: absolute;
  bottom: 1px;
`;

type TextInputProps = {
  marginTop?: number;
  placeholder?: string;
  placeholderTextColor?: string;
  inputType?: KeyboardTypeOptions;
  returnValue?: boolean;
  handleChange?: ((e: string) => void) | undefined;
  name?: string;
  errors?: string;
  value: string;
  showNaira?: boolean;
  onWrapPress?: ((e: boolean) => void) | undefined;
  disabled?: boolean;
};

const TextInput = ({
  marginTop = 0,
  placeholder = "",
  placeholderTextColor = Colors.greyPlaceholderTextColor,
  inputType = "default",
  returnValue = false,
  handleChange = () => {},
  name = "",
  errors = "",
  value,
  showNaira = false,
  onWrapPress,
  disabled,
}: TextInputProps) => {
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (errors.length > 0) {
      setFocused(false);
    }
  }, [errors]);

  return (
    <Pressable
      onPress={() => {
        onWrapPress && onWrapPress(true);
      }}
    >
      {disabled && <DisabledView marginTop={marginTop} />}
      <Wrapper active={focused} marginTop={marginTop}>
        {showNaira && (
          <CustomText
            color={Colors.grey_2}
            align="left"
            right={5}
            fontWeight="800"
            fontSize={14}
            fontFamily={Fonts.DMSansBold}
          >
            ₦
          </CustomText>
        )}

        <TextWrap
          placeholderTextColor={placeholderTextColor}
          placeholder={placeholder}
          keyboardType={inputType}
          onChangeText={
            returnValue
              ? (e: string) => {
                  handleChange(e);
                }
              : handleChange(name)
          }
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
          }}
          value={value}
        />
        {errors.length > 0 && (
          <CustomText
            fontWeight="400"
            style={{
              bottom: Platform.OS === "android" ? -20 : -22,
              position: "absolute",
              fontSize: 12,
            }}
            color={Colors.error}
          >
            {errors}
          </CustomText>
        )}
      </Wrapper>
    </Pressable>
  );
};

type CustomTimePickerProps = {
  top?: number;
  fontSize?: number;
  value?: string;
  onValueChange?: ((val: number) => void) | undefined;
  setFieldTouched?: ((val: string) => void) | undefined;
  placeholder?: string;
  errors?: string;
  name?: string;
  style?: {};
  showTimeIcon?: boolean;
  disabled?: boolean;
};

export const CustomTimePicker = ({
  top = 0,
  value = "",
  onValueChange = () => {},
  placeholder = "Select",
  errors = "",
  style = {},
  setFieldTouched = () => {},
  name = "",
  showTimeIcon = false,
  disabled = false,
  fontSize,
}: CustomTimePickerProps) => {
  const [focused, setFocused] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const onOpenPicker = () => {
    setOpenDate(true);
    setFocused(true);
    setFieldTouched(name);
  };

  const [currentTimeValue, setCurrentTimeValue] = React.useState(Date.now());

  const handleConfirm = (date: Date) => {
    if (!date) return;
    const timeSelected = date.getTime();

    setOpenDate(false);
    onValueChange(timeSelected);
    setCurrentTimeValue(Date.now());
    setFocused(false);
  };

  const includesAmpm = `${value}`.includes("AM") || `${value}`.includes("PM");

  return (
    <ViewWrap
      bottom={errors && errors.length > 0 ? 76 : 60}
      top={top}
      style={style}
      width="100%"
    >
      <View
        style={{
          position: "relative",
          height: 57,
          width: "100%",
        }}
      >
        <InputWithIconTwo onPress={onOpenPicker} active={focused}>
          <Row>
            {showTimeIcon && <ClockSvg style={{ marginRight: 10 }} />}

            <CustomText
              color={
                value.length === 0
                  ? Colors.greyPlaceholderTextColor
                  : Colors.black
              }
              align="left"
              fontWeight="400"
              fontFamily={Fonts?.GraphikRegular}
              fontSize={fontSize || 12}
            >
              {value.length === 0
                ? placeholder
                : value === "12:00 AM"
                ? "00:00"
                : includesAmpm
                ? value
                : moment(value).format("h:mm A")}
            </CustomText>
          </Row>

          <DateTimePickerModal
            date={new Date(currentTimeValue)}
            isVisible={openDate}
            mode="time"
            onConfirm={handleConfirm}
            onCancel={() => {
              setOpenDate(false);
            }}
            minuteInterval={10}
          />
        </InputWithIconTwo>
        {disabled && <GrayContainer />}
      </View>

      {errors.length > 0 && (
        <CustomText
          fontWeight="400"
          style={{
            bottom: Platform.OS === "android" ? -20 : -22,
            position: "absolute",
            fontSize: 12,
          }}
          color={Colors.error}
        >
          {errors}
        </CustomText>
      )}
    </ViewWrap>
  );
};

interface ValueLabel {
  value: string;
  label: string;
}

type DropDownProp = {
  bgColor?: string;
  top?: number;
  value: string;
  pickerItems?: ValueLabel[];
  onValueChange?: ((res: string) => void) | undefined;
  placeholder?: string;
  errors?: string;
  style?: ViewStyle;
  showChevron?: boolean;
  width?: string;
};

export class PickerSelect extends React.Component {
  pickerRef = React.createRef<any>();

  openPicker() {
    if (Platform.OS === "android") {
      this.pickerRef.current.focus();
    } else {
      this.pickerRef.current.togglePicker(true);
    }
  }

  render() {
    const { onValueChange, items, value, onClose, placeholder, onOpen }: any =
      this.props;
    return (
      <RNPickerSelect
        placeholder={placeholder}
        onValueChange={onValueChange}
        onClose={onClose}
        items={items}
        onOpen={onOpen}
        style={{
          viewContainer: {
            height: 0,
            position: "absolute",
            width: 0,
            opacity: 0,
            top: -1000,
          },
          inputAndroid: { color: "black", opacity: 0 },
        }}
        ref={Platform.OS === "ios" ? this.pickerRef : null}
        pickerProps={{ ref: Platform.OS === "android" ? this.pickerRef : null }}
        value={value}
        useNativeAndroidPickerStyle={false}
      />
    );
  }
}

export const DropDown = ({
  bgColor = Colors.inputGreyBg,
  top = 0,
  value = "",
  pickerItems = [],
  onValueChange = () => {},
  placeholder = "Select",
  errors = "",
  style = {},
  showChevron = true,
  width = "100%",
}: DropDownProp) => {
  const pickerRef = useRef<any>();
  const [selectedValue, setSelectedValue] = useState(value);
  const [focused, setFocused] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const onOpenPicker = () => {
    pickerRef?.current?.openPicker();
  };

  useEffect(() => {
    const newSelected: any = pickerItems.find((item) => item.value === value);
    setSelected(newSelected);
  }, [value, pickerItems]);

  return (
    <ViewWrap
      bottom={errors && errors.length > 0 ? 16 : 0}
      top={top}
      style={style}
      width={width}
    >
      <InputWithIcon
        onPress={placeholder === "Default" ? null : onOpenPicker}
        borderColor={focused ? Colors.primary : Colors.inputGreyBg}
        bgColor={bgColor}
      >
        <DropDownContent>
          <CustomText
            color={
              !selected?.value && value.length === 0
                ? Colors.greyPlaceholderTextColor
                : Colors.black
            }
            style={{
              position: "relative",
              top: Platform.OS === "android" ? 24 : 0,
            }}
            align="left"
            fontWeight="400"
            fontSize={12}
            fontFamily={Fonts?.GraphikRegular}
          >
            {!selected?.value && value.length === 0
              ? placeholder
              : selected?.value || value}
          </CustomText>
          <PickerSelect
            ref={pickerRef}
            placeholder={{ value: null, label: placeholder }}
            onValueChange={(val: any) => {
              if (!val) return;
              setSelectedValue(val);
              if (Platform.OS === "android") {
                onValueChange(val);
              }
              setFocused(false);
            }}
            onClose={() => {
              onValueChange(selectedValue);
              setFocused(false);
            }}
            onOpen={() => {
              setFocused(true);
            }}
            value={selectedValue}
            items={pickerItems}
          />
        </DropDownContent>

        {showChevron && <SelectIconSvg />}
      </InputWithIcon>
      {errors.length > 0 && (
        <CustomText
          fontWeight="400"
          style={{
            bottom: Platform.OS === "android" ? -20 : -22,
            position: "absolute",
            fontSize: 12,
          }}
          color={Colors.error}
        >
          {errors}
        </CustomText>
      )}
    </ViewWrap>
  );
};

export default TextInput;
