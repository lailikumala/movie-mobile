import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View, Image, StyleSheet, FlatList } from 'react-native'
import { RootStackParamList } from 'utils/RootStackParams';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage"
import axios from 'axios';
import { key, URI, URIImage } from 'utils/url';

type Props = NativeStackScreenProps<RootStackParamList>;

export interface dataMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: number;
}

const renderItem = ({ item }: { item: dataMovie }) => {
  return (
    <View style={styles.cards}>
      <TouchableOpacity
      >
        <Image
          source={{ uri: `${URIImage}/${item.poster_path}` }}
          style={styles.imgCard} />
        {item?.vote_average ? (<Text style={styles.rate}>{item.vote_average}</Text>) : null}
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  )
}

function Home({ navigation }: Props) {
  const [data, setData] = useState<any>();
  const [movie, setMovie] = useState<any>();
  const numColumns = 2

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

    axios.get(`${URI}/popular?api_key=${key}&language=en-US&page=1`)
      .then((res) => {
        console.log(res?.data?.results, "hasil")
        setMovie(res?.data?.results)
      })
      .catch((error) => console.log(error))
  }, [])

  return (
    <View style={styles.container}>
      <Image style={styles.imgUser} source={{ uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }} />
      <Text style={styles.user}>{data?.email}</Text>
      <Text style={styles.titleMovie}>Movie Popular</Text>
      <FlatList
        data={movie}
        renderItem={renderItem}
        numColumns={numColumns}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#22211F",
  },
  imgUser: {
    width: 30,
    height: 30,
    borderRadius: 20,
    marginTop: 30,
    left: 20
  },
  user: {
    color: "#ffff",
    fontSize: 14,
    top: 10,
    left: 20,
    marginBottom: 20
  },
  titleMovie: {
    color: "#ffff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10
  },
  cards: {
    marginTop: 30,
    width: '40%',
    backgroundColor: '#393534',
    marginLeft: 24
  },
  imgCard: {
    height: 150,
    width: '100%',
    marginTop: 0
  },
  rate: {
    position: "absolute",
    padding: 6,
    fontSize: 11,
    color: "#fff",
    fontWeight: "bold",
    right: 6,
    top: 4,
    borderRadius: 50,
    borderColor: "#FF7314",
    borderWidth: 2,
    textAlign: "center"
  },
  title: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    marginTop: 5
  }

});