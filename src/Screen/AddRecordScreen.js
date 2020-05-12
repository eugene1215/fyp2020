import  React,{Component} from 'react';
import {Container, Header, Left, Body, Right, 
        Text,Input,List,ListItem,Content, Title,Button,Form,Icon, Card,CardItem,Textarearow ,
        Textarea,Item} from 'native-base';
import { StyleSheet,SafeAreaView,TouchableOpacity,
        Image,AlertIOS,View, Alert ,Dimensions} from 'react-native';
import {CustomHeader} from '../index';
import firebase from 'firebase';
import db from '../api'; 
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import DatePicker from 'react-native-datepicker';
import { Dropdown } from 'react-native-material-dropdown';
//var user = firebase.auth().currentUser;
//var uid=user.uid;

var i;

export class AddRecordScreen extends Component{

 constructor(){
     super();
    this.state = {
        Goal:"",
        GoalDetail:"",
        // timestamp:"",
        StartDate:"",
        EndDate:"",
        //image: null,
        currentUser: null,
        SelectedType:""

        
      // uid: currentUser.uid 
      // for storing data from db
        };
      
 }
 componentDidMount(){
  //this.getPermissionAsync();
 
}
/* getDate(){
  let timestamp = new Date();
  return timestamp.toGMTString();
} */
Insert(Goal,GoalDetail,EndDate,StartDate,SelectedType){
 if (Goal !='' && GoalDetail !=''&& EndDate!=''&&StartDate!=''&&SelectedType!=''){
  var ID = '_' + Math.random().toString(36).substr(2, 9);
  const {currentUser}= firebase.auth()
  this.setState({currentUser})
  var image =i;
  firebase.database().ref('Todo/TodoList').child(currentUser.uid).push({
    Goal:Goal,
    GoalDetail:GoalDetail,
    //Image:image,
    uid:currentUser.uid,
    CreatedBy:firebase.database.ServerValue.TIMESTAMP,
    StartDate:StartDate,
    EndDate:EndDate,
    Id:ID,
    Type:SelectedType

    
  }).then(()=>{
    this.setState({
      Goal:null,
      GoalDetail:null,
     // Image:null,
      isSubmited:true,
      StartDate:null,
      EndDate:null,
      Id:null,
      SelectedType:""
     })
  }).catch((error)=>{
    console.log(error)
  });
}
else{
  alert('There are some missing!!')
}
}

_togglePostCard(){
    this.setState({
    isSubmited:false
   })
  }
 /*  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  } */

 /*  _pickImage = async () => {
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
  */
render(){
  const {currentUser} = this.state
  const { Width } = Dimensions.get('window');
  let type=[
    {
    value: 'Assignment',
    },
    {
      value: 'Social',
    },
    {
      value: 'Exam',
    },
    {
      value: 'Health',
    },
    {
      value: 'Study',
    },
  ]
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
         onPress={() =>this.props.navigation.navigate('TodoList')}>
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
                    <Input placeholder='Input Your Goal' onChangeText={(Goal) =>this.setState({Goal})} />
                </Item>
          
            
        
                <Item style={{marginBottom:10}}>
                    <Input placeholder='The Detail of Goal' onChangeText={(GoalDetail) =>this.setState({GoalDetail})} />
                </Item>

        
                  <Dropdown
                  containerStyle={{alignSelf:"flex-end",width:110}}
                  //rippleCentered={true}
                  label='Select type'
                  data={type}
                  onChangeText={(type)=>{this.setState({SelectedType:type})}}
                  />
        


                <Text style={{ alignSelf:'center'}}>Start Date</Text>
                <DatePicker
        style={{width: 200, marginBottom:20, alignSelf:'center'}}
        date={this.state.StartDate}
        mode="date"
        placeholder="Select Start Date"
        format="YYYY-MM-DD"
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
        onDateChange={(StartDate) => {this.setState({StartDate: StartDate})}}

      />

<Text style={{  marginBottom:10,alignSelf:'center'}}>End Date</Text>
           <DatePicker
        style={{width: 200, marginBottom:20, alignSelf:'center'}}
        date={this.state.EndDate}
        mode="date"
        placeholder="Select finish Date"

        format="YYYY-MM-DD"
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
        onDateChange={(EndDate) => {this.setState({EndDate: EndDate})}}
      />
           
    {/*     <Button style={styles.Button1}
            bordered bordered
            onPress={this._pickImage}
        >
             <Text style={{ alignItems:'center'}}>Pick Image or GIF</Text> 
        </Button> */}



        <Left>
       </Left>
       <Body>
       
         <Button 
         style={styles.Button1}
         onPress={() => this.Insert(this.state.Goal, this.state.GoalDetail,this.state.StartDate,this.state.EndDate,this.state.SelectedType)}>
         <Text>SUBMIT</Text>
         </Button>
       </Body>
    {/*    {image &&
            <Image style={styles.Image}
            source={{ uri: image }} style={{ width: Width, height: 200 }} />} */}
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

 