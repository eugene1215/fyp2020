import React,{Component} from 'react';
import { StyleSheet, Text, View,SafeAreaView,Platform, KeyboardAvoidingView,} from 'react-native';
import { Container, Item, Form, Input, Button, Label ,TouchableOpacity} from "native-base";
import{GiftedChat} from 'react-native-gifted-chat';
import * as firebase from "firebase";
import Fire from "../Screen/Fire"




export  class listchatScreen extends Component {

    constructor(props) {
     
        super(props);
       
       
        
        this.state = {
      
        messages:[],
          Title: this.props.route.params.Title,
 
        user: this.user
      
        };
    }
   

componentDidMount(){
  this.get(message => 
    this.setState(previous => ({
    messages: GiftedChat.append(previous.messages, message)
  }))
  );
}
componentWillUnmount(){
 this.off();
}
/*
send = messages =>{
  messages.forEach(item => {
      const message ={
          text: item.text,
          timestamp: firebase.database.ServerValue.TIMESTAMP,
          user: item.user
      };
      this.db.push(message)
  });
};*/
/*
send = messages => {
  for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {
          text,
          user:this.user,
          timestamp: firebase.database.ServerValue.TIMESTAMP,
      };
      this.db.push(message);
  }
};
*/
onSend(messages) {

  for (let i = 0; i < messages.length; i++) {
    const { _id,text, user } = messages[i];
    const message = {
      _id,
        text,
        user,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
    };
    this.saveMessage(message);
}
}
saveMessage(message) {
  return firebase
    .database()
    .ref(this.state.Title).child("/messages/")
    .push(message)
    .catch(function(error) {
      console.error("Error saving message to Database:", error);
    });
}
parse =message => {
  const {user, text, timestamp} = message.val();
  const {key:_id} = message 
  const createdAt= new Date(timestamp)

  return{
      _id,
      createdAt,
      text,
      user
  };
};
get = callback => {
  firebase.database().ref(this.state.Title).child("/messages/").on("child_added", snapshot => callback(this.parse(snapshot)));
};

off(){
  this.db.off();
}
 get db(){
     return firebase.database().ref(this.state.Title).child("/messages/");
 }

 get uid(){
     return (firebase.auth().currentUser || {}).uid;
 }
 get user(){
  return {  _id:(firebase.auth().currentUser || {}).uid,
          name:(firebase.auth().currentUser || {}).email}
}

  render() {
    const chat=<GiftedChat messages={this.state.messages} onSend={ messages => this.onSend(messages)} user={this.user} showAvatarForEveryMessage={true}/>;

    if(Platform.OS ==='android'){
      return(
          <KeyboardAvoidingView style ={{flex:1}} behavior="padding" keyboardVerticalOffset={30} enabled>
            {chat}
          </KeyboardAvoidingView>
      );
    }
  return <SafeAreaView style={{flex:1}}>{chat}</SafeAreaView>;
    
  }
}