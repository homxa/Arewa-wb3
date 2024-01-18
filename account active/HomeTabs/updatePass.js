import { StyleSheet, Text, TextInput, View } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
export const UpdatePassword = () => {
  const schema = yup.object().shape({
    prev: yup
      .string("enter password")
      .min(6)
      .max(10)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one lowercase letter, one uppercase letter, and one number"
      )
      .required("You Most Enter Your Old password"),
    password: yup
      .string("enter password")
      .min(4)
      .max(10)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one lowercase letter, one uppercase letter, and one number"
      )
      .required("You mostes password"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "password must matched")
      .required("confirm password is required"),
  });
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const input = [
    { type: "prev", name: "Old Password" },
    { type: "password", name: "Create New Password" },
    {type:'confirmPassword', name: 'Confirm New Password'},
  ];

  return (
    <>
      <View style={styles.cover}>
        <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>
          {" "}
          Change Password{" "}
        </Text>

        <Controller
          control={control}
          render={(field) => (
            <View>
              <Text>Enter your Old Password</Text>
              <TextInput
                value={field.value}
                onBlur={field.onBlur}
                onChangeText={field.onChangeText}
              />
            </View>
          )}
          name=""
        />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  cover: {
    backgroundColor: "rgb(10,17,29)",
    flex: 1,
    marginRight: -5,
  },
});
