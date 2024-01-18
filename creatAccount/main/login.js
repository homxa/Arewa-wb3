import { Render } from "../rigist and Login UI/loginUI";
import { useDispatch, useSelector } from "react-redux";
import {
  loginFaild,
  loginSuccess,
  loginstart,
} from "../../redux_store/config_slices/authSlice";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { deatail } from "./logindeatils";
import { auth } from "../config/config";
import { useState } from "react";
// UI of the Logins
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNetwork } from "../config/network";
import { useLogin } from "./schemas/Lschema";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Login = ({ navigation }) => {
  // loading from the store
  const dispatch = useDispatch();
  const [connected] = useNetwork();
  const [error, setError] = useState(false);
  const [loading,setLoading] = useState(false)

  // input validating
  const [handleSubmit, control, errors] = useLogin();

  // recieved data from the inputs
  const data = async (dd) => {
    if (connected) {
      setLoading(true)
      try {

        const current = await signInWithEmailAndPassword(
          auth,
          dd.email,
          dd.password
        );
        console.log("succese", current.user.email);
        const user = {
          userId: current.user.uid,
          email: current.user.email,
          emailVerified: current.user.emailVerified,
        };
        // check if user email is verified then save
        if (user.emailVerified) {
          AsyncStorage.setItem("user", JSON.stringify(user)).then((res) =>
            console.log("saved")
          );
        }
        // loging succes save user in the General store
        dispatch(loginSuccess(user));
        setLoading(false)
      } catch (err) {
        setError(true);
        dispatch(loginFaild(err.message));
        setLoading(false)
      }
    }
  };

  return (
    <>
      <KeyboardAwareScrollView
        style={[{ flex: 1, backgroundColor: "rgb(18,18,40)" }]}
      >
        <View style={[styles.top, { marginTop: 30, alignItems: "center" }]}>
          {/* //Top image  */}
          <View style={{ alignItems: "center" }}>
            <Image
              source={require("../../assets/ngn.jpg")}
              resizeMode="contain"
              style={{ width: 300, height: 190, borderRadius: 5 }}
            />
            <Text style={{ color: "white", fontSize: 10, fontWeight: 500 }}>
              Welcome back, Sign In.
            </Text>
            {error && (
              <Text style={{ color: "red", fontSize: 15, fontWeight: 600 }}>
                Incorrect password!
              </Text>
            )}
          </View>
          <View style={[styles.bg]}>
            {deatail.map((item, key) => (
              <Render
                control={control}
                item={item}
                errors={errors}
                key={key}
                styles={styles}
              />
            ))}

            {/* //Buttons UI */}
            <TouchableOpacity
              style={styles.button}
              disabled={loading}
              onPress={handleSubmit(data)}
            >
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.buttonText}>LOGIN</Text>
              )}
            </TouchableOpacity>
          </View>
          <Text
            style={{
              alignSelf: "flex-start",
              color: "white",
              marginLeft: 40,
              textDecorationColor: "green",
              textDecorationLine: "underline",
            }}
            onPress={() => navigation.navigate("Password Reset")}
          >
            Forget password?
          </Text>

          <Text style={styles.create}>OR</Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "red", marginLeft: 20 }]}
            onPress={() => navigation.navigate("Create Account")}
          >
            <Text style={[styles.buttonText]}>Create Account</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export const styles = StyleSheet.create({
  top: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgb(18,18,40)",
    alignContent: "center",
  },
  bg: {
    paddingTop: 10,
    paddingLeft: 0,
    paddingBottom: 10,

    alignitems: "center",
    justifyContent: "center",
    position: "relative",
    left: 5,
  },
  Input: {
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
  button: {
    backgroundColor: "white",
    paddingVertical: 10, // Adjust the padding as needed
    paddingHorizontal: 70, // Adjust the padding as needed
    borderRadius: 5,
  },
  buttonText: {
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
  create: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
});
