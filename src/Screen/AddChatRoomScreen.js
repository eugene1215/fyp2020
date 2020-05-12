import React, { Component } from 'react';
import { Container, CardItem, Text, } from 'native-base';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import { StyleSheet, SafeAreaView, TouchableOpacity, Image, FlatList, Dimensions, View } from 'react-native';
import { CustomHeader } from '../index';
import { FAB } from 'react-native-paper';
import { TouchableHighlight } from 'react-native-gesture-handler';
import firebase from 'firebase';
import Constants from 'expo-constants';
//import CardView from 'react-native-cardview'
import { Button } from 'react-native-paper';
import TodoDetail from './TodoDetailScreen';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
export class AddChatRoomScreen extends Component {
  constructor(props) {
    super(props);
    //this.navigate=this.props.navigation.navigate;

    this.state = {
      Title: "",

      itemDataSource: []
    }

    //  this.itemsRef = this.getRef().child();
    this.itemsRef = this.getRef();
    //this.renderRow = this.renderItem.bind(this);
    //this.pressRow = this.pressRow.bind(this);
  }


  getRef() {
    /* var userid = firebase.auth().currentUser.uid;
    console.log("123")
    console.log(userid); */
    var userId = firebase.auth().currentUser.uid;
    return firebase.database().ref('Chatroom/')
  }

  /* componentWillMount(){
    this.getItems(this.itemsRef);
  
  } */

  componentDidMount() {
    this.getItems(this.itemsRef);
  }

  getItems(itemsRef) {

    itemsRef.on('value', (snap) => {
      let items = [];
      snap.forEach((child) => {
        items.push({
          Title: child.val().Title,
          _key: child.key


        });

      });
      //var CreatedBy = new Date (CreatedBy.seconds*1000);
      this.setState({
        itemDataSource: items
      });


    });
  }



  /* pressRow(item){
    this.itemsRef.child(item._key).remove();
  }
   */
  /* 
  renderRow(item){
  return(
  
  )
  }
   */

  render() {
    //const item = this.props.item;
    const { navigate } = this.props.navigation;

    //const { itemDataSource,items } = this.state;

    return (
      <SafeAreaView style={{flex:1}}>
      {/* <CustomHeader title = "Home" isHome={true} navigation={this.props.navigation}/> */}

{/* test 
*/}

 <FlatList
     style={styles.flatlist}
     data={this.state.itemDataSource}
      renderItem={({item})=>
   
      <Card style={styles.Card}
 isDark = {false}
 >


<CardTitle 
title={item.Title}

/>


<CardButton
onPress={() =>this.props.navigation.navigate('ChatDetail',{Title:item.Title})}
 title="Join"
 color="#1E90FF"
/>
<CardAction 
separator={true} 
inColumn={false}>
</CardAction>
</Card>
     }
     enableEmptySections={true}
     initialListSize= {2}
    
     />

<FAB
style={styles.fab}
small
icon="plus"  
color='white'
//label='ADD'
// loading= "true"
onPress={() =>  this.props.navigation.navigate('AddChat')}
/>
 
   </SafeAreaView>

    );
  }
}


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
    width: 5,

    justifyContent: 'space-around'
  },
  flatlist: {
    marginBottom: 20,
  },
  text: {
    fontWeight: "bold",
    fontSize: 15,
    textShadowRadius: 10,
    textAlign: "left",
    textTransform: "capitalize",
    textDecorationStyle: "solid"
  },
  Card: {

    marginBottom: 3,
    paddingVertical: 10,
    paddingHorizontal: 50

  },



});