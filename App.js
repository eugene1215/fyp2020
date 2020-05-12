import 'react-native-gesture-handler';
import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { NavigationContainer,DefaultTheme,Platform,Vibration  } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {CustomHeader, CustomDrawContent}from './src';
import 
  {HomeScreen,TodoScreen,ScheduleScreen,GraphScreen,
  ListScheduleScreen,AddScheduleScreen,
  AddRecordScreen,AddPostScreen,TodoDetailScreen,listchatScreen,
  AddChatRoomScreen,AddChatScreen
  }
  from './src/Screen';
import{LoginScreen} from './src/auth/index';
import { IMAGE } from './src/images/ImagePath';
import * as Analytics from 'expo-firebase-analytics';
import { Notifications } from 'expo';
import Constants from 'expo-constants';
//////////////////////////////////////////////////////////////////////////////////////////////////////

/* state = {
  expoPushToken: '',
  notification: {},
};
 */
/* registerForPushNotificationsAsync = async () => {
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
    this.setState({ expoPushToken: token });
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.createChannelAndroidAsync('default', {
      name: 'default',
      sound: true,
      priority: 'max',
      vibrate: [0, 250, 250, 250],
    });

  }};
   */
 
const Tab = createBottomTabNavigator();

const navOptionHandler = () =>({
 headerShown:false
})
const hidden = (name)=>({
  if (name="TodoDetail") 
  {tabBarVisible = false}
})
function getActiveRouteName(navigationState) {
  if (!navigationState) return null;
  const route = navigationState.routes[navigationState.index];
  // Parse the nested navigators
  if (route.routes) return getActiveRouteName(route);
  return route.routeName;
}

const  StackTodo = createStackNavigator();
function TodoStack({navigation, route}){//homestack
    return(
        <StackTodo.Navigator initialRouteName = "TodoList" 
        headerMode='float' 
        mode='modal'
        screenOptions={{
         headerTintColor:'white',
          headerStyle: { backgroundColor: '#6B38FB' },
          headerTitleAlign: "center"
        }}
       
       >
              <StackTodo.Screen name="TodoList" component={TodoScreen}  />
              <StackTodo.Screen name="TodoDetail" component={TodoDetailScreen} />
            <StackTodo.Screen name="AddRecord" component={AddRecordScreen} />
            <StackTodo.Screen name="Graph" component={GraphScreen}/>
          
          
            {/* <StackTodo.Screen name="Result" component={ResultRecordScreen}option={navOptionHandler}/> */}
        </StackTodo.Navigator>
    )
}


const  StackHome = createStackNavigator();
function HomeStack({navigation, route}){
    return(
     
        <StackHome.Navigator initialRouteName ="Home"
        headerMode='float' 
        mode='modal'   
        screenOptions={{
         headerTintColor:'#FFFFFF',
          headerStyle: { backgroundColor: '#6B38FB' },
          headerTitleAlign: "center"
        }}>
              <StackHome.Screen name="Home" component={HomeScreen} />
              <StackTodo.Screen name="AddPost" component={AddPostScreen} />
              
            {/* <StackTodo.Screen name="Result" component={ResultRecordScreen}option={navOptionHandler}/> */}
        </StackHome.Navigator>
        
    )
}


const  StackSchedule= createStackNavigator();
function ScheduleStack({navigation, route}){//homestack
    return(
        <StackSchedule.Navigator initialRouteName ="Schedule"
        headerMode='float' 
        mode='modal'
    
        screenOptions={{
         headerTintColor:'#FFFFFF',
          headerStyle: { backgroundColor: '#6B38FB' },
          headerTitleAlign: "center"
        }}>
              <StackSchedule.Screen name="Schedule" component={ScheduleScreen}/>
              <StackSchedule.Screen name="AddSchedule" component={AddScheduleScreen}/>
              <StackSchedule.Screen name="ListSchedule" component={ListScheduleScreen}/>
        </StackSchedule.Navigator>
    )
}

