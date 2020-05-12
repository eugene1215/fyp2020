import  React,{Component} from 'react';
import { StyleSheet,SafeAreaView,TouchableOpacity,TextInput,
  Image,Dimensions,Text,Content,Button,Alert, TouchableHighlight,
  FlatList, KeyboardAvoidingView,Animated} from 'react-native';
import firebase from 'firebase';
import db from '../api';
import {  View } from 'native-base';
import{AntDesign, Ionicons} from "@expo/vector-icons";
import{Swipeable} from 'react-native-gesture-handler';
import { colors } from 'react-native-elements';

var arr=[];
var result;
var numOfTrue
var num;
export class TodoDetailScreen extends Component{
  constructor(props) {
    super(props);
    
     this.itemsRef = this.getRef();
     this.taskCount = this.getTaskCountRef();
      this.completedCount =this.getCompletedRef();
    //  this.completedCount = this.getCompletedCountRef();
     //this.subsCount = this.getRefSubCount();
    // this.subRef= this.getRefSub();
    //lists=Todo
    //todos=subs
    this.state={ 
      taskCount:0,
      completedCount:0,
      numOfTrue:0,
      
      
     
              }
}
 state={

      newTodo:"",
      lists:"",
      Sub:null,
      itemRef:[],
      num:0
     
    
  };

   toggleTodoCompleted  (index,sub,item) {
     var sub =!sub.completed;
     var  _key=item._key;
     var id=item.subId
     var userId = firebase.auth().currentUser.uid;
     firebase.database().ref('Todo/subs').child(userId).child(_key).update({completed:sub})
    
     //firebase.database().ref('Todo/subs').child(userId).child(id).child(_key).update({completed:sub})
      //firebase.database().ref('Todo/subs').child(userId).child(_key).remove()
    
  } 



/*   Back(item){
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
        {text: 'OK', onPress: () => firebase.database().ref('Todo/').child(userId).child(item._key).remove()
         &&this.props.navigation.navigate('TodoList'),
       
        },
        
      ],
      {cancelable: false},//{action: this.props.navigation.navigate('TodoList')}
    
    
    )
   
  } */
  renderTodo (item,index){
 
    var sub =item.Sub
    var completed =item.completed
    return(
      <Swipeable renderRightActions={(_,dragX)=>this.rightActions(dragX,index,item)}>
      <View style={styles.todoContainer}>
    
         <TouchableOpacity onPress={()=> this.toggleTodoCompleted(index,sub,item)}> 
        <Ionicons name={completed?"ios-square":"ios-square-outline"} 
        size={30} color='gray' style={{width:30}}/>
      
              </TouchableOpacity> 
                <Text
                  style={[
                            styles.todo,
                            {
                              textDecorationLine:item.completed?"line-through": "none",
                              
                            }
                  ]}>
        {item.Sub}
      
                </Text>
                <Text></Text>
      </View>
      </Swipeable>
    )
  } 
  rightActions =(dragX,index,item)=>{
    const scale =dragX.interpolate({
      inputRange: [-100,0],
      outputRange:[1,0.9],
      extrapolate:"clamp"
    });
    const opacity = dragX.interpolate({
      inputRange:[-100,-80,0],
      outputRange:[1,0.9,0],
      extrapolate:"clamp"
    })
   
    return(
      <TouchableOpacity onPress={()=> this.deleteTodo(index,item)}>
        <Animated.View style={[styles.deleteButton,{opacity:opacity}]}>
          <Animated.Text style={{color:'#FFFFFF',fontWeight:"600", transform:[{scale}]}}>
            Delete
          </Animated.Text>
        </Animated.View>
      </TouchableOpacity>
    );
  };
 
  deleteTodo= (index,item)=>{
        var _key= item._key
        var id = item.subId
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
        {text: 'OK', onPress: () => firebase.database().ref('Todo/subs').child(userId).child(_key).remove()
        },
        
      ],
      {cancelable: false},//{action: this.props.navigation.navigate('TodoList')}
    
    
    )

  
  }





  Insert(Sub,subId,_key){
    if (Sub!=""&&Sub!=null){
     // _key=this.setState({_key});
      var completed= false;
      const {currentUser}= firebase.auth()
      this.setState({currentUser})
      var ref =firebase.database().ref('Todo/')
      var reff= ref.child('/subs')
      var refff = reff.child(currentUser.uid)
      //var reffff =refff.child(subId)
      refff.push({
         //uid:currentUser.uid,
        //CreatedBy:firebase.database.ServerValue.TIMESTAMP, 
        Sub:Sub,
        subId:subId,
        completed:completed
      }).then(()=>{
    this.setState({
      Sub:null,
      subId:null
    
      })
        }).catch((error)=>{
          console.log(error)
        });
      }
      else{
        alert('Please Input The Sub Task !!')
      }
      }
 componentDidMount(){
this.getItems(this.itemsRef);
//this.getRemainingCount(this.subsCount)
this.getTaskCount(this.taskCount);
this.getCompletedCount(this.completedCount)
// this.getCompletedCount(this.completedCount);
//this.toggleTodoCompleted()

} 

/* componentWillMount(){
  // this.count();
  //this.toggleTodoCompleted()
} */

 getItems(itemsRef){
  itemsRef .on('value',(snap)=>{
    let items = [];

      snap.forEach((child) =>{
      items.push({
        Sub:child.val().Sub,
       // CreatedBy:child.val().CreatedBy, Goal:child.val().Goal,
        subId:child.val().subId,
        _key:child.key,
        completed:child.val().completed
        
      });

    });
    //var CreatedBy = new Date (CreatedBy.seconds*1000);
    this.setState({
      itemDataSource: items
  });


 });
} 
getTaskCount(taskCount){
  const {item} = this.props.route.params
  var todoKey = item.Id;
  taskCount.on("value",snapshot=>{
    // var a 
    var countSource = snapshot.numChildren();
    this.setState({taskCount:countSource})
  }
  )}
  getCompletedCount(completedCount){

    completedCount.on("value", snap=>{
      const {item} = this.props.route.params
      var todoKey = item.Id;
      var countSource = snap.numChildren();
      if(snap.subId == todoKey){    this.setState({completedCount:countSource})}
  
    })
  }
  getCompletedRef(){
    const {item} = this.props.route.params
    var todoKey = item.Id;
    var userId = firebase.auth().currentUser.uid;
    return  firebase.database().ref('Todo/subs').child(userId).orderByChild("completed").equalTo(true)
           
  }

  count=()=>{
    const {item} = this.props.route.params
    var todoKey = item.Id;
    var userId = firebase.auth().currentUser.uid;
    console.log("some thing worng"+todoKey)
    // console.log(array)
  firebase.database().ref('Todo/subs').child(userId).child(todoKey).on('value',function(snapshot){
      snapshot.forEach((child) =>{ 
      arr.push(child.val().completed);
     
         numOfTrue  = arr.filter(function(x){ return x === true; }).length;

            console.log("fuck a "+numOfTrue )
            // console.log("key"+todoKey)  
           // console.log("num"+num)
           return true;

       })
  });
 this.setState({
   numOfTrue:numOfTrue,
  //  numOfTrue:null
          })
  }

