import { FlatList, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import { Colors, Images } from '../../constant'

import { fetchPostData } from '../../store/reducers/post'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../store/store'
import { fetchNewsData } from '../../store/reducers/news'



const Home = ({ navigation }): JSX.Element  => {

  const user = useSelector((state: any) => state.post.users)
  const News = useSelector((state: any) => state.news.news)

  const dispatch = useDispatch<AppDispatch>()

  const [postData, setPostData] = useState([])

  const [isFetching, setIsFetching] = useState(false)

  const [textShown, setTextShown] = useState(-1)

 

  const toggleNumberOfLines = useCallback((index) => {
    setTextShown((prev) => prev === index ? -1 : index);
  },[textShown])



  useEffect(() => {
    setPostData(News.articles)
  },[News])



  useEffect(() => {
    // dispatch(fetchPostData())
    dispatch(fetchNewsData())
  }, [])

  console.log("News", News);
  


 const onRefresh = useCallback(() => {
      setIsFetching(true)
      dispatch(fetchPostData())
      setTimeout(() => {
        setIsFetching(false)
      }, 2000);
 },[isFetching])

//  console.log("postData", postData);
 
 function renderHeader() {
  return (

      <View style={ styles.headerContainer}>
          <View
              style={ styles.AnimatedContainer }>
             

              <TouchableOpacity
                  style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                  }}

              >
                  <Image
                      source={Images.profile}
                      resizeMode="contain"
                      style={{ width: 45, height: 45, borderRadius:10}}

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
                          source={Images.profile}
                          style={{ height: 20, width: 20, tintColor: Colors.text_secondary}}
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



  function renderNewsContent () {

    const renderItem = ({ item, index }) => {
    
    return (

      <View
          style={{ padding: 17,   }}>
          <TouchableOpacity
              onPress={() => { navigation.navigate('CreatePage', { item })}}
              style={{
                  backgroundColor: Colors.border,
                  flexDirection:'row',
                  height: 140,
                  borderRadius: 10,
                
              }}>
              <View style={{ justifyContent: 'center', alignItems: 'center',}} >

                  <Image
                    source={{uri:  item.url,  width: 32, height: 32, }}
                      resizeMode="cover"
                      style={{ width: 100, height: 140 }}
                  />
              </View>

              <View style={{  width: "70%", }}>
                  <View style={{ padding: 10 }}>
                      <Text style={{ fontSize: 12, color: Colors.white, marginBottom: 5 }}>{item.source.name}</Text>
                      <Text style={{ fontWeight: 'bold', color: Colors.white, fontSize: 15 }}>{item.title}</Text>
                  </View>


              </View>

          </TouchableOpacity>

      </View>
    )}

    return (


      <FlatList 
      data={postData}
      keyExtractor={(item) => `${item.id}`}
      renderItem={renderItem}
      onRefresh={onRefresh}
      refreshing={isFetching}
    />
    
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
  mainContainer : {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: Colors.primary
},
headerContainer : {
  padding: 20,
  marginTop: 20,
},
description : {
  color : Colors.text_secondary, 
  fontSize: 15,
},
AnimatedContainer : 
{ flexDirection: 'row', 
justifyContent: 'flex-end' 
},
})