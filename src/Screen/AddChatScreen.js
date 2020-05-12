import  React,{Component} from 'react';
import {Container, Header, Left, Body, Right, 
        Text,List,ListItem,Content, Title,Form,Icon, Card,CardItem,Textarearow ,Label,
        Textarea,Input,Item,Button} from 'native-base';
import { Rating, AirbnbRating } from 'react-native-elements';
import { StyleSheet,SafeAreaView,TouchableOpacity,
        Image,AlertIOS,View, Alert,Dimensions } from 'react-native';
import {CustomHeader} from '../index';
import firebase from 'firebase';
import { render } from 'react-dom';
import db from '../api'; 
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import DatePicker from 'react-native-datepicker';
 var r;
 var i;
export class AddChatScreen extends Component{
////////////////////////   

constructor(){
  super();
 this.state = {
     Title:"",
     itemDataSource : []
    
  
 
   // uid: currentUser.uid 
   // for storing data from db
     };
}

componentDidMount(){
  
 
}
/* getDate(){
  let timestamp = new Date();
  return timestamp.toGMTString();
} */
Insert(Title){
 
  
  
  firebase.database().ref('Chatroom').push({
    
      Title:Title,
    
  
    
  }).then(()=>{
    this.setState({
      Title:null,
      
    
     })
  }).catch((error)=>{
    console.log(error)
  });
}




  
 
  render(){
    const {currentUser,image} = this.state
    const { Width } = Dimensions.get('window');
      return(
  <SafeAreaView style={{flex:1}}>
      {/* <CustomHeader title=" " isHome={true} navigation={this.props.navigation}/> */}
   
    <Content>
       
   {this.state.isSubmited ?
         <View>
         <CardItem>
          <Item>
          <Icon active name="ios-checkmark-circle" style={{fontSize:30, color:'#4CAF50',
                  marginLeft:5, marginRight:10}}/>
            <Text style = {{flex:1}}>Submittion Successful</Text>
            </Item>
         </CardItem>
        
         <CardItem>
            <Left>
            </Left>
            <Body>
              <TouchableOpacity onPress={() =>this._togglePostCard()}>
                  <Icon active name="refresh" style={{fontSize:50, color:'#64DD17', marginLeft:10}}/>
              </TouchableOpacity>
              <Button
         style={styles.Button1}
           onPress={() =>this.props.navigation.navigate('listSchedule')}>
               <Text >See Record</Text>
               </Button>
            </Body>
            <Right>
            </Right>
         </CardItem>
         </View>
   :
         <View >
    <Form >
  
                  <Item style={{marginBottom:10}}>
                      <Input placeholder='Title' onChangeText={(Title) =>this.setState({Title})} />
                  </Item>
            
              
          
                  
  
  
         
  
  
  
          <Left>
         </Left>
         <Body>
         
           <Button 
           style={styles.Button1}
           onPress={() => this.Insert(this.state.Title) }>
           <Text>SUBMIT</Text>
           </Button>
         </Body>
        
        <Right>
        </Right>
  
       </Form>
     </View>
     }
  
   </Content>
  </SafeAreaView>
        );}}
        const styles = StyleSheet.create({
          container: {
            flex: 1
          },
          
      Image:{
        flex:2,
        justifyContent: 'center',
        marginLeft:10,
        alignSelf:"center",
    },
    Button1:{
       
       
        width:200,
        height:50,
        marginBottom:20,
        justifyContent: 'center',
        alignSelf:'center',
        
},
          textContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          },
          titleStyle: {
            fontSize: 30
          },
          subtitleStyle: {
            fontSize: 18
          },
          emptyTitle: {
            fontSize: 32,
            marginBottom: 16
          },
          postCard: {
              marginLeft:25,
              marginRight:25,
              marginTop:20,
              marginBottom:20,
            },
          emptySubtitle: {
            fontSize: 18,
            fontStyle: 'italic'
          }
        });