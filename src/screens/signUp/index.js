import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { TouchableOpacity, Text, View, Image } from "react-native";
import MainButton from "../../components/MainButton";
import MainInput from "../../components/MainInput";
import { FontAwesome5 } from '@expo/vector-icons';
import axios from "axios";
export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const onGoBack = () => {
    navigation.goBack();
  };
  const onSignUp = () => {
    if (name.trim() == "" || !name) {
      alert("Không được để trống họ và tên !");
    } else if (email.trim() == "" || !email) {
      alert("Không được để trống email !");
    } else if (password.trim() == "" || !password) {
      alert("Không được để trống mật khẩu !");
    } else {
      axios.post("https://638a00e04eccb986e8a0b669.mockapi.io/users", { account: email, password: password, name: name })
      onGoBack();
      // createAccount();
    }
  };


  const createAccount = async () => {
    let userData = await AsyncStorage.getItem("userData");
    if (userData) {
      userData = JSON.parse(userData);
      let arr = [...userData];
      arr = arr.filter(
        (value) => value.email.toLocaleLowerCase() == email.toLocaleLowerCase()
      );
      if (arr.length > 0) {
        alert("Email already registered!");
        return;
      } else {
        userData.push({
          name: name.trim(),
          email: email.trim(),
          password: password.trim(),
        });
      }
    } else {
      userData = [];
      userData.push({
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      });
    }
    AsyncStorage.setItem("userData", JSON.stringify(userData));
    alert("Đăng ký thành công!");
    navigation.goBack();
  };
  return (
    <View style={{ flex: 1, backgroundColor: "#f4f4f4", paddingHorizontal: 12 }}>
      <View style={{ flexDirection: "row", marginTop: 50 }}>
        <TouchableOpacity
          onPress={onGoBack}
          style={{
            backgroundColor: "#f4f4f4",
            width: 50,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 100,
          }}
        >
          <Image
            style={{ height: 20, width: 20, resizeMode: "contain" }}
            source={require("../../../assets/gea.webp")}
          />
        </TouchableOpacity>
        <Text
          style={{
            color: "#000",
            fontSize: 24,
            paddingTop: 5,
            fontWeight: "bold",
            letterSpacing: 1,
          }}
        >
          Đăng Ký
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Image
          style={{
            alignSelf: "center",
            height: 100,
            resizeMode: "contain",
            width: 100,
          }}
          source={require("../../../assets/logo.jpg")}
        />

        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: '#555',
            fontSize: 20,
            marginBottom: 50,
            fontStyle: 'italic',
            fontWeight: '400'
          }}
        >
          Classic Car Auto
        </Text>
        <View>

          <FontAwesome5 name="heart" size={24} color="black"
            style={{
              position: 'absolute',
              top: 21,
              //left: 10,
              zIndex: 5,
              backgroundColor: '#555',
              color: '#fff',
              fontSize: 20,
              paddingHorizontal: 10,
              paddingTop: 9,
              paddingBottom: 9,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20

            }} />
          <MainInput
            placeholder={"First and last name"}
            value={name}
            onChangeText={setName}
          />
        </View>
        <View>
          <FontAwesome5 name="user" size={24} color="black"
            style={{
              position: 'absolute',
              top: 21,
              //left: 10,
              zIndex: 5,
              backgroundColor: '#555',
              color: '#fff',
              fontSize: 20,
              paddingHorizontal: 10,
              paddingTop: 9,
              paddingBottom: 9,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20

            }} />
          <MainInput
            placeholder={"User Name"}
            value={email}
            onChangeText={setemail}
          />
        </View>
        <View>
          <FontAwesome5 name="key" size={24} color="black"
            style={{
              position: 'absolute',
              top: 21,
              //left: 10,
              zIndex: 5,
              backgroundColor: '#555',
              color: '#fff',
              fontSize: 20,
              paddingHorizontal: 10,
              paddingTop: 9,
              paddingBottom: 9,
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20

            }} />
          <MainInput
            placeholder={"Password"}
            secureTextEntry={true}
            value={password}
            onChangeText={setpassword}
          />
        </View>

        <MainButton
          onPress={onSignUp}
          style={{ marginTop: 12 }}
          title={"Đăng Ký"}
        />
      </View>
    </View>
  );
}