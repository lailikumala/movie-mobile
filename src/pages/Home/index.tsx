import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { RootStackParamList } from 'utils/RootStackParams';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage"

type Props = NativeStackScreenProps<RootStackParamList>;


function Home({ navigation }: Props) {
  const [data, setData] = useState<any>();

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('dataUser')
      return jsonValue != null ? setData(JSON.parse(jsonValue)) : null;
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <View>
      <Text>{data?.email}</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Home