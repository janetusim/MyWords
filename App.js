import { useState, useEffect } from 'react';
import { ApplicationProvider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import Navigation from './navigation';
import FlashMessage from "react-native-flash-message";
import { MyContext } from './context'
import NetInfo from '@react-native-community/netinfo';


function App(){
  return(
<Navigation></Navigation>
)
}

function Startup (){
 
}
export default function HomeScreen() {
  const [ready, setReady] = useState(false);
  const [favorites, setFavorites] = useState([])
  const [input, setInput] = useState("")
  const [output, setOutput] = useState("")
  const [def, setDef] = useState("")
  const [languages, setLang] = useState({ 
    eng : {language: 'Angličtina', code: 'en_GB',short:'ENG'}, 
    svk:{language:'Slovenčina', code:'sk_SK',short:'SVK'} 
  });
  
  const [from, setFrom] = useState(languages.eng);
  const [to, setTo] = useState(languages.svk);
  let net = []

  const unsubscribe = NetInfo.addEventListener(state => {
   net = state
  });

  initValues = [{
    phrase: "Hello",
    translation: "Ahoj",
    source: "ENG",
    target: "SVK",
    key: "1"
  }
  ,{
    phrase: "These are my saved translations",
    translation: "Toto sú moje uložené preklady",
    source: "ENG",
    target: "SVK",
    key: "2"
  }]


useEffect(() => {
  const getData = async () => {
    try {
      await AsyncStorage.getItem('@myData').then
      (response => JSON.parse(response))
      .then( data => {
        setFavorites(data)
      })
      }
      catch(e){
        console.error(e)
      }
  }
  const checkAndGet = async () => {
    try {
    await AsyncStorage.getAllKeys()
    .then(response => {
      if (response.includes('@myData')){ 
        getData()
      } else {setFavorites(initValues)}
    }) 
    } catch(e) {
      console.error(e)
    }
  }
  checkAndGet()
  
},[]);
  
useEffect(() => {
  const storeData = async (value) => {
    try {
      let database = JSON.stringify(value)
      await AsyncStorage.setItem('@myData', database)
    } catch (e) {
      // saving error
  
    }
  }
  setTimeout(() => {
    storeData(favorites)
  }, 1000);
  
  

},[favorites]);
  
  if (!ready) {
    return (
      <AppLoading
        startAsync={Startup}
        onFinish={()  => setReady(true)}
        onError={console.warn} />
    )
  }
  else { 
    return (
    
      <ApplicationProvider {...eva} theme={eva.light}>
          <MyContext.Provider value={{favorites, setFavorites, input, setInput, def, setDef, net, output, setOutput, from, setFrom, to, setTo, languages}}>
            <App />
            <FlashMessage position="top" />
          </MyContext.Provider>
        </ApplicationProvider>
        
    )
  }
}

