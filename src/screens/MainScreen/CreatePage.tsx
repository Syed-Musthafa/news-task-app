import { Image, SafeAreaView, StyleSheet, Text, Alert, TouchableOpacity, View, LogBox, ImageBackground } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Colors, Images } from '../../constant'





const CreatePage = ({route, navigation}) => {

  
  const [newsData, setNewsData] = useState({});


  useEffect(() => {
    const { item } = route.params; 

    setNewsData(item); 
  }, [])


  console.log("newsData", newsData);
  

  function renderHeaderBar() {
    return (
        <View style={{ padding: 10, marginTop: 10 }}>
            <View
                style={[{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }]}>
                <TouchableOpacity
                    style={{
                        width: 45,
                        height: 45,
                        backgroundColor: Colors.secondary,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={() => { navigation.goBack(); }}
                >
                    <Image
                        source={Images.back}
                        resizeMode="contain"
                        style={{ width: 25, height: 25, tintColor: Colors.hash_box }}

                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        // width: 45,
                        // height: 45,
                        // backgroundColor:  Colors.secondary,
                        // borderRadius: 10,
                        // justifyContent: 'center',
                        // alignItems: 'center',
                    }}
                >
                       <Image
                        source={Images.profile}
                        resizeMode="contain"
                        style={{ width: 45, height: 45,  }}

                    />
                </TouchableOpacity>
            </View>




        </View>
    );
}

function renderNewsProfile() {
  return (
      <View>
          <View style={{

              width: '100%',
              height: 140,
              borderRadius: 30,
          }}>
              <View style={{ flex: 1, flexDirection: 'row', width: '100%', padding: 10}}>
                  <View >
                      <Text style={{ color: Colors.white, fontSize: 18 }}>{newsData.title}</Text>
                      <Text style={{ color: Colors.text_secondary, fontSize: 13 }}>date : {newsData.publishedAt} </Text>
                  </View>
              </View>

          </View>

      </View>
  );
}


  return (
    <View style={styles.mainContainer}>
    <ImageBackground
        source={Images.profile}
        resizeMode="cover"
        imageStyle={{ borderBottomLeftRadius: 30, borderBottomRightRadius: 30 }}
        style={{ flex: 1.5, width: '100%', height: '100%' }}
        >
        {renderHeaderBar()}
    </ImageBackground>
    <View style={{ flex: 2, backgroundColor: Colors.primary, width: '100%' }}>
        {renderNewsProfile()}
       
        <View style={{marginTop:10}} />
    </View>

</View>
  )
}

export default CreatePage

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: Colors.primary
  },
  postButton: {
    padding: 5,
    width: 70,
    height: 30,
    borderRadius: 10,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  postTextContainer: {
    padding: 20,
    marginTop: 30
  },
  textField : {
    color: Colors.text_secondary,
    fontSize: 20
  },

  headerText: {
    color: "#fff",
    fontSize: 25
  }

})