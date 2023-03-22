import React, { useState } from 'react'
import { Text, TouchableOpacity, TextInput, ToastAndroid, View, StyleSheet } from 'react-native'
import { RootStackParamList } from 'utils/RootStackParams';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage"

type Props = NativeStackScreenProps<RootStackParamList>;

function Login({ navigation }: Props) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      if (!email && !password) {
        ToastAndroid.show(`you must fill in the data correctly`, ToastAndroid.SHORT)
        return false
      } else if (!email) {
        ToastAndroid.show(`Email is required`, ToastAndroid.SHORT)
        return false
      } else if (!password) {
        ToastAndroid.show(`Password is required`, ToastAndroid.SHORT)
        return false
      } else {
        await AsyncStorage.setItem('dataUser', JSON.stringify({
          email: email,
          password: password
        }));
        navigation.navigate('Home')
      }
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.title}>LOGIN</Text>
      <View style={styles.input}>
        <TextInput
          placeholder={'Email'}
          onChangeText={(e) => setEmail(e)}
        />
      </View>
      <View style={styles.input}>
        <TextInput
          placeholder={'Password'}
          secureTextEntry={true}
          onChangeText={(e) => setPassword(e)}
        />
      </View>

      <TouchableOpacity
        style={styles.buttomWrapper}
        onPress={submit}
      >
        <Text style={styles.button}>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Login

const styles = StyleSheet.create({

  inputWrapper: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF7314"
  },
  input: {
    margin: 10,
    borderBottomWidth: 2,
    borderColor: '#FF7314'
  },
  buttomWrapper: {
    fontSize: 16,
    width: 'auto',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 12,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#FF7314'
  },
  button: {
    color: '#F4F4F4',
    fontWeight: 'bold',
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    textAlign: 'center',
    padding: 13
  }
})