import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {  Controller } from "react-hook-form";
import { useState } from "react";
import { View, Text, TextInput} from "react-native";
export const Render = ({item,errors,control,styles}) => {
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
                borderColor: errors[item.user]?.message ? "red" : "white",
              },
            ]}
          >
            <Text style={{ paddingLeft: 10 }}>
              {item.icon.fontName === "MaterialIcons" ? (
                <MaterialIcons
                  name={item.icon.name}
                  size={item.icon.size}
                  color= {errors[item.user]?.message ? "red" : "white"}
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
              style={{ paddingLeft: 10, width: 200,color: 'white' }}
              secureTextEntry={
                item.passIcon && item.passIcon.fontName == "Feather"
                  ? viseble
                  : false
              }
              placeholderTextColor='gray'
              
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
                  <Feather name="eye-off" size={24} color="white" />
                ) : (
                  <Feather name="eye" size={24} color="white" />
                )}
              </Text>
            ) : (
              ""
            )}
          </View>
          <Text
            style={{
              marginBottom: 5,
              width: 300,
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


