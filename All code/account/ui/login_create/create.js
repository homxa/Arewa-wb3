
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { Render } from "./logIn_UI";
import { schema } from "./useSchema";
import {
  View,
 
  StyleSheet,
  FlatList,
  Button,
} from "react-native";


export const Create = () => {

  const data = (dd) => {
    console.log(dd);
  };

  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

 

  return (
    <>
      <View style={styles.top}>
        <View style={[styles.bg]}>
          <FlatList data={deatail} renderItem={({ item }) => <Render item ={item} control={control} errors={errors}/>} />
          {/* {deatail.map((item) => render(item))} */}

          {/* // 2 */}

          {/* ///3 */}
        </View>
        <Button title="login" onPress={handleSubmit(data)} />
      </View>
    </>
  );
};

export const styles = StyleSheet.create({
  top: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    alignItems: "center",
  },
  bg: {
    flexDirection: "row",
    paddingRight: 5,
    paddingTop: 10,
    paddingLeft: 20,
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
});
