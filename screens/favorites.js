import { useState, useEffect, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, SafeAreaView, FlatList} from 'react-native';
import { Text, Input } from '@ui-kitten/components';
import { MyContext } from '../context'


export default function Favorites({ navigation}){

  const {favorites, setFavorites} = useContext(MyContext);
  let {input, setInput} = useContext(MyContext);
  let {output, setOutput} = useContext(MyContext);
  const {def, setDef} = useContext(MyContext);
  const {from, setFrom} = useContext(MyContext);
  const {to, setTo} = useContext(MyContext);
  const {languages} = useContext(MyContext);

  let DATA = favorites;
  const [searchText, onChangeSearch] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  
  const deleteFavorite = (phrase) => {
    const old = () => {
      return favorites.filter(item => item.phrase != phrase)
    };
    setFavorites(old);
  }
  
  function filtering(){
    DATA = favorites;
    const filtered = DATA.filter(item =>
      item.phrase.toLowerCase().includes(searchText.toLowerCase()) ||
      item.translation.toLowerCase().includes(searchText.toLowerCase()),
    );
    if (searchText === '') {
      return setFilteredData(DATA);
    }

    setFilteredData(filtered);
  }
  
  useEffect(() => {
    filtering();
  }, [searchText]);

  useEffect(() => {
  filtering();
  }, [favorites]);

  const Item = ({phrase, tran, sc, tr}) => (
    <TouchableOpacity
     onLongPress={
      () => {
        if (languages.svk.short.toLowerCase() == sc.toLowerCase() )
        {setFrom(languages.svk)
        setTo(languages.eng)}
        else{
          setFrom(languages.eng)
          setTo(languages.svk)
        }
        setInput(phrase)
        navigation.navigate('Home')
      }
      }
    >
    <View style={styles.item}>
      <Text style={styles.favoriteHeader}>{sc}{" -> "}{tr}</Text>
      <Text style={styles.phrase}>{phrase}</Text>
      <Text style={styles.translation}>{tran}</Text>
    </View>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => <Item phrase={item.phrase} tran={item.translation} sc={item.source} tr={item.target}/>;

  return (
    <SafeAreaView
  
    style={styles.container}>
   
      <Input
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
      <Text style={styles.header}>S prekladom interagujte podržaním.</Text>
      <FlatList
        data={filteredData}
        renderItem={renderItem}
        keyExtractor={(item) => item.phrase}
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
phrase: {
  fontSize: 15,
  paddingTop: 5
},
translation: {
  fontSize: 20,
  fontWeight: 'bold',
  paddingTop: 5
},
favoriteHeader: {
  color: 'skyblue',
  fontSize: 12,  
},
header: {
  color: 'skyblue',
  fontSize: 12,  
  alignSelf:'center',
  paddingBottom: 5
}
});