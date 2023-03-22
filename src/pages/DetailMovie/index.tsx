import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native'
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from 'utils/RootStackParams';
import axios from 'axios';
import { key, URI, URIImage } from 'utils/url';
import { WebView } from 'react-native-webview';

type Props = NativeStackScreenProps<RootStackParamList, "DetailMovie">;

function DetailMovie({ route }: Props) {
  const { id } = route.params
  const [movieDetail, setMovieDetail] = useState<any>();

  useEffect(() => {
    axios.get(`${URI}/${id}?api_key=${key}`)
      .then((res) => {
        console.log("res", res.data)
        setMovieDetail(res?.data)
      })
      .catch((error) => console.log(error))
  }, [id])

  return (
    <View style={styles.bg}>
      <View>
        <Image
          source={{ uri: `${URIImage}/${movieDetail?.poster_path}` }}
          style={styles.img} />
      </View>
      <Text style={styles.title}>{movieDetail?.title}</Text>
      <ScrollView>
        <Text style={styles.date}>Release date: {movieDetail?.release_date}</Text>
        <View>
          <Text style={styles.overview}>Overview</Text>
          <Text style={styles.overviewMovie}>{movieDetail?.overview}</Text>
        </View>
        <View style={styles.webviewWrapper}>
          <View style={styles.webview}>
            <WebView
              javaScriptEnabled={true}
              domStorageEnabled={true}
              source={{ uri: `${movieDetail?.homepage}` }}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default DetailMovie

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#22211F',
    width: '100%',
    height: '100%'
  },
  img: {
    alignSelf: 'center',
    height: 230,
    width: '100%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 'auto',
  },
  title: {
    color: '#FF7314',
    fontWeight: 'bold',
    fontSize: 30,
    marginLeft: 30
  },
  date: {
    color: '#f4f4f4',
    marginLeft: 15
  },
  overview: {
    color: '#f4f4f4',
    marginLeft: 15,
    fontSize: 18,
    marginBottom: 8
  },
  overviewMovie: {
    color: '#f4f4f4',
    marginLeft: 15,
    marginRight: 10
  },
  webviewWrapper: { flex: 1 },
  webview: {
    width: '97%',
    height: 200,
    marginLeft: 5,
    marginRight: 5
  }
});