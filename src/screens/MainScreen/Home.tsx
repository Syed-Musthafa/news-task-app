import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { Colors, Images } from '../../constant'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { fetchNewsData } from '../../store/reducers/news'


const Home = ({ navigation }): JSX.Element => {

  const News = useSelector((state: any) => state.news.news)

  const dispatch = useDispatch<AppDispatch>()

  const [postData, setPostData] = useState([])

  const [isFetching, setIsFetching] = useState(false)


  const [loading, setLoading] = useState(true)



  useEffect(() => {
    if (News && News.articles) {
      setPostData(News.articles);
      setLoading(false);
    }
  }, [News]);



  useEffect(() => {
    dispatch(fetchNewsData())

  }, [])

  const onRefresh = useCallback(() => {
    setIsFetching(true)
    dispatch(fetchNewsData())
    setTimeout(() => {
      setIsFetching(false)
    }, 2000);
  }, [isFetching])


  function renderHeader() {
    return (

      <View style={styles.headerContainer}>
        <View
          style={styles.subContainer}>


          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}

          >
            <Image
              source={Images.profile}
              resizeMode="contain"
              style={{ width: 45, height: 45, borderRadius: 10 }}

            />
          </TouchableOpacity>

        </View>
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: Colors.white, fontSize: 25 }}>Find the updated</Text>
          <Text style={{ color: Colors.white, fontSize: 25, fontWeight: 'bold' }}>Daily News</Text>
        </View>

        {/* search */}

        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: Colors.hash_box,
            width: '100%',
            borderRadius: 12,
            marginHorizontal: 20,

          }}>
            <View style={{ marginLeft: 10 }}>
              <Image
                source={Images.search}
                style={{ height: 20, width: 20, tintColor: Colors.text_secondary }}
              />
            </View>
            <TextInput
              placeholder="Search your news"
              placeholderTextColor={Colors.text_secondary}
              style={{

                fontSize: 12,
                width: 280,
                paddingHorizontal: 12,
              }}
            />
          </View>
        </View>


      </View>
    );
  }



  function renderNewsContent() {

    const renderItem = ({ item, index }) => {


      return (

        <View
          style={{ padding: 17, }}>
          <TouchableOpacity
            onPress={() => { navigation.navigate('CreatePage', { item }) }}
            style={{
              backgroundColor: Colors.border,
              flexDirection: 'row',
              height: 140,
              borderRadius: 10,

            }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', }} >
              {item.urlToImage ? (
                <Image
                  source={{ uri: item.urlToImage }}
                  style={styles.newsImage}
                />
              ) : (
                <Image
                  source={{ uri: 'https://via.placeholder.com/200' }} // Provide a placeholder image URL
                  style={styles.newsImage}
                />
              )}

              {/* <Image
                    source={{uri:  item.urlToImage }}
                      resizeMode="cover"
                      
                  /> */}
            </View>

            <View style={{ width: "70%", }}>
              <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 12, color: Colors.white, marginBottom: 5 }}>{item.source.name}</Text>
                <Text style={{ fontWeight: 'bold', color: Colors.white, fontSize: 15 }}>{item.title}</Text>
              </View>


            </View>

          </TouchableOpacity>

        </View>
      )
    }

    return !loading ? (


      <FlatList
        data={postData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        onRefresh={onRefresh}
        refreshing={isFetching}
      />

    ) : (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ fontSize: 20, color: Colors.white }}>Loading...</Text>
      </View>
    )
  }




  return (
    <SafeAreaView style={styles.mainContainer}>


      {renderHeader()}
      {renderNewsContent()}

    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: Colors.primary
  },
  headerContainer: {
    padding: 20,
    marginTop: 20,
  },
  description: {
    color: Colors.text_secondary,
    fontSize: 15,
  },
  subContainer:
  {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  newsImage: { width: 100, height: 140 }
})