import { useState, useEffect, createRef, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, TouchableOpacity, TextInput, TouchableWithoutFeedback, useWindowDimensions, ScrollView, Keyboard,Button, TouchableHighlight, SafeAreaView} from 'react-native';
import { Text, Card } from '@ui-kitten/components';
import { globalStyles } from '../styles/global';
import { MaterialIcons } from '@expo/vector-icons'; 
import * as Clipboard from 'expo-clipboard';
import * as Speech from 'expo-speech';
import { showMessage} from "react-native-flash-message";
const axios = require("axios");
import { MyContext } from '../context'



function Home({ navigation }) {

    const {from, setFrom} = useContext(MyContext);
    const {to, setTo} = useContext(MyContext);
    let {input, setInput} = useContext(MyContext);
    let {output, setOutput} = useContext(MyContext);
    const [translationReady, setReady] = useState(false);
    const {favorites, setFavorites} = useContext(MyContext);
    const {def, setDef} = useContext(MyContext);
    const {net} = useContext(MyContext);
    let inputref = createRef();
    let translationButtons = [];
    const { height, width } = useWindowDimensions();

  const speechHandler = () => {
    if (to.code == "en_GB"){
      Speech.speak(output, {language: "en-GB"})
    }
    if (to.code == "sk_SK"){
      Speech.speak(output, {language: "sk-SK"})
    }
  }
  const fetch = () =>  {
    if (net.isConnected == false) {
      setOutput("Nedostupné")
      showMessage({
        message: "Pre správne fungovanie aplikácie, potrebujete internetové pripojenie.",
        type: "warning",
      });
      setReady(false)
    }
    else{
    axios.request(options).then(function (response) {
    if(response.data.result == "I'm waiting for entry"){
      setOutput("test");
      setReady(false)
    }
    else{
      setOutput(response.data.result);
      setReady(true)
    }
    }).catch(function (error) {
      setOutput("");
      setReady(false)
    });
    }
  } 

  function copyToClipboard(vari) {
    Clipboard.setString(vari);
    showMessage({
     message: "Text skopírovaný do schránky",
     type: "info",
   });
  }

  const swap = () => {
    const aTemp = from
    const bTemp = to
    setFrom(bTemp) // swap a
    setTo(aTemp) // swap b
    const inTemp = input 
    const outTemp = output
    if(input.trim() && output.trim()){
    setInput(outTemp)
    
    }
    else{
      clear()
    }
 }

  function clear() {
    inputref.current.clear()
    setOutput("");
    setReady(false)
  }
  const options = {
    method: 'POST',
    url: 'https://lingvanex-translate.p.rapidapi.com/translate',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Host': 'lingvanex-translate.p.rapidapi.com',
      'X-RapidAPI-Key': 'xxxx-xxxx-xxxx-xxxx'
    },
    data: '{"from":"'+ from.code +'","to":"'+ to.code +'","data":"'+ input.trim() +'","platform":"api"}'
  };

const clearAll = async () => {
  try {
    await AsyncStorage.clear()
  } catch(e) {
  }

  console.log('Done.')
}
function inputHandler(newText) {
  setInput(newText);
  setOutput("");
  setReady(false)
}


useEffect(() => {
  fetch()
},[input])


function ButtonHandler() {
translationButtons=[];
translationButtons.push(
  <View style={styles.outputLower}><TouchableOpacity style={styles.copy}onPress={() => copyToClipboard(output)}>
  <MaterialIcons name="content-copy" size={24} color="black" opacity=""/>
  </TouchableOpacity>
  <TouchableOpacity style={styles.copy}
  onPress={() => speechHandler() }
  >
  <MaterialIcons name="play-circle-filled" size={24} color="black" opacity="" style={styles.speaker} />
  </TouchableOpacity>
  <TouchableOpacity onPress={saveHandler}>
  {favButton}
  </TouchableOpacity></View>);
}


function saveHandler(){
  toggler()
  if(!toggle){
    let newFaves = [{phrase: input.trim(), translation: output.trim(), source: from.short, target: to.short, key: favorites.length}, ...favorites];
    setFavorites(newFaves);
    }    
  else {
    const old = favorites.filter(item => item.phrase != input)
    setFavorites(old);
  }
  }
  let favButton = []
  const [toggle,setToggle] = useState(false)

  const assigner = () => {
    let check = false
    for (let i = 0; i <favorites.length; i++) {
      if(favorites[i].phrase.toLowerCase() == input.trim().toLowerCase() && favorites[i].translation.toLowerCase() == output.trim().toLowerCase() ){
        check = true
        break 
      }
    }
    if (check){
      if(toggle){
      }
      else{
        setToggle(true)
      }
    }
    else { 
      if(!toggle){
      }
      else{
        setToggle(false)
    }
  }
}
  const toggler = () => {
     setToggle(!toggle)
  } 
   
  if (translationReady) {
    assigner()
    if (toggle) {
      favButton = []
      favButton.push(<MaterialIcons name="star" size={24} color="black" />)
     } 
      else if (!toggle){
      favButton = []
      favButton.push(<MaterialIcons name="star-border" size={24} color="black" />)
     }
     ButtonHandler();
  }
  
 
    

const HideKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

 return (
  <ScrollView 
  onPress={() => Keyboard.dismiss()} 
  keyboardDismissMode='interactive'
  bounces='false'>
  <StatusBar style="auto" />

   
<View style={globalStyles.topBar}>
  <TouchableOpacity style={globalStyles.languageBox} >
  <Card style={globalStyles.topBarText}>
  <Text>{from.language}</Text>
</Card>
</TouchableOpacity>

<Card style={globalStyles.topBarText}>
<TouchableOpacity style={globalStyles.switch} onPress={swap}  >
  <MaterialIcons name="swap-horiz" size={30} color="black" />
</TouchableOpacity>
</Card> 

<TouchableOpacity style={globalStyles.languageBox} >
  <Card style={globalStyles.topBarText}>
  <Text>{to.language}</Text>
</Card>
</TouchableOpacity>
</View>


<View style={styles.cardContainer}>
<Card style={globalStyles.card}>
<View style={globalStyles.upperBox}>
<View style={globalStyles.input}>
<TextInput 
  style={globalStyles.input}
  placeholder={'Píšte tu'} 
  onChangeText={inputHandler}
  autoFocus={false}
  value = {input}
  defaultValue={def}
  ref={inputref}
  multiline={true}
  /> 
</View>
<View style={globalStyles.inputIcon} >
<TouchableOpacity  onPress={() => clear()}>
    <MaterialIcons name="close" size={30} color="gray" opacity="" style={styles.close}/>
</TouchableOpacity>
</View>
</View>
</Card>
<Card style={[globalStyles.card, styles.outputContainer]}>
<View style={styles.outputHolder}>
<Text width={width - 0.15*width} numberOfLines={1} ellipsizeMode='tail' style={globalStyles.output}>{output}</Text>
</View>

{translationButtons}


</Card>
</View>
<View flexDirection="row">
 
    <View style={styles.flex2}>
    
    </View>
</View>
</ScrollView>
    );
}

export default Home

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#EEE',
    },
    box: {
      borderWidth: 2,
      borderRadius: 9,
      borderColor: 'skyblue',
      paddingVertical: 10
    },
    input: {
      flex: 1,
      height: '10%',
      textAlignVertical: 'top',
      borderWidth: 1,
    },
    outputHolder: {
      flex: 2,
    },
    flex2: {
      flex: 2,
    },
    star: { 
    },
    outputContainer:{
      flexDirection: 'row',
    },
    outputLower: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    copy:{
     
      alignItems: 'flex-end'
    },
    speaker: {
      paddingHorizontal: 30
    },
    close:{
      alignSelf: 'flex-start',
    justifyContent: 'flex-end',
    },
    cardContainer: {
    },
    info: {
      color: 'skyblue',
      fontSize: 12,  
      alignSelf:'center',
      paddingBottom: 10
    }
  });
  