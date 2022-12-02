import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesome5 } from '@expo/vector-icons';
import {
  StyleSheet,
  Image,
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import MainButton from '../../components/MainButton';
import MainInput from '../../components/MainInput';
export default function LoginScreen({ navigation }) {
  const [taikhoan, setemail] = useState('');
  const [matkhau, setpassword] = useState('');
  const goToHome = () => {
    if (taikhoan.trim() == '' || !taikhoan) {
      alert('Không được để trống tài khoản !');
    } else if (matkhau.trim() == '' || !matkhau) {
      alert('Không được để trống mật khẩu !');
    } else {
      login();
    }
  };
  const [userData, setuserData] = useState([])
  const getAccount = async () => {
    const res = await axios.get('https://638a00e04eccb986e8a0b669.mockapi.io/users');
    const result = await res.data;
    setuserData(result)
  }
  useEffect(() => {
    getAccount();
  }, [])
  const login = async () => {
    console.log(userData);
    axios.get('https://638a00e04eccb986e8a0b669.mockapi.io/users').then(response => {
      // let userData = response.data.Object;
      if (userData) {
        let arr = [...userData];
        console.log(arr);
        arr = arr.filter(
          (value) =>
            value.account.toLocaleLowerCase() == taikhoan.toLocaleLowerCase() &&
            value.password == matkhau
        );

        if (arr.length > 0) {
          //alert('Đăng nhập thành công', arr[0].taikhoan)
          arr[0].taikhoan;
          //console.log(arr[0]);
          let curUser = arr[0];

          AsyncStorage.setItem('curUser', JSON.stringify(curUser));
          navigation.replace('HomeTab');
        } else alert('Tài khoản hoặc mật khẩu không chính xác!');
      } else {
        alert('Tài khoản hoặc mật khẩu không chính xác!');
      }
    });
  };

  const goToSignUp = async () => {
    navigation.navigate('SignUpScreen');
  };
  const checkLogin = async () => {
    let userData = await AsyncStorage.getItem('curUser');
    if (userData) console.log(1)
    // if (userData) navigation.replace('HomeTab');
  };
  useEffect(() => {
    checkLogin();
  }, []);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 12,
            backgroundColor: '#f4f4f4',

          }}
        >

          <Image
            style={{
              alignSelf: 'center',
              height: 120,
              resizeMode: 'contain',
              width: 120,

            }}
            source={require('../../../assets/logo.jpg')}
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
            Welcome back !
          </Text>
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
              //title={'Email'}
              placeholder={'User Name'}
              value={taikhoan}
              onChangeText={setemail}
            />
          </View>
          <View>
            <FontAwesome5 name="lock" size={24} color="black"
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
              placeholder={'Password'}
              //title={'Mật khẩu'}
              value={matkhau}
              secureTextEntry={true}
              onChangeText={setpassword}
            />

          </View>
          <MainButton
            style={{ marginTop: 20 }}
            title={'Đăng Nhập'}
            onPress={goToHome}
          />
          <Text style={{ marginTop: 10, marginLeft: 18, fontStyle: 'italic', color: '#444' }}>Don't have on account?</Text>
          <MainButton
            style={{ marginTop: 6 }}
            title={'Đăng Ký'}
            isSubButton={true}
            onPress={goToSignUp}
          />
          <Text style={{ textAlign: 'center', marginTop: 20 }}>Forgot Password?</Text>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});