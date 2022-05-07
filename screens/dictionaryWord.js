import {  useState, useEffect, useContext } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    useWindowDimensions
  } from 'react-native';
import DictionaryWait from './dictionaryWait';
import DictionaryNotFound from './dictionaryNotFound';
import RenderHtml from 'react-native-render-html';
const axios = require('axios');
import { MyContext } from '../context'
import { showMessage} from "react-native-flash-message";



export default function DictionaryWord({navigation, route}) {
  const [myResponse, setMyResponse] = useState([]);
  const [ready, setReady] = useState(false);
  const final = [];
  const {net} = useContext(MyContext);
  const contentWidth = useWindowDimensions().width;
  let myError = false;
 

  useEffect(() => {
    if (net.isConnected == false) {
      showMessage({
        message: "Skontrolujte internetové pripojenie",
        type: "warning",
      });
    }
    else{
    const options = {
      method: 'POST',
      url: 'https://xf-english-dictionary1.p.rapidapi.com/v1/dictionary',
      params: {
        selection: route.params.title
      },
      headers: {
        
        'content-type': 'text/plain',
        'X-RapidAPI-Host': 'xf-english-dictionary1.p.rapidapi.com',
        'X-RapidAPI-Key': 'xxxx-xxxx-xxxx-xxxx'
      },
      data: '{"selection":"'+route.params.title+'"}'
    };
    
    axios.request(options).then(response => {
      setMyResponse(response.data);
      setReady(true);
      myError = false
    }).catch(function (error) {
      console.error(error);
      nyError = true
    });}
  },[]);


  const Type = (sample) => {

  if (Array.isArray(sample)){
       for (let j=0;j<sample.length;j++){
        
          Type(sample[j]);
    }
  }
  else if (typeof sample === "object"){
      Object.entries(sample).forEach(([hey, value]) => {
        if (hey === "definition"){
          final.push(<Text style={styles.name}>,.......................,</Text>);
          final.push(<Text style={styles.name}>{hey} :</Text>);
          Type(value);
        }
        else if (hey === "word"){
          final.push(<Text style={styles.postTitle}>.......................................</Text>);
          final.push(<Text style={styles.name}>{hey} :</Text>);
          Type(value);
        }
        else if (hey === "examples"){
          final.push(<Text style={styles.name}>{hey} :</Text>);
          Type(value);
        }
        else if (hey === "pronunciationSectionID"){
          
        }
        else if (hey === "inflectionalForms"){
          
        }
        else if (hey === "definitions"){
          final.push(<Text style={styles.name}>{hey} :</Text>);
          Type(value);
        }
        else if (hey === "partOfSpeech"){
          final.push(<Text style={styles.name}>as (part of speech) :</Text>);
          Type(value);
        }
        else {
          final.push(<Text style={styles.name}>{hey} :</Text>);
          Type(value);
            }
      })
  }
  else{ 
      final.push(<View style={styles.tags}><RenderHtml 
        source={{ html:"<div style='text-align:center;'>" + sample + "</div>" }} 
        
        contentWidth={contentWidth} /></View>);
      }
    }
    
 

  if (ready) {
  let toGetSorted = myResponse.items;
  Type(toGetSorted);

  }
  if (!ready){
    return <DictionaryWait></DictionaryWait>;
  }
  else if (Object.keys(myResponse).length == 0){
    return <DictionaryNotFound></DictionaryNotFound>;
  }
  else if (myError){
    return <DictionaryNotFound></DictionaryNotFound>;
  }
  else if (ready){

  return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
              <Text style={styles.headerTitle}>
              {route.params.title}
              </Text>
              </View>
              

              <View style={styles.postContent}>
                {final}
              
              <Text style={styles.postTitle}>
              

                  </Text>

              <Text style={styles.postDescription}>
            
              </Text>

              <Text style={styles.tags}>
                Provided by XF English Dictionary API
              </Text>

              <Text style={styles.date}>
                MyWords
              </Text>

  
              
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    borderWidth: 2,
    borderRadius: 9,
    borderColor: 'skyblue',
  },
  header:{
    padding:30,
    alignItems: 'center',
    backgroundColor: "skyblue",
    
      borderRadius: 9,
  },
  headerTitle:{
    fontSize:30,
    color:"#FFFFFF",
    marginTop:10,
  },
  name:{
    fontSize:22,
    color:"skyblue",
    fontWeight:'600',
    textAlign:"left",
  },
  postContent: {
    flex: 1,
    padding:30,
  },
  postTitle:{
    fontSize:26,
    fontWeight:'600',
    paddingVertical: 10,
    alignSelf:'center'
  },
  postDescription:{
    fontSize:16,
    marginTop:10,
  },
  tags:{
    color: '#00BFFF',
    marginTop:10,
  },
  date:{
    color: '#696969',
    marginTop:10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 35,
    borderWidth: 4,
    borderColor: "#00BFFF",
  },
  profile:{
    flexDirection: 'row',
    marginTop:20
  },
  name:{
    fontSize:22,
    color:"#00BFFF",
    fontWeight:'600',
    alignSelf:'center',
    marginLeft:10,
    paddingVertical: 20
  }, 
  shareButton: {
    marginTop:10,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
    backgroundColor: "#00BFFF",
  },
  shareButtonText:{
    color: "#FFFFFF",
    fontSize:20,
  }
});
