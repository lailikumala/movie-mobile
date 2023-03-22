import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, Image, ScrollView } from 'react-native'
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from 'utils/RootStackParams';
import axios from 'axios';
import { key, URI, URIImage } from 'utils/url';
import { WebView } from 'react-native-webview';
import moment from 'moment';

type Props = NativeStackScreenProps<RootStackParamList, "DetailMovie">;

function DetailMovie({ route }: Props) {
  const { id } = route.params
  const [movieDetail, setMovieDetail] = useState<any>();
  const [trailer, setTrailer] = useState<any>();

  useEffect(() => {
    axios.get(`${URI}/${id}?api_key=${key}&append_to_response=videos`)
      .then((res) => {
        console.log("res", res.data)
        setMovieDetail(res?.data)
        setTrailer(res?.data?.videos?.results.find((e: any) => e.name === "Official Trailer"))
      })
      .catch((error) => console.log(error))
  }, [id])

  console.log("trailer", trailer)
  return (
    <View style={styles.bg}>
      <Image
        source={{ uri: `${URIImage}/${movieDetail?.poster_path}` }}
        style={styles.img} />
      <Text style={styles.title}>{movieDetail?.title}</Text>
      <ScrollView>
        <Text style={styles.date}>Release : {moment(movieDetail?.release_date).format("MMM Do YY")}</Text>
        <View style={styles.wrapGenres}>
          {movieDetail?.genres?.map((e: any) => (
            <Text key={e?.id} style={styles.genres}>{e?.name}</Text>
          ))}
        </View>
        <View>
          <Text style={styles.overview}>Overview</Text>
          <Text style={styles.overviewMovie}>{movieDetail?.overview}</Text>
        </View>
        {trailer ? (
          <View style={styles.webviewWrapper}>
            <View style={styles.webview}>
              <WebView
                javaScriptEnabled={true}
                domStorageEnabled={true}
                source={{ uri: `${movieDetail?.homepage}` }}
              />
            </View>
          </View>
        ) : null}
      </ScrollView>
    </View>
  )
}

export default DetailMovie

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#22211F',
    flex: 1
  },
  img: {
    height: 250,
    width: '100%',
    alignSelf: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 'auto',
  },
  title: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 25,
    margin: 15
  },
  date: {
    color: '#f4f4f4',
    marginHorizontal: 15,
    marginVertical: 10,
    fontSize: 15,
  },
  wrapGenres: {
    display: "flex",
    flexDirection: "row",
    marginVertical: 10,
    flexWrap: "wrap"
  },
  genres: {
    fontWeight: "500",
    borderRadius: 5,
    color: "#fff",
    padding: 5,
    marginVertical: 8,

    marginHorizontal: 15,
    backgroundColor: "grey"
  },
  overview: {
    color: '#fff',
    marginLeft: 15,
    fontSize: 18,
    marginBottom: 8
  },
  overviewMovie: {
    color: '#fff',
    marginHorizontal: 15,
    marginVertical: 10
  },
  webviewWrapper: { flex: 1 },
  webview: {
    width: 'auto',
    height: 250,
    marginVertical: 10,
    marginHorizontal: 15
  }
});