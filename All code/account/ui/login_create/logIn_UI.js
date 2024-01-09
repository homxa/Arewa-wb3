import {Controller } from "react-hook-form";
import { View,Text,TextInput } from "react-native";

import { useState } from "react";
import { styles } from "./create";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export const deatail = [
  {
    user: "userName",
    icon: {
      fontName: "Ionicons",
      name: "ios-person",
      size: 20,
    },
    passIcon: {
      fontName: null,
      name: null,
      size: null,
    },
  },
  {
    user: "email",
    icon: {
      fontName: "MaterialIcons",
      name: "email",
      size: 24,
    },
    passIcon: {
      fontName: null,
      name: null,
      size: null,
    },
  },
  {
    user: "password",
    icon: {
      fontName: "MaterialIcons",
      name: "lock",
      size: 24,
    },
    passIcon: {
      fontName: "Feather",
      name: "lock",
      size: 24,
    },
  },
  {
    user: "confirmPassword",
    icon: {
      fontName: "MaterialIcons",
      name: "lock",
      size: 24,
      id: 1
    },
    passIcon: {
      fontName: "Feather",
      name: "lock",
      size: 24,
      id: 2
    },
  },
];

export const Render = ({item,control,errors}) => {
  const [viseble, setVisible] = useState(false);

  return (
    <Controller
      control={control}
      render={({ field }) => (
        <>
          <View
            style={[
              styles.Input,
              {
                position: "relative",
                overflow: "hidden",
                borderColor: errors[item.user]?.message ? "red" : "black",
              },
            ]}
          >
            <Text style={{ paddingLeft: 10 }}>
              {item.icon.fontName === "Ionicons" ? (
                <Ionicons
                  name={item.icon.name}
                  size={item.icon.size}
                  color="black"
                />
              ) : item.icon.fontName === "MaterialIcons" ? (
                <MaterialIcons
                  name={item.icon.name}
                  size={item.icon.size}
                  color="black"
                />
              ) : null}
            </Text>
            <TextInput
              placeholder={`${item.user}`}
              onChangeText={(value) => {
                field.onChange(value);
              }}
              onBlur={field.onBlur}
              value={field.value}
              style={{ paddingLeft: 10, width: 195 }}
              secureTextEntry={
                item.passIcon && item.passIcon.fontName == "Feather"
                  ? viseble
                  : false
              }
            />
            {item.passIcon.fontName === "Feather" ? (
              <Text
                style={{
                  position: "absolute",
                  right: 20,
                  top: 6,
                  zIndex: 3,
                }}
                onPress={() => setVisible((prev) => !prev)}
              >
                {viseble ? (
                  <Feather name="eye-off" size={24} color="black" />
                ) : (
                  <Feather name="eye" size={24} color="black" />
                )}
              </Text>
            ) : (
              ""
            )}
          </View>
          <Text
            style={{
              marginBottom: 5,
              fontSize: 12,
              color: "red",
              fontWeight: 600,
            }}
          >
            {errors[item.user]?.message}
          </Text>
        </>
      )}
      name={`${item.user}`}
    />
  );
};
// logins and signUp UI

