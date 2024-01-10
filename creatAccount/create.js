import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { deatail2 } from "./logindeatils";
import { Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { auth } from "./config/config";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";

const Render = ({ item, control, errors }) => {
  const [viseble, setVisible] = useState(false);

  return (
    <Controller
      control={control}
      render={({ field }) => (
        <>
          <View
            style={[
              styles.input,
              {
                position: "relative",
                overflow: "hidden",
                borderColor: errors[item.user]?.message ? "red" : "white",
              },
            ]}
          >
            <Text style={{ paddingLeft: 10 }}>
              {item.icon.fontName === "Ionicons" ? (
                <Ionicons
                  name={item.icon.name}
                  size={item.icon.size}
                  color={errors[item.user]?.message ? "red" : "white"}
                />
              ) : item.icon.fontName === "MaterialIcons" ? (
                <MaterialIcons
                  name={item.icon.name}
                  size={item.icon.size}
                  color={errors[item.user]?.message ? "red" : "white"}
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
              style={{ paddingLeft: 10, width: 195, color: "white" }}
              secureTextEntry={
                item.passIcon && item.passIcon.fontName == "Feather"
                  ? viseble
                  : false
              }
              placeholderTextColor="gray"
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

export const Create = () => {
  const [model, setModel] = useState(false);
  // input validating
  const schema = yup.object().shape({
    userName: yup.string().required("Please Enter Your User Name"),
    email: yup
      .string()
      .email("invalid email")
      .required("Please Enter Your Email "),
    password: yup
      .string("enter password")
      .min(4)
      .max(10)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one lowercase letter, one uppercase letter, and one number"
      )
      .required("Please Enter You Password"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "password must matched")
      .required("re-enter password"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // dispalay input UI

  // recieved data
  const data = async (dd) => {
    try {
      const current = await createUserWithEmailAndPassword(
        auth,
        dd.email,
        dd.password
      );
      await sendEmailVerification(current.user);
      setModel((prev) => !prev);
      console.log("Created");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal
        visible={model}
        animationType="slide"
        style={{ flex: 1, maxHeight: 100 }}
        onRequestClose={() => setModel((prev) => !prev)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgb(18,18,40)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image source={require('../assets/ngn.jpg')} resizeMode="contain" style={{width: 100,height: 100,}}/>
          <Text style={{ color: "white" }}>
            Hi there! A verification email has been sent to your email address.
            Please check your inbox and follow the instructions to complete the
            verification process. If you don't see the email, kindly check your
            spam folder as well. Thank you!
          </Text>
          <TouchableOpacity
            style={{
              alignSelf: "flex-end",
              backgroundColor: "white",
              paddingLeft: 50,
              paddingRight: 50,
              paddingVertical: 10,
              marginRight: 30,
            }}
            onPress={() => setModel((prev) => !prev)}
            o
          >
            <Text style={{ color: "black" }}>Back</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <KeyboardAwareScrollView style={[{ flex: 1,backgroundColor: 'rgb(18,18,40)',
 }] }>
        <View style={[styles.top, { alignItems: "center",marginTop: 50 }]}>
          <View>
            <Image
              source={require("../assets/bg.jpg")}
              resizeMode="contain"
              style={{ width: 300, height: 190, borderRadius: 5 }}
            />
            <Text
              style={{
                color: "white",
                fontSize: 20,
                fontWeight: 900,
                textAlign: "center",
              }}
            >
              SIGNUP NOW!
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 10,
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              We are happy to have you with us.
            </Text>
          </View>
          <View style={[styles.bg]}>
            {deatail2.map((item, key) => (
              <Render control={control} item={item} errors={errors} key={key} />
            ))}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit(data)}
            >
              <Text style={styles.buttonText}>SIGNUP</Text>
            </TouchableOpacity>

            {/* {deatail.map((item) => render(item))} */}

            {/* // 2 */}

            {/* ///3 */}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export const styles = StyleSheet.create({
  // top: {
  //   flex: 1,
  //   justifyContent: "center",
  //   backgroundColor: "white",
  //   alignItems: "center",
  // },
  bg: {
    paddingRight: 5,
    paddingTop: 10,
    paddingLeft: 0,
    paddingBottom: 10,

    alignitems: "center",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "inherit",
    // borderWidth: 1,
    // borderColor: 'rgb(40,40,40)',
    // borderCurve: 'solid',
    flexDirection: "row",
    borderWidth: 1,
    padding: 10,
    width: 300,
    borderRadius: 20,
  },

  top: {
    flex: 1,
    backgroundColor: "rgb(18,18,40)",
  },

  button: {
    backgroundColor: "white",
    paddingVertical: 10, // Adjust the padding as needed
    paddingHorizontal: 90, // Adjust the padding as needed
    borderRadius: 5,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
});
