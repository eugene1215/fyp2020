import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Alert,
  Button
} from 'react-native';

import {Calendar} from 'react-native-calendars';
import { SafeAreaView } from 'react-navigation';
import firebase from 'firebase';
import { FAB } from 'react-native-paper';
var temp;
nextDay=[];
const mark = {
  [nextDay]: {selected: true, marked: true, dotColor: 'red', }
  };
  
// const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
//var userId = firebase.auth().currentUser.uid;



export class ScheduleScreen extends Component{
 

  constructor(props) {
    super(props);
    this.state = {
      selected: undefined,
      marked: null,
      Date:[],
      mark: mark,
    };
    this.onDayPress = this.onDayPress.bind(this);
    this.itemsRef = this.getRef();
  }
  onDayPress = (day) => {
    this.setState({selected: day.dateString});
    this.props.navigation.navigate('ListSchedule', {  
      Cday: day.dateString,  
    
      
  })

  
  }
  getRef(){
    /* var userid = firebase.auth().currentUser.uid;
    console.log("123")
    console.log(userid); */
    var userId = firebase.auth().currentUser.uid;
     return firebase.database().ref('Schedule/').child(userId).orderByChild('Date');
  
  
    }
    componentDidMount(){
      this.getItems(this.itemsRef);
      this.anotherFunc();
     // this.anotherFunc();
      } 

      
      refresh=()=>{
        this.setState({ marked : null})
        this.setState.nextDay=[]
      this.setState.mark = {
       [nextDay]: {selected: true, marked: true, dotColor: 'red', }
       };
       var userId = firebase.auth().currentUser.uid;
       firebase.database().ref('Schedule/').child(userId).orderByChild('Date').once('value', function(snapshot) { snapshot.forEach((child) =>{
         nextDay.push(child.val().Date)
            console.log(nextDay)
           
            
            console.log('nextDay')
      
              
          });
            
          });
         
           
       var obj = nextDay.reduce((c, v) => Object.assign(c, {[v]: {selected: true,marked: true,dotColor: 'red'}}), {});
       this.setState({ marked : obj});
     
     
     }
          
anotherFunc = () => {
  var userId = firebase.auth().currentUser.uid;
  firebase.database().ref('Schedule/').child(userId).orderByChild('Date').once('value', function(snapshot) 
  { snapshot.forEach((child) =>{
    nextDay.push(child.val().Date)
       console.log(nextDay)
      
       
       console.log('nextDay')
 
         
     });
       
     });
    
      
  var obj = nextDay.reduce((c, v) => Object.assign(c, {[v]: {selected: true,marked: true,dotColor: 'red'}}), {});
  this.setState({ marked : obj});

  }
      
   

      getItems(itemsRef){
        // let test = nextDay;
        
        itemsRef.once('value',(snap)=>{
          let items = [];
              snap.forEach((child) =>{
                items.push({
             
             Date:child.val().Date,
       
              
            });
      
          });
          //var CreatedBy = new Date (CreatedBy.seconds*1000);
          this.setState({
            Date: items,
            //marked: true
         
        })
                                         /*  const mark ={
                                            [items]: {selected:true,marked: true}
                                          };
                                    this.state({
                                      mark:mark,
                                    }) */

                                   

       });
     /*   let a = {};
       test.forEach((day)=>{
         a[day] = {
           marked:true
         }
       }) */
      
      }
  render() {
    // const newObject = { ...this.state.markedDates };
    // let calendarEvents = JSON.parse(JSON.stringify(this.state.originalMarkedDates))


    const {Date} = this.state;
    return (
      <SafeAreaView>
            <Button style={{height:100}}
            title="+"
            onPress={()=>this.refresh()}
     />
      <View style={styles.container}>
      <StatusBar barStyle="light-content"/>
  
        <Calendar
          onDayPress={this.onDayPress}
          style={styles.calendar}
          hideExtraDays
         // markingType={'multi-dot'}
          markedDates={
            this.state.marked
        }
        
            // 
    //  
                      //  [ this.state.Date]:{dotColor: 'red', disabled: true},
                    
                      
          theme={{
            selectedDayBackgroundColor: 'green',
            todayTextColor: 'green',
            arrowColor: 'green',
          }}
        />
      {/* <Text style={{height:100}}>123  </Text> */}
    
     
      </View>
   
 
      
      </SafeAreaView>
  
     
      
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    height:200
  
  }
});