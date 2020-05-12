import  React,{Component} from 'react';

     
import {  View,Text,StyleSheet,SafeAreaView,TouchableOpacity,Image,
        ScrollView } from 'react-native';
import {IMAGE} from './images/ImagePath';
export class CustomDrawContent extends Component{
    render() {
       //let navigation = this.props
       
        return (
         
            <SafeAreaView style={{flex:1}}>
                <View style={{ flex:0, alignItems: 'center', justifyContent: 'center' ,marginTop:20}}>
                {/* <Image source={IMAGE.ICON_PROFILE} */}
                {/* style={{height:120,width:120,borderRadius:60}}/> */}
                </View>
            <ScrollView style={{marginLeft:1,flex:0}}>

                        <TouchableOpacity
                            style={{marginTop:20}}
                            onPress={()=> this.props.navigation.navigate('Home')}
                        >
                        <Text 
                        style={{ flex:1, alignItems: 'center', justifyContent: 'center' ,
                        marginTop:20,textAlign:'center'}}
                        >Home</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{marginTop:20}}
                            onPress={()=>this.props.navigation.navigate('TodoList')}
                        >
                        <Text 
                        style={{ flex:1, alignItems: 'center', justifyContent: 'center' ,
                        marginTop:20,textAlign:'center'}}
                        >Todo</Text>
                        </TouchableOpacity>

                        
                      {/*   <TouchableOpacity
                            style={{marginTop:20}}
                            onPress={()=>this.props.navigation.navigate('Notification')}
                        >
                        <Text 
                        style={{ flex:1, alignItems: 'center', justifyContent: 'center' ,
                        marginTop:20,textAlign:'center'}}
                        >Notification</Text>
                        </TouchableOpacity>
 */}

                        
            </ScrollView>
            </SafeAreaView>
        )
}
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    
    },
    content:{
        fontSize:10
    }


})