const StackGraph= createStackNavigator();
function GraphStack({navigation,route}){
  return(
    <StackGraph.Navigator initialRouteName ="Graph"
    headerMode='float' 
    mode='modal'

    screenOptions={{
     headerTintColor:'#FFFFFF',
      headerStyle: { backgroundColor: '#6B38FB' },
      headerTitleAlign: "center"
    }}>
    <StackGraph.Screen name="Graph" component={GraphScreen} />
  
</StackGraph.Navigator>
  )
}
const StackChat = createStackNavigator();
function ChatStack({navigation,route}){
  return(
    <StackChat.Navigator initialRouteName ="Chat"
    headerMode='float' 
    mode='modal'

    screenOptions={{
     headerTintColor:'#FFFFFF',
      headerStyle: { backgroundColor: '#6B38FB' },
      headerTitleAlign: "center"
    }}>
   
          <StackChat.Screen name="Chat" component={AddChatRoomScreen} />
          <StackChat.Screen name="AddChat" component={AddChatScreen} />
          <StackChat.Screen name="ChatDetail" component={listchatScreen} />
        
    </StackChat.Navigator>
)
}
///////////////////////////////DRAWER/////////////////////////////////////////////
///////////////////////////////DRAWER/////////////////////////////////////////////
///////////////////////////////DRAWER/////////////////////////////////////////////
///////////////////////////////DRAWER/////////////////////////////////////////////
///////////////////////////////DRAWER/////////////////////////////////////////////
///////////////////////////////DRAWER/////////////////////////////////////////////
 const Drawer = createDrawerNavigator();
 function DrawerNavigator({navigation}){
     return(
     
<Drawer.Navigator initialRouteName="MenuTab"  drawerPosition = "right"
    drawerStyle={{
    backgroundColor: '#c6cbef',
    width: 240,}}
    drawerContent={()=> <CustomDrawContent navigation={navigation}/> }>
{/* drawerContent={()=> <CustomDrawContent navigation={navigation}/> }> */}
                    <Drawer.Screen name="Schedule" component={ScheduleStack} />
                    <Drawer.Screen name="TodoList" component = {TodoScreen}/>
                    <Drawer.Screen name="Home" component = {HomeStack}/>
                    <Drawer.Screen name="MenuTab" component={TabNavigator} />                

                </Drawer.Navigator>
              
     )
 }
 


/////////////////////////////TAB//////////////////////////////////////////////////////
/////////////////////////////TAB//////////////////////////////////////////////////////
/////////////////////////////TAB//////////////////////////////////////////////////////
/////////////////////////////TAB//////////////////////////////////////////////////////
/////////////////////////////TAB//////////////////////////////////////////////////////



function TabNavigator(){
    return(
<Tab.Navigator 
          onNavigationStateChange={(prevState, currentState)=>{
            const currentScreen = getActiveRouteName(currentState);
            const prevScreen = getActiveRouteName(prevState);
            if (prevScreen !== currentScreen) {
              // Update Firebase with the name of your screen
              Analytics.setCurrentScreen(currentScreen);
            }
          }}
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
           
            
             if (route.name === 'Todo') {
                iconName = focused 
                ? IMAGE.ICON_CHECK_LIST
                :  IMAGE.ICON_CHECK_LIST_BLACK;
            } 
            else if (route.name === 'Schedule') {
                iconName = focused 
                ? IMAGE.ICON_NOTIFICATION
                :  IMAGE.ICON_NOTIFICATION_BLACK;
            }  
            else if (route.name === 'Home') {
              iconName = focused
              ?IMAGE.ICON_HOME
              : IMAGE.ICON_HOME_BLACK;

          } 
            else if (route === 'Graph'){
              iconName = focused
              ? IMAGE.ICON_CHECK_LIST
              :IMAGE.ICON_CHECK_LIST_BLACK;
            }
            else if (route === 'Chat'){
              iconName = focused
              ? IMAGE.ICON_CHAT
              :IMAGE.ICON_CHAT_BLACK;
            }
   
  
              // You can return any component that you like here!
              return <Image source={iconName} style = {{width:25, height:25}}
              resizeMode="contain" />;
            },
          })}
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
            tabStyle:'',

          }}
        >
      
         
      <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Todo" component={TodoStack} />
          <Tab.Screen name="Schedule" component={ScheduleStack} /> 
          <Tab.Screen name="Graph" component={GraphStack} />
        <Tab.Screen name="Chat" component={ChatStack} /> 
        </Tab.Navigator>
    );
}
 const StackApp = createStackNavigator();
export default function App() {
 
    return (
      <NavigationContainer theme={MyTheme}>
                <StackApp.Navigator initialRouteName="Login"
                 headerMode='float' 
                 mode='modal'
                 screenOptions={{
                  headerTintColor:'#FFFFFF',
                   headerStyle: { backgroundColor: '#6B38FB' },
                 }}>
                <StackApp.Screen name="FYPdemo" component={DrawerNavigator}options={navOptionHandler}/>
                <StackApp.Screen name="Login" component={LoginScreen}/>
                 
                </StackApp.Navigator>
      </NavigationContainer>
    );
    
  }

  const MyTheme = {
    dark: true,
  colors: {
    primary: 'rgb(255, 45, 85)',
    background: 'rgb(242, 242, 242)',
    card: 'rgb(255, 255, 255)',
    text: 'rgb(28, 28, 30)',
    border: 'rgb(199, 199, 204)',
    },
  };


