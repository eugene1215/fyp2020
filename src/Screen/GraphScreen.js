import  React,{Component} from 'react';
import { SafeAreaView,Dimensions,
  ScrollView ,StyleSheet,FlatList,View,Text } from 'react-native';
import {CustomHeader} from '../index';
import db from '../api';
 import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit"; 
import { Container, Right,Card } from 'native-base';
import { Avatar, Button, Title, Paragraph } from 'react-native-paper';
import firebase from 'firebase';
import { ThemeConsumer } from 'react-native-elements';
const screenWidth = Dimensions.get("window").width;
// const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
//var userId = firebase.auth().currentUser.uid;


export class GraphScreen extends Component{
  constructor(props) {
    super(props);
    this.state={ 
   num:0
   }
   this.itemsRef = this.getRef();
   this.studyRef = this.getStudyRef();
   this.examRef = this.getExamRef();
   this.assignmentRef =this.getAssignmentRef();
   this.socialRef = this.getSocialRef();
   this.healthRef = this.getHealthRef();
    this.allRef = this.getReff();
    this.comRef = this.getComRef();
}
componentDidMount(){
  this.getItems(this.itemsRef);
  this.getStudy(this.studyRef);
  this.getExam(this.examRef);
  this.getSocial(this.socialRef);
  this.getHealth(this.healthRef);
  this.getAssignment(this.assignmentRef);
  this.getAll(this.allRef);
  this.getCom(this.comRef);
/*   const {taskCount,completedCount} =this.props.route.params
this.setState({
  taskCount:taskCount,
  completedCount:completedCount,
}) */
  //this.getAllCompleted(this.allRef);
}
getRef(){
  var userId = firebase.auth().currentUser.uid;
  return  firebase.database().ref('Todo/TodoList').child(userId)
}
getItems(itemsRef){
  itemsRef.on("value",snap=>{
    var countSource = snap.numChildren();
    this.setState({taskCount:countSource})
  })
}
///////////////////////////////////////////////////////////////////////////
getStudyRef(){
  var userId = firebase.auth().currentUser.uid;
  return  firebase.database().ref('Todo/TodoList').child(userId).orderByChild("Type").equalTo("Study")
}


getStudy(studyRef){
  studyRef.on("value",snap=>{
    var countSource = snap.numChildren();
    this.setState({studyCount:countSource})
  })
}
////////////////////////////////////////////////
getExamRef(){
  var userId = firebase.auth().currentUser.uid;
  return  firebase.database().ref('Todo/TodoList').child(userId).orderByChild("Type").equalTo("Exam")
}


getExam(examRef){
  examRef.on("value",snap=>{
    var countSource = snap.numChildren();
    this.setState({examCount:countSource})
  })
}
//////////////////////////////////////////////////


getAssignment(assignmentRef){
  assignmentRef.on("value",snap=>{
    var countSource = snap.numChildren();
    this.setState({assignmentCount:countSource})
  })
}

getAssignmentRef(){
  var userId = firebase.auth().currentUser.uid;
  return  firebase.database().ref('Todo/TodoList').child(userId).orderByChild("Type").equalTo("Assignment")
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
getSocial(socialRef){
  socialRef.on("value",snap=>{
    var countSource = snap.numChildren();
    this.setState({socialCount:countSource})
  })
}

getSocialRef(){
  var userId = firebase.auth().currentUser.uid;
  return  firebase.database().ref('Todo/TodoList').child(userId).orderByChild("Type").equalTo("Social")
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////
getHealth(healthRef){
  healthRef.on("value",snap=>{
    var countSource = snap.numChildren();
    this.setState({healthCount:countSource})
  })
}

getHealthRef(){
  var userId = firebase.auth().currentUser.uid;
  return  firebase.database().ref('Todo/TodoList').child(userId).orderByChild("Type").equalTo("Health")
}

/* getAllCompleted(allRef){
  allRef.on("value",snap=>{
   var a = snap.key
   var b =snap.val();
   snap.forEach((child)=>{
    arr.push(child.val().completed)
    numOfTrue  = arr.filter(function(x){ return x === true; }).length;
   }) 
    var countSource =snap.numChildren();
    this.setState({
      allCount:countSource,
      a:a,
      b:b,
      // numOfTrue:numOfTrue
            })
  })
} */

/* getAllCompleted(allRef){
  allRef.on("value",snap=>{
    snap.array.forEach(child => {
      arr.push(child.val().completed);
      numOfTrue  = arr.filter(function(x){ return x === true; }).length;

    });
  })
  this.setState({numOfTrue:numOfTrue})
} */
/* 
getAllCompleted(allRef){
  allRef.on('value', (snap)=>{
    snap.forEach((child)=>{
      let arr =[]
      arr.push ({
        subId :child.val().subId
                });

    })

    this.setState({numOfTrue:arr});
  });

} */

getAll(allRef){
  allRef.on('value', (snap)=>{
    var count = snap.numChildren();
    this.setState({num:count});
  });

} 
getReff(){
  var userId = firebase.auth().currentUser.uid;
  return  firebase.database().ref('Todo/subs/').child(userId)
}
getComRef(){
  var userId = firebase.auth().currentUser.uid;
  return  firebase.database().ref('Todo/subs/').child(userId).orderByChild("completed").equalTo(true)
}

getCom(comRef){
comRef.on('value',(snap)=>{
  var count = snap.numChildren();
  this.setState({comNum:count})
})
}
  render(){
    // const {numOfTrue} =this.state
    // const id = numOfTrue.subId;

    const chartConfig = {
      backgroundGradientFrom: "#ffffff",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0,
      color: (opacity = 1) => `rgba(255,0,0, ${opacity})`,
      strokeWidth: 1, // optional, default 3
      barPercentage: 0,
      useShadowColorFromDataset: false // optional
    };
    const chartConfig1 = {
      backgroundGradientFrom: "#1E2923",
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: "#08130D",
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 1,
      useShadowColorFromDataset: false // optional
    };
    const data1 = [
      {
        name: "Assignment",
        population: this.state.assignmentCount,
        color: "rgba(131, 167, 234, 1)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Social",
        population:this.state.socialCount,
        color: "yellow",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Exam",
        population: this.state.examCount,
        color: "red",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Health",
        population: this.state.healthCount,
        color: "black",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      },
      {
        name: "Study",
        population: this.state.studyCount,
        color: "rgb(0, 0, 255)",
        legendFontColor: "#7F7F7F",
        legendFontSize: 15
      }
    ];
    //const { taskCount,completedCount} = this.props.route.params

    const dataa = {
      labels: [], // optional
      data: [ this.state.comNum/this.state.num]
    };
 
 
/* const dataa = {
  labels: [], // optional
  data: [ this.state.allCount]
}; */

    return(
<ScrollView 
showsVerticalScrollIndicator={false}
style={styles.scrollView}>
<Container style={{flex:1}}>

<View>
</View>
<Card>
<Text style={styles.text}>Totoal Number of ToDo: {this.state.taskCount} </Text>
<PieChart
  data={data1}
  width={330}
  height={220}
  chartConfig={chartConfig}
  accessor="population"
  backgroundColor="transparent"
  paddingLeft="5.6"
  absolute
/>
</Card>

<Card>
    <Text style={styles.text}>% of completed in your sub-task</Text>
 
<ProgressChart
  data={dataa}
  width={250}
  height={220}
  strokeWidth={16}
  radius={32}
  chartConfig={chartConfig}
  hideLegend={false}
  //paddingLeft="5.6"
/>
</Card>

</Container>
</ScrollView>
    );
  }
}


  const styles = StyleSheet.create({ 
      
    card: {
      borderRadius:6,
      elevation:3,
      backgroundColor: '#fff',
      shadowOffset: {width:2,height:2},
      shadowColor :'#333',
      shadowOpacity:0.5,
      shadowRadius:2,
      marginHorizontal:4,
      marginVertical:10
    
    },
  
    scrollView: {
      backgroundColor: '#FFFFFF',
      marginHorizontal: 2,
      
    },
    text: {
      fontWeight: "bold",
      fontSize: 15,
      textShadowRadius:10,
      textAlign:'center',
      marginBottom:15,
      paddingTop:10,
      textTransform:"capitalize",
      textDecorationStyle: "solid",
      color:'black',
  
    },
  
  })