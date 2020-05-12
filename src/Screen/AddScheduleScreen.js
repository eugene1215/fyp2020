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
export class AddScheduleScreen extends Component{
////////////////////////   

constructor(){
super();
this.state = {
 Title:"",
 Location:"",
 // timestamp:"",

 StartTime:"",
EndTime:"",
Date: ""
,
 currentUser: null
// uid: currentUser.uid 
// for storing data from db
 };
}

componentDidMount(){
this.getPermissionAsync();

}
/* getDate(){
let timestamp = new Date();
return timestamp.toGMTString();
} */
Insert(Title,Location,StartTime,EndTime,Date){
const {currentUser}= firebase.auth()
this.setState({currentUser})

firebase.database().ref('Schedule').child(currentUser.uid).push({
 CreatedBy:firebase.database.ServerValue.TIMESTAMP,
  Title:Title,
Location:Location,
Date:this.props.route.params.Curretdate,


StartTime:StartTime,
EndTime:EndTime,

uid:currentUser.uid,

}).then(()=>{
this.setState({
  Title:null,
  Location:null,

  isSubmited:true,
  StartTime:null,
  EndTime:null,
  Date:null

 })
}).catch((error)=>{
console.log(error)
});
}
/* getDot(){
    var userId = firebase.auth().currentUser.uid;
    var DotDate = this.props.route.parms.Curretdate;
     return firebase.database().ref('Schedule/').child(userId).orderByChild('Date').equalTo(DotDate);
}
 */
_togglePostCard(){
this.setState({
isSubmited:false
})
}
getPermissionAsync = async () => {
if (Constants.platform.ios) {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (status !== 'granted') {
    alert('Sorry, we need camera roll permissions to make this work!');
  }
}
}

_pickImage = async () => {
let result = await ImagePicker.launchImageLibraryAsync({
  mediaTypes: ImagePicker.MediaTypeOptions.All,   
  aspect: [4, 3],
  allowsEditing: false,
  quality: undefined,
  base64: true,
  // videoExportPreset: ImagePicker.VideoExportPreset.LowQuality
});

console.log(result);

if (!result.cancelled) {
  this.setState({ image: result.uri });
  //console.log(result.uri);
  i= result.uri;
}

};

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
       onPress={() =>this.props.navigation.navigate('ListSchedule')}>
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
        
          
      
              <Item style={{marginBottom:10}}>
                  <Input placeholder='Location' onChangeText={(Location) =>this.setState({Location})} />
              </Item>
              <Text style={{ alignSelf:'center'}}>Start Time</Text>
              <DatePicker
      style={{width: 200, marginBottom:20, alignSelf:'center'}}
      date={this.state.StartTime}
      
      mode="Time"
     
     
      placeholder="Select Start Time"
      
      format={'h:mm: a'}
      // minDate="2016-05-01"
      // maxDate="2016-06-01"
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      duration={300}
      customStyles={{
        dateIcon: {
          position: 'absolute',
          left: 0,
          top: 4,
          marginLeft: 0
        },
        dateInput: {
          marginLeft: 36
        }
        // ... You can check the source to find the other keys.
      }}
      onDateChange={(StartTime) => {this.setState({StartTime:StartTime})}}
    />

<Text style={{  marginBottom:10,alignSelf:'center'}}>End Time</Text>
         <DatePicker
      style={{width: 200, marginBottom:20, alignSelf:'center'}}
      date={this.state.EndTime}
      
      mode="Time"
     
     
      placeholder="Select finish Time"
      
      format={'h:mm: a'}
      // minDate="2016-05-01"
      // maxDate="2016-06-01"
      confirmBtnText="Confirm"
      cancelBtnText="Cancel"
      duration={300}
      customStyles={{
        dateIcon: {
          position: 'absolute',
          left: 0,
          top: 4,
          marginLeft: 0
        },
        dateInput: {
          marginLeft: 36
        }
        // ... You can check the source to find the other keys.
      }}
      onDateChange={(EndTime) => {this.setState({EndTime: EndTime})}}
    />
         
     



      <Left>
     </Left>
     <Body>
     
       <Button 
       style={styles.Button1}
       onPress={() => this.Insert(this.state.Title, this.state.Location,this.state.StartTime,this.state.EndTime,this.state.Date)}>
       <Text>SUBMIT</Text>
       </Button>
     </Body>
     {image &&
          <Image style={styles.Image}
          source={{ uri: image }} style={{ width: Width, height: 200 }} />}
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