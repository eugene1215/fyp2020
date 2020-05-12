import  React,{Component} from 'react';
import { StyleSheet,SafeAreaView,TouchableOpacity,Image,Dimensions,FlatList,VirtualizedList,Text, Alert } from 'react-native';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards';
import { Rating, AirbnbRating } from 'react-native-elements';
import {CustomHeader} from '../index';
import firebase from 'firebase';
import db from '../api';
import { FAB } from 'react-native-paper';
//  "react-native": "https://github.com/expo/react-native/archive/sdk-36.0.0.tar.gz",

//var userId = firebase.auth().currentUser.uid;

export class ListScheduleScreen extends Component{
  static navigationOptions = { header: null }
  constructor(props) {
    super(props);
    //let ds = new ListView.DataSource({ rowHasChanged:(r1,r2) => r1 !== r2});

    this.state ={
      a: this.props.route.params.Cday,
    uid:"",
      showListVisible:false,
       itemDataSource : [],
    
   
    }
    this.itemsRef = this.getRef();
   
}


getRef(){
  /* var userid = firebase.auth().currentUser.uid;
  console.log("123")
  console.log(userid); */
  var userId = firebase.auth().currentUser.uid;
   return firebase.database().ref('Schedule/').child(userId).orderByChild('Date').equalTo(this.state.a);


  }
 

  componentDidMount(){
    this.getItems(this.itemsRef);
  
    } 
    
    getItems(itemsRef){
      
      
      itemsRef.on('value',(snap)=>{
        let items = [];
            snap.forEach((child) =>{
          items.push({
            Title:child.val().Title,
            Location:child.val().Location,
            CreatedBy:child.val().CreatedBy,
            uid : child.val().uid,
           StartTime: child.val().StartTime,
           EndTime:child.val().EndTime,
           Date:child.val().Date,
             _key:child.key
           
            
          });
    
        });
        //var CreatedBy = new Date (CreatedBy.seconds*1000);
        this.setState({
          itemDataSource: items
      });
    
    
     });
    }
pressRow(item){
  this.itemsRef.child(item._key).remove()
}

  
      render(){
        //const item = this.props.item;
        const { navigate  } = this.props.navigation;
        var userId = firebase.auth().currentUser.uid;
        //const { itemDataSource,items } = this.state;
      
       return(
        <SafeAreaView style={{flex:1}}>
           {/* <CustomHeader name="Todo" isHome={true} navigation={this.props.navigation}/> */}
             
      {/*   <CardView
        cardElevation={5}
        //cardMaxElevation={2}
        cornerRadius={5}>  */}
          
       
                 <FlatList
                 style={styles.flatlist}
           data ={this.state.itemDataSource}
           renderItem={({item})=>
           <TouchableOpacity
         style={styles.Card}
         
         
        
        //onPress={() => this.props.navigation.navigate('TodoDetail')}
        >
           <Card>
             
             
         
           <CardContent 
           text={"Title: "+item.Title}
           
         
           />
           <CardContent 
           text={"Location: "+item.Location}
            

         
           /><CardContent 
           text={"Start Time: "+item.StartTime}
            

         
           /><CardContent 
           text={"End Time: "+item.EndTime}

            

         
           />
           
          
          <CardButton 
            title="Delect"    
            color="blue"
            onPress={() =>
                Alert.alert(
                    'Do you want to delete?',
                    '',
                    [
                     
                      {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                      },
                      {text: 'OK', onPress: () => firebase.database().ref('Schedule/').child(userId).child(item._key).remove()},
                    ],
                    {cancelable: false},
                  )}
                
             />
              
           </Card>
           
           </TouchableOpacity>   
           }
         
           enableEmptySections={false}
          keyExtractor={(item,index) => String(index)}
          numColumns={1}
           > 
       
          
       
             
            
             </FlatList> 
           
           {/* </CardView>  */}
      
         <FAB
          style={styles.fab}
          small
          icon="plus"  
          color='white'
          //label='ADD'
          // loading= "true"
          onPress={() =>  this.props.navigation.navigate('AddSchedule', {  
            Curretdate:this.state.a,  
          
      
            
        })}
        />
            
         </SafeAreaView   >
             
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
              textAlign:"left",
              textTransform:"capitalize",
              textDecorationStyle: "solid"
            },
            Card:{
            
              marginBottom:3,
              paddingVertical:10,
              paddingHorizontal:50
            
            },
          
            
            
          });