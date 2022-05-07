import { useState, useEffect, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import 
{  
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  FlatList
  } from 'react-native';
import { Text } from '@ui-kitten/components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MaterialIcons } from '@expo/vector-icons'; 
import DictionaryWord from './dictionaryWord';
import * as Device from 'expo-device';
import { MyContext } from '../context'

export default Dictionary
let DictionaryObject = [];
let DictionaryWordsDirty = [];
let MyDict = [];
let os = Device.osName;
const Stack = createNativeStackNavigator();
let headerSettings = [];

function Dictionary() {

if (os=="Android"){
  return (
    <Stack.Navigator initialRouteName="Dictionary" screenOptions={{headerShown: false}}>
      <Stack.Screen name="DictionaryList" component={DictionaryList}/> 
      <Stack.Screen name="DictionaryWord" component={DictionaryWord}/>
    </Stack.Navigator>
  );
}
else{ 
  return (
    <Stack.Navigator initialRouteName="Dictionary" screenOptions>
      <Stack.Screen name="DictionaryList" component={DictionaryList} options={{ title:""}} /> 
      <Stack.Screen name="DictionaryWord" component={DictionaryWord} 
      options={{title:"",headerBackTitle:"",
      headerBackImage: ()=>(<MaterialIcons name="chevron-left" size={24} color="black" />),
      }}  />
    </Stack.Navigator>
  );
}
}


const storeData = async (key, value) => {
    try {
      const jsonValueIn = JSON.stringify(value)
      await AsyncStorage.setItem(key, jsonValueIn)
      console.log("In: "+jsonValueIn);
    } catch (e) {
      // saving error
    }
  }

  const getData = async (key) => {
    try {
      const jsonValueOut = await AsyncStorage.getItem(key);
      jsonValueOut != null ? JSON.parse(jsonValueOut) : null;
      const returned = JSON.parse(jsonValueOut);
      return returned
    } catch(e) {
      // error reading value
    }
  }


function handleDictionary(favorites) {
  DictionaryObject = [];
  DictionaryWordsDirty = [];
  MyDict = [];
  
  favorites.map((phrase) => {
    if (phrase.source === "ENG"){
      DictionaryObject.push(phrase.phrase);
    }
    else if (phrase.target === "ENG") {
    DictionaryObject.push(phrase.translation);
  }
  }) 


  DictionaryObject.map((sentence) => {
    const words = sentence.split(" ");
    for (let i = 0; i < words.length; i++) {
      if (words[i].replace(/[^a-zA-Z ]/g, "") == "I"){
      DictionaryWordsDirty.push(words[i].replace(/[^a-zA-Z ]/g, "")) ;
      }
      else { DictionaryWordsDirty.push(words[i].toLowerCase().replace(/[^a-zA-Z ]/g, "")) ;}
     
    }
  })

  let DictionaryWordsUnsorted = DictionaryWordsDirty.filter((c, index) => {
    return DictionaryWordsDirty.indexOf(c) === index;
  });

  let DictionaryWordsArray = DictionaryWordsUnsorted.sort((a, b) => a.localeCompare(b));
 
  
  for (let i = 0; i < DictionaryWordsArray.length; i++)
  {
    let word = {
      title: DictionaryWordsArray[i],
      key: i+1,
    };
  MyDict.push(word);
  };
  MyDict = MyDict.filter((value, index, self) =>
  index === self.findIndex((t) => (
    t.title === value.title && t.key === value.key
  ))
)
  return MyDict;
  
}


function DictionaryList({navigation}){
  const {favorites, setFavorites} = useContext(MyContext);
  const [dictionary, setDictionary] = useState ([]);
  const [modalVisible, setModalVisible] = useState (false);
  const DATA = handleDictionary(favorites);
            const [searchText, onChangeSearch] = useState('');
            const [filteredData, setFilteredData] = useState([]);
          
            useEffect(() => {
              const filtered = DATA.filter(item =>
                item.title.toLowerCase().includes(searchText.toLowerCase()),
              );
              if (searchText === '') {
                return setFilteredData(DATA);
              }
          
              setFilteredData(filtered);
            }, [searchText, favorites]);
          
            const Item = ({title, word}) => (
              <TouchableOpacity onPress={() => 
                navigation.navigate('DictionaryWord',{
                  title: title,
                  word: word
                })
                }>
              <View style={styles.item}>
                <Text style={styles.title}>{title}</Text>
              </View>
              </TouchableOpacity>
            );
          
            const renderItem = ({item}) => <Item title={item.title} />;
          
            return (
              <SafeAreaView style={styles.container}>
                <TextInput
                  style={{
                    height: 50,
                    borderColor: '#919191',
                    borderWidth: 1,
                    margin: 10,
                    paddingLeft: 15,
                    borderRadius: 10,
                  }}
                  onChangeText={newText => onChangeSearch(newText)}
                  placeholder="Hľadať"
                />
                <FlatList
                  data={filteredData}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.key}
                />
  
              </SafeAreaView>
            );
          };       
  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#ededed',
    padding: 20,
    marginVertical: 2,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
  },
});