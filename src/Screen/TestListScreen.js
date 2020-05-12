/* import  React,{Component} from 'react';
import { StyleSheet,SafeAreaView,
    Modal,Text,View,TouchableOpacity,Dimensions} from 'react-native';
// import { List } from 'react-native-paper';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import CardView from 'react-native-cardview'
import { FadeOutToBottomAndroidSpec } from 'react-navigation-stack/lib/typescript/src/vendor/TransitionConfigs/TransitionSpecs';
import { render } from 'react-dom';

const { width: width, height: viewportHeight } = Dimensions.get('window');

// export  class TestListScreen extends Component {


export default TestListScreen = ({list})=>{
state={
    showListVisable :false
}
const completedCount = list.todos.filter(todo => todo.completed).length;
const remainingCount = list.todos.length - completedCount;
// const list =this.props.list;

toggleListModal=()=>{
  this.setState({showListVisable: !this.state.showListVisable});
} 


    return(
        <SafeAreaView style={{flex:1}}>
      <View>
          <Modal 
          visable={this.state.showListVisable}
         // onRequestClose={()=> this.toggleListModal()}
          animationType="slide">
              <View>
                  <Text>
                      List
                  </Text>
              </View>
          </Modal>
      </View>

     <TouchableOpacity 
    // onPress={() =>this.toggleListModal()}
     >
 <Card  style={styles.Card}>
 


     <CardContent 
 text={'Task: ' + remainingCount
        +'\n'+ ''+'\n'+
        'Completed: '+ completedCount
      } 
 textStyle={styles.text}
 />

 </Card> 
 </TouchableOpacity>
    </SafeAreaView>
)

};
    */      
/* 
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
    textAlign:'center',
    marginBottom:0,
    paddingTop:1,
    textTransform:"capitalize",
    textDecorationStyle: "solid",
    color:'white',
  },
  title:{
    fontSize:20,
    fontWeight:'700',
    textAlign:'center',
    
    //paddingBottom:20,
    padding:20
    
  },

  Card:{
    backgroundColor:'#6200EE',
    margin:10,
    paddingVertical:15, //y lenght of card
    paddingHorizontal:5,//space of every card
    borderRadius:6,
    marginHorizontal:15,
    alignItems:'center',
    width:200,
    marginVertical:20


  
  },

  
  
});
 */