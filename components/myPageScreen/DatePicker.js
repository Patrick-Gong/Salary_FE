import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import styled from "styled-components";
import fonts from "../../styles/fonts";

const PickerContainer = styled.View`
  display: flex;
  flex-direction: row;
`;

const DatePicker = ({ dateSelected, setDateSelected }) => {
  const [selectedValue, setSelectedValue] = useState({});

  return (
    <PickerContainer>
      <Picker
        style={styles.picker}
        selectedValue={String(dateSelected.year)}
        onValueChange={(itemValue) =>
          setDateSelected({
            ...dateSelected,
            year: itemValue,
          })
        }
      >
        {[...Array(10).keys()].map((num) => (
          <Picker.Item
            label={`${num + 2015}년`}
            value={`${num + 2015}`}
            key={num}
          />
        ))}
      </Picker>
      <Picker
        style={styles.picker}
        selectedValue={String(dateSelected.month)}
        onValueChange={(itemValue) =>
          setDateSelected({
            ...dateSelected,
            month: itemValue,
          })
        }
      >
        {[...Array(12).keys()].map((num) => (
          <Picker.Item
            label={`${num + 1}월`}
            value={`${num + 1}`}
            key={num + 1}
          />
        ))}
      </Picker>
    </PickerContainer>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // 가로 정렬
    justifyContent: "space-between", // 간격 조정
    alignItems: "center", // 수직 정렬
    padding: 10,
  },
  picker: {
    flex: 1, // 동일한 비율로 크기를 나누기
    marginHorizontal: 5, // 좌우 여백
  },
});
