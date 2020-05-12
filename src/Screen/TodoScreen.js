import  React,{Component} from 'react';
import {Container,CardItem,Text,} from 'native-base';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import { StyleSheet,SafeAreaView,TouchableOpacity,
  Image,FlatList,Dimensions,View,Alert} from 'react-native';
import {CustomHeader} from '../index';
import { FAB } from 'react-native-paper';
import firebase from 'firebase';
import CardView from 'react-native-cardview'

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';




const moment = require('moment')

var i
export class TodoScreen extends Component{
 constructor(props){
  super(props);
  //this.navigate=this.props.navigation.navigate;
  this.allRef = this.getReff();
  this.comRef = this.getComRef();
  this.state={
   Image:"",
   showListVisible:false,
    itemDataSource : [],
    GoalDetail:'',
    Goal:'',
    taskCount:0,
    completedCount:0,
    time:[],
    expoPushToken: '',
    notification: {},
    item:[]
  }
  const notification1 = {
    title: 'Long Time No See !!',
    body: 'Tap Me Look Around Your Goals.',
    android: { sound: true }, // Make a sound on Android
    ios: { sound: true }, // Make a sound on iOS
  };
  const options = {
    time: Date.now() + 604800000, // Schedule it in 10000=10 seconds
    //repeat: 'day', // Repeat it daily
  };
  const id = Notifications.scheduleLocalNotificationAsync(notification1, options)
//  this.itemsRef = this.getRef().child();
this.itemsRef = this.getRef();
Notifications.addListener(() => {
  console.log('triggered!');
});
//this.taskCount = this.getTaskCountRef();
//this.renderRow = this.renderItem.bind(this);
//this.pressRow = this.pressRow.bind(this);
}


getRef(){
var userId = firebase.auth().currentUser.uid;
 return firebase.database().ref('Todo/TodoList').child(userId);
}

/* _handleNotification = notification => {
  Vibration.vibrate();
  console.log(notification);
  this.setState({ notification: notification });
}; */

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
  }
}; */


componentDidMount(){
this.getItems(this.itemsRef);
this.getAll(this.allRef);
this.getCom(this.comRef);
//this.getTaskCount();
//this.getRemainingCount(this.remainingCount);
//this.registerForPushNotificationsAsync();

// Handle notifications that are received or selected while the app
// is open. If the app was closed and then opened by tapping the
// notification (rather than just tapping the app icon to open it),
// this function will fire on the next tick after the app starts
// with the notification data.
//this._notificationSubscription = Notifications.addListener(this._handleNotification);
} 

getItems(itemsRef){
  
  itemsRef.on('value',(snap)=>{
    let items = [];
        snap.forEach((child) =>{
      items.push({
        Goal:child.val().Goal,
        GoalDetail:child.val().GoalDetail,
        CreatedBy: child.val().CreatedBy,
        uid : child.val().uid,
       StartDate: child.val().StartDate,
       EndDate:child.val().EndDate,
        Image : child.val().Image,
        _key:child.key,
        Id:child.val().Id,
        Type:child.val().Type
      });

    });
    //var CreatedBy = new Date (CreatedBy.seconds*1000);
    this.setState({
      itemDataSource: items
  });


 });
}
  getTaskCount(item){
 var todoKey = item.Id;
  var userId = firebase.auth().currentUser.uid; 
  var taskCount =firebase.database().ref('Todo/subs').child(userId)
  taskCount.on("value",snapshot=>{
    var a = snapshot.child(todoKey);
    var countSource = a.numChildren();
   // return countSource
     this.setState({taskCount:countSource})
  }
  )} 
getTaskCountRef(){
  var userId = firebase.auth().currentUser.uid; 
   var ref = firebase.database().ref('Todo/subs').child(userId)
   return ref
}  

onLongPress(item){
       var key =item._key 
       var userId = firebase.auth().currentUser.uid; 
  Alert.alert(
    'Do you want to delete?',
    '',
    [
    
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => firebase.database().ref('Todo/TodoList').child(userId).child(key).remove()
      },
      
    ],
    {cancelable: false},//{action: this.props.navigation.navigate('TodoList')}
  
  
  )
}

getAll(allRef){
  allRef.on('value', (snap)=>{
    var count = snap.numChildren();
    this.setState({num:count});
  });

} 
getReff(){
  var userId = firebase.auth().currentUser.uid;
  // var i = this.props.item
  console.log(i)
  //var key = i._key
  //var todokey = i.Id
  return  firebase.database().ref('Todo/subs/').child(userId)
}
getComRef(){
  var userId = firebase.auth().currentUser.uid;
  return  firebase.database().ref('Todo/subs/').child(userId).orderByChild("completed").equalTo(true)
}

getCom(comRef){
comRef.on('value',(snap)=>{
  var count = snap.numChildren();
  this.setState({comNum:count})
})
}

render(){
  const { navigate,width } = this.props.navigation;
  var userId = firebase.auth().currentUser.uid;
  // const { completedCount,taskCount } = this.props.route.params;


 return(
<SafeAreaView style={{flex:1}}>
<FlatList
 style={{ paddingLeft:1, marginTop:25, flex:2,alignSelf:"stretch"}}
  data={this.state.itemDataSource}
  keyExtractor={(item,index) => String(index)}
  horizontal={true}
  showsHorizontalScrollIndicator = {false}
   renderItem={({item})=> 
   <TouchableOpacity
   style={styles.Card}
   onPress={()=>
this.props.navigation.navigate('TodoDetail',{
      // id:item.Id,
      item:item
      // todos:item,
      // sub:item.todos
    })}>
  
   <Card>
   <CardContent 
   text={item.Goal} 
   textStyle={styles.title}
   />
    <CardContent 
   text={item.GoalDetail} 
   textStyle={styles.text}
   />
  <CardContent 
   text={'Sub Tasks : ' +this.state.num
          +'\n' +'Remaing : ' +this.state.comNum
  }
   textStyle={styles.text}
   />     
     <CardContent 
   text={"Created at : "+'\n'+ new Date(item.CreatedBy)} 
   textStyle={styles.text}
   />
  <CardAction>
  <CardButton 
  onPress={()=> this.onLongPress(item)} />
</CardAction>

   </Card>
 
   </TouchableOpacity>   
  }
    //this.renderList(item) <TestListScreen list={item}/>
 
  >

</FlatList> 
   <FAB
    style={styles.fab}
    small
    icon="plus"  
    color='white'
    //label='ADD'
    // loading= "true"
    onPress={() =>  this.props.navigation.navigate('AddRecord')}
  />
      
   </SafeAreaView>
       
    );
    }}


    const styles = StyleSheet.create({
      fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      
      },
      container: {
        flex: 2,
        
        
      },
      button: {
        flex: 1,
        fontSize: 10,
        width:5,
        
        justifyContent: 'space-around'
      },
      flatlist:{
        marginBottom:20,
      },
      text: {
        fontWeight: "bold",
        fontSize: 15,
        textShadowRadius:10,
        textAlign:'center',
        marginBottom:0,
        paddingTop:1,
        textTransform:"capitalize",
        textDecorationStyle: "solid",
        color:'black',
      },
      title:{
        fontSize:20,
        fontWeight:'700',
        textAlign:'center',
        
        //paddingBottom:20,
        padding:20
        
      },

      Card:{
        flex:3,
        backgroundColor:'#6200EE',
        margin:10,
        paddingVertical:5, //y lenght of card
        paddingHorizontal:5,//space of every card
        borderRadius:6,
        marginHorizontal:15,
        alignItems:'center',
        width:200,
        //textAlignVertical:"bottom"
      
      },
    
      
      
    });