getRef=()=>{
 const {item} = this.props.route.params
  // var todoKey = "_teclv160e";
  //var todoKey = r;
  var todoKey = item.Id;
  var userId = firebase.auth().currentUser.uid;
  //var ref = firebase.database.ref('Todo/'+ userId).child('/subs')
  // var refercence= ref.orederByChild(subId).equalTo(todoKey)
  var ref = firebase.database().ref('Todo/subs');
  var refff =  ref.child(userId).orderByChild("subId").equalTo(todoKey)
 // var reffff = refff.orderByChild('subId');
  // var result = refff.child(todoKey)

 return refff;
}
 getTaskCountRef(){
  const {item} = this.props.route.params
  const todoKey =item.Id
  var userId = firebase.auth().currentUser.uid; 
   var ref = firebase.database().ref('Todo/subs').child(userId).orderByChild("subId").equalTo(todoKey)
   return ref
} 

  render(){
    const {item} = this.props.route.params
    const { Width } = Dimensions.get('window');
    var id = item.Id
    const _key= item._key;
  var userId = firebase.auth().currentUser.uid;
  var todoKey = item.Id;

 

  
 
  
    return(
      <KeyboardAvoidingView style={{flex:1}} behavior= "padding">
      <SafeAreaView style={styles.container}>
    
      {/*  
 <Button 
      title="Delect"    
      color="blue"
       onPress={() => this.Back(item)
      //.then(()=>{this.props.navigation.navigate('TodoList')})
      }/> 
</View>  */}
   
<View style={styles.section,styles.header}>
  <View>
 {/*  <Button 
  title="@@"
  onPress={()=>this.count()} /> */}
  <Text style={styles.title}>
   

  {item.Goal}
</Text>
<Text>
{/* {item.Id+'\n'} */}
{/* {this.state.completedCount}
of */}
{/* {this.count()} */}
{/* {this.state.completedCount}{" "} */}
   {this.state.taskCount } tasks   #{item.Type}
  </Text>

   
  </View>
{/*   <TouchableHighlight
  style={{}}
    onPress={()=>{this.props.navigation.navigate('Graph',{
    completedCount:this.state.completedCount,
    taskCount:this.state.taskCount})} } >
       <Text> Graph</Text> 
       </TouchableHighlight> */}
</View>


 <View style={styles.section,{flex:0.75,marginTop:-5, padding:1,marginVertical:16}}>
 <FlatList
  data={this.state.itemDataSource}
  renderItem={({item,index})=> this.renderTodo(item,index)}
  keyExtractor={(_,index)=> index.toString()}
  contentContainerStyle={{paddingHorizontal:32, paddingVertical:64}}
  showsVerticalScrollIndicator = {false}
  /> 

</View>

<View style={styles.section,styles.footer}>
<TextInput style={[styles.input,{borderColor:"#6B38FB"}]} onChangeText={(Sub) =>this.setState({Sub})} />
      <TouchableOpacity style={[styles.addTodo,{backgroundColor:"#6B38FB"}]}>
        <AntDesign name="plus" size={16} color={"#FFFFFF"} onPress ={()=>this.Insert(this.state.Sub,id,_key)}></AntDesign>


      </TouchableOpacity>
   
</View>
     

</SafeAreaView>
</KeyboardAvoidingView>

    );
  }
}




    const styles = StyleSheet.create({ 
      deleteButton:{
        flex:1,
        backgroundColor:"#f20707",
        alignItems:"center",
        justifyContent:"center",
        width:60,
        height:10

      },
      
      container: {
        flex: 1,
        // justifyContent:"center",
        // alignItems:"center",
        
        
      },
      section:{
        flex:1,
        alignSelf:"stretch"
      },
      keyboard:{
        flex:0.5,
        marginTop:1,
        paddingTop:0
        
      },
      text:{
        marginBottom:20,
      },
      Image:{
        flex:2,
        justifyContent: 'center',
        marginLeft:10,
        alignSelf:"center",
    },
          section:{
            flex:1,
            alignSelf:"stretch",
            marginTop:10,
            marginBottom:1
          },
          header:{
            marginTop:5,
            justifyContent:"flex-end",
            marginLeft:60,
            borderBottomWidth:2,
          },
          borderBottomColor:{
            color: "black"
          },
          fab: {
            position: 'absolute',
            margin: 16,
            right: 0,
            bottom: 0,
          
          },
          title:{
            fontSize:20,
            fontWeight:"300",
            color: "black",
            marginBottom:5
          },
          footer:{
            paddingHorizontal:30,
            flexDirection:"row",
            alignItems:"center",
            marginBottom:20,
            marginVertical:16
            // justifyContent:"center",
           
          },
          input:{
            flex:1,
            height:48,
            borderWidth:2,
            borderRadius:6,
            marginRight:5,
            paddingHorizontal:8,
            

          },
          addTodo:{
            // flex:0.1,
            borderRadius:4,
            padding:16,
            alignItems:"center",
            justifyContent:"center",
            // height:60,
          },
          todo:{
          
            fontSize:16,
            fontWeight:"700",

          
          },
          todoContainer:{
            paddingVertical:16,
            flexDirection:"row",
            alignItems:"center",
            paddingLeft:32
          }
      });
   