import React,{Component} from 'react';
import { StyleSheet, Text, View,SafeAreaView,Platform, KeyboardAvoidingView,} from 'react-native';
import { Container, Item, Form, Input, Button, Label ,TouchableOpacity} from "native-base";
import{GiftedChat} from 'react-native-gifted-chat';
import * as firebase from "firebase";
import Fire from "./Fire"



export  class listchatScreen extends Component {

    constructor(props) {
     
        super(props);
        var user = firebase.auth().currentUser;
        var email,  uid;
        
        if (user != null) {
         
          email = user.email;
        
          uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                           // this value to authenticate with your backend server, if
                           // you have one. Use User.getToken() instead.
        } this.state = {
        email : user.email,
        uid : user.uid,
        messages:[]
        };
    }
    get user(){
      return {
        _id: this.state.uid,
        name: this.state.email
      };
}
componentDidMount(){
  Fire.get(messages => 
    this.setState(previous => ({
    messages: GiftedChat.append(previous.messages, messages)
  }))
  );
}

componentWillUnmount(){
Fire.off();
}
    
  render() {
    const chat=<GiftedChat messages={this.state.messages} onSend={Fire.send} user={this.user} />;

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