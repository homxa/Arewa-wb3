import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

export const Settings = () => {
  return (
    <ScrollView style={{flex: 1}} showsHorizontalScrollIndicator={true}>
      <View style={[styles.cover,{paddingTop: 15}]}>
        {/* heading and profile of user */}
     
        <View
          style={{
            paddingLeft: 5,
            paddingRight: 5,
            maxWidth: 400,
          }}
        >
          <Text style={styles.secText}>Profile Setteings</Text>
        <View style={styles.sections}> 
          {/* 1st */}
          <View
            style={styles.first2}
          >
            <View style={styles.iconsbg}>
              <Feather
                name="moon"
                size={28}
                color="white"
                style={{ alignSelf: "center" }}
              />
            </View>
            <Switch
              value={true}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
            />
          </View>


          {/* 2 */}

        
          <View style={styles.arrowIcon}>

<View style={[styles.normal,{flexDirection: "row",}]}>

  <View style={[styles.iconsbg, {backgroundColor:'rgb(178,126,24)'}]}>
  <MaterialIcons name="notifications" size={20} color='white' />

  </View>
  <Text style={styles.iconText}>Enable Notification</Text>
</View>
<Switch
              value={true}
              trackColor={{ false: "#767577", true: "#81b0ff" }}
            />
</View>




          {/* 3sond */}
          <View style={styles.arrowIcon}>
            <View style={styles.normal}>
              <View
                style={[
                  styles.iconsbg,
                  {
                    backgroundColor: "rgb(255, 71, 76)",
                    width: 45,
                    height: 45,
                    flexDirection: "row",
                  },
                ]}
              >
                <FontAwesome5 name="edit" size={20} color="white" />
              </View>
              <Text style={styles.iconText}>Edit Profile</Text>
            </View>
            <MaterialIcons
              name="navigate-next"
              size={26}
              color="white"
              style={styles.arroSelf}
            />
          </View>

          {/* //4 */}
          <View style={styles.arrowIcon}>

          <View style={[styles.normal,{flexDirection: "row"}]}>

            <View style={[styles.iconsbg, { backgroundColor: "gray" }]}>
              <FontAwesome name="book" size={20} color="white" />
            </View>
            <Text style={styles.iconText}>Select Course</Text>
          </View>
          <MaterialIcons
              name="navigate-next"
              size={26}
              color="white"
              style={styles.arroSelf}
            />
        </View>
       </View>



{/* Account Setteins */}

       <Text style={{color: 'white', fontWeight: "bold",fontSize: 16,marginBottom: 5}}>Acount Settings</Text>
        <View style={styles.sections}> 
     

  {/* 3sond */}
  <View style={styles.arrowIcon}>
            <View style={styles.normal}>
              <View
                style={[
                  styles.iconsbg,
                  {
                    backgroundColor: "red",
                    width: 45,
                    height: 45,
                    flexDirection: "row",
                  },
                ]}
              >
           <FontAwesome5 name="trash-restore-alt" size={20} color="white" />
              </View>
              <Text style={styles.iconText}>Delete Account</Text>
            </View>
            <MaterialIcons
              name="navigate-next"
              size={26}
              color="white"
              style={styles.arroSelf}
            />
          </View>


          <View style={styles.arrowIcon}>
            <View style={styles.normal}>
              <View
                style={[
                  styles.iconsbg,
                  {
                    backgroundColor: "red",
                    width: 45,
                    height: 45,
                    flexDirection: "row",
                  },
                ]}
              >
             <MaterialIcons name="vpn-key" size={20} color="black" />
              </View>
              <Text style={styles.iconText}>Update Password</Text>
            </View>
            <MaterialIcons
              name="navigate-next"
              size={26}
              color="white"
              style={styles.arroSelf}
            />
          </View>

          {/* //4 */}
          <View style={styles.arrowIcon}>

          <View style={[styles.normal,{flexDirection: "row"}]}>

            <View style={[styles.iconsbg, { backgroundColor: "rgb(255, 71, 76)" }]}>
            <MaterialCommunityIcons name="email-sync" size={20} color="white" />
            </View>
            <Text style={styles.iconText}>Update Email</Text>
          </View>
          <MaterialIcons
              name="navigate-next"
              size={26}
              color="white"
              style={styles.arroSelf}
            />
        </View>


        <View style={styles.arrowIcon}>

<View style={[styles.normal,{flexDirection: "row"}]}>

  <View style={[styles.iconsbg, { backgroundColor: "rgba(0,0,0,0.67)" }]}>
  <Entypo name="log-out" size={20} color="white" />
  </View>
  <Text style={styles.iconText}>Sign Out</Text>
</View>
<MaterialIcons
    name="navigate-next"
    size={26}
    color="white"
    style={styles.arroSelf}
  />
</View>


       </View>


  {/* Help and support */}

  <Text style={styles.secText}>Help and Support</Text>
        <View style={styles.sections}> 
     

  {/* 3sond */}
  <View style={styles.arrowIcon}>
            <View style={styles.normal}>
              <View
                style={[
                  styles.iconsbg,
                  {
                    backgroundColor: "white",
                    width: 45,
                    height: 45,
                    flexDirection: "row",
                  },
                ]}
              >
          <FontAwesome5 name="question" size={20} color="black" />
              </View>
              <Text style={styles.iconText}>FAQs</Text>
            </View>
            <MaterialIcons
              name="navigate-next"
              size={26}
              color="white"
              style={styles.arroSelf}
            />
          </View>


          <View style={styles.arrowIcon}>
            <View style={styles.normal}>
              <View
                style={[
                  styles.iconsbg,
                  {
                    backgroundColor: "white",
                    width: 45,
                    height: 45,
                    flexDirection: "row",
                  },
                ]}
              >
            <MaterialIcons name="support-agent" size={20} color="black" />
              </View>
              <Text style={styles.iconText}>Contact and Support</Text>
            </View>
            <MaterialIcons
              name="navigate-next"
              size={26}
              color="white"
              style={styles.arroSelf}
            />
          </View>

          {/* //4 */}
       


       </View>



{/* lagel and complence */}

<Text style={styles.secText}>Legal and Compliance</Text>
        <View style={styles.sections}> 
     

  {/* 3sond */}
  <View style={styles.arrowIcon}>
            <View style={styles.normal}>
              <View
                style={[
                  styles.iconsbg,
                  {
                    width: 45,
                    height: 45,
                    flexDirection: "row",
                  },
                ]}
              >
                  <FontAwesome5 name="users-slash" size={20} color="white" />

              </View>
              <Text style={styles.iconText}>Terms of Service</Text>
            </View>
            <MaterialIcons
              name="navigate-next"
              size={26}
              color="white"
              style={styles.arroSelf}
            />
          </View>


          <View style={styles.arrowIcon}>
            <View style={styles.normal}>
              <View
                style={[
                  styles.iconsbg,
                  {
                    width: 45,
                    height: 45,
                    flexDirection: "row",
                  },
                ]}
              >
         <MaterialIcons name="privacy-tip" size={20} color="white" />

              </View>
              <Text style={styles.iconText}>Privacy Policy</Text>
            </View>
            <MaterialIcons
              name="navigate-next"
              size={26}
              color="white"
              style={styles.arroSelf}
            />
          </View>

          {/* //4 */}
       


       </View>











       
       </View>
         </View>
                
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  cover: {
    backgroundColor: "rgb(10,17,29)",
    flex: 1,
    marginRight: -5
  },

  editText: {
    textAlign: "center",
    fontSize: 12,
  },
  first2:{
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  backgroundColor: "hsl(230, 17%, 14%)",
  padding: 6,
  borderRadius: 20

  },
  firstTop: {
    maxWidth: 500,
    height: 150,
    paddingLeft: 30,
    paddingTop: 15,
    marginBottom: 30,
    borderBottomRightRadius: 10,
  },
  iconsbg: {
    width: 55,
    height: 55,
    backgroundColor: "hsl(228, 28%, 20%))",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginTop: 0,
  },
  normal: { flexDirection: "row", marginBottom: 10 },
  iconText: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
    alignSelf: "center",
  },
  arrowIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
            backgroundColor: "hsl(230, 17%, 14%)",
            marginBottom: 15,
            padding: 6,
            borderRadius: 20

  },
  arroSelf: {
    alignSelf: "center",
    paddingRight: 10,
  },
  sections:{backgroundColor:'hsl(228, 28%, 20%)',padding: 3, marginBottom: 10},
  secText:{color: 'white', fontWeight: "bold",fontSize: 17,marginBottom: 5}
});
