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
 var r;
 var i;
export class AddPostScreen extends Component{
////////////////////////   

    constructor(){
        super();
       this.state = {
           Title:"",
           Detail:"",
           currentUser: null,
           image: null,

         // for storing data from db
           };
    }

    componentDidMount() {
        this.getPermissionAsync();
     
      }
         
       getPermissionAsync = async () => {
        if (Constants.platform.ios) {
          const { status,permissions} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
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
    
        console.log(result.base64);
        console.log("123123"+result.uri);
    
        if (!result.cancelled) {
          this.setState({ image: result.uri});
         // console.log("uri"+result);
        
          i= result.uri;
        }
       
      };
       


/* 
ratingCompleted(rating) {
    console.log("Rating is: " + rating)
    
    r =rating
  } */
   
////////////////////////   
Insert(Title,Detail){
    const {currentUser}= firebase.auth()
    this.setState({currentUser})
    //var rat = r;
    var image =i;
    var ID = '_' + Math.random().toString(36).substr(2, 9);
    // image = 'data:image/jpeg;base64,' +image
//console.log("2222222"+image)
   // console.log("hhhhhhhhhhhhhhhh"+image)
    
  
    firebase.database().ref('Post/All').push({
       //firebase.database().ref('Post/All').child(curentUser.uid)
       //use uid as 
       
        Title:Title,
        Detail:Detail,
        CreatedBy:firebase.database.ServerValue.TIMESTAMP,
       // Rating:rat,
        Image:image,
        Uid:currentUser.uid,
        Email:currentUser.email,
        Id:ID
    }).then(()=>{
      this.setState({
        Title:null,
        Detail:null,
       // Rating:0,
        Image:null,
        isSubmited:true,
       })
    }) .catch((error)=>{ 
      console.log(error)
    });
  }

   _togglePostCard(){
    this.setState({
    isSubmited:false
    })
    }
 
render(){
    const {currentUser,image} = this.state
    const { Width } = Dimensions.get('window');
    
    return(
      
        <Container>
        <Content style={styles.Content}>
        {this.state.isSubmited ?
             <View style={styles.View}>
                   <Text style = {{flex:1,fontSize:30,alignSelf:'center',
                alignItems:'center'}}>Submittion Successful</Text>
                 <Icon active name="ios-checkmark-circle-outline" style={{fontSize:300, color:'#4CAF50',
                marginLeft:5, marginRight:10,alignSelf:'center',
                alignItems:'center'}}/>
           
        </View>
        
        :
   
   
    <View style={styles.View}>
    <Text>
        </Text>
        <Form>
        <Item floatingLabel last style={styles.Item}> 
            <Label >Title</Label>
            <Input onChangeText={(Title) =>this.setState({Title})}/> 
        </Item>
<Text></Text>
    <Card style={{width: "80%",alignSelf:"center"}}>
            <Label style={{marginLeft:10}}>Share Your Story</Label>
            <Textarea rowSpan={5} onChangeText={(Detail) =>this.setState({Detail})}/>
            </Card>
        <Text></Text>
<Text></Text>
    {/* 
            <Label style={{alignSelf:"center"}}>How's Your day ? </Label>
       <AirbnbRating

        defaultRating={0}
        style={{ paddingVertical: 20 ,marginLeft:30}}
        size={20}
        onFinishRating={ this.ratingCompleted }
 
        />  */}
         <Text></Text> 
   
    <Text></Text> 


 
       <Button style={styles.Button1}
            bordered bordered
            onPress={this._pickImage}
        >
             <Text style={{ textAlign:'center'}}>Pick Image or GIF</Text> 
        </Button> 
<Body>
        
         <Button style={styles.SubmitButton}
           
            bordered bordered
            onPress={() => this.Insert(this.state.Title, this.state.Detail)}>
                <Text style={{textAlign:'center',color:"green"}}> Sumbit</Text>
         
        </Button>
        </Body>
     {image &&
            <Image style={styles.Image}
            source={{ uri: image}} style={{ width: Width, height: 200 }} />} 


  </Form>
  </View>
}
</Content>

</Container>
       );
    }}
    const styles = StyleSheet.create({
            Item:{
             width: "80%",
             alignSelf:"center"
      },
            Image:{
                flex:2,
                justifyContent: 'center',
                marginLeft:10,
                alignSelf:"center",
            },
            Button1:{
                marginBottom:20,
                alignSelf:'center',
                
        },

            SubmitButton:{
              alignSelf:'center',
              borderColor:'green',
             
            },
            View:{
                flex:1,
                flexDirection: 'column',
                alignItems: 'stretch',
              
            }

    })