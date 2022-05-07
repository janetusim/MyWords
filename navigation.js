import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'; 
import Home from './screens/home';
import Dictionary from './screens/dictionary';
import Favorites from './screens/favorites';

function Navigation() {
  const Tab = createBottomTabNavigator();
  
  return (

    <NavigationContainer>
      <Tab.Navigator 
      initialRouteName="Home"
     >
        <Tab.Screen 
        name="Home" 
        component={Home} 
        options={{ title: 'MyWords', labelStyle: {fontSize:18}, activeTintColor: '#333',
        tabBarIcon: ({ focused }) => {
          let icon;
            icon = focused
              ? <MaterialIcons name="translate" size={24} color="skyblue" />
              : <MaterialIcons name="translate" size={24} color="black" />
          return icon;
        },
        tabBarActiveTintColor: 'skyblue',
        tabBarInactiveTintColor: 'gray', }} 
        />
        <Tab.Screen 
        name="Favorites" 
        component={Favorites} 
        options={{ title: 'Obľubené',tabBarIcon: ({ focused }) => {
          let icon;
            icon = focused
              ? <MaterialIcons name="star" size={24} color="skyblue" />
              : <MaterialIcons name="star-border" size={24} color="black" />
          return icon;
        },
        tabBarActiveTintColor: 'skyblue',
        tabBarInactiveTintColor: 'gray' }} 
       />
        <Tab.Screen name="Dictionary" 
        component={Dictionary} 
        options={{ title: 'Slovník',tabBarIcon: ({ focused }) => {
          let icon;
            icon = focused
              ? <MaterialIcons name="menu-book" size={24} color="skyblue" />
              : <MaterialIcons name="menu-book" size={24} color="black" />

          return icon;
        },
        tabBarActiveTintColor: 'skyblue',
        tabBarInactiveTintColor: 'gray' }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Navigation