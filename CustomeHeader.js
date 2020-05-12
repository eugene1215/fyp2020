/*import React,{Component} from'react';
import {Text, View,SafeAreaView, Image,TouchableOpacity,ScrollView} from 'react-native';
import {image} from './images/ImagePath';

export default class CustomHeader extends Component{
    render(){

    return(
        
        <View style={{flexDirection:'row', heigh:50}}>
            {
                isHome?
                <View style={{flex:1, justifyContent:'center'}}>
                <Image style={{width:30, height:30, marginLeft:5}}
                source={require(image.IconMenu)}
                resizeMode="contain"
                />            
                </View>
                :
                <TouchableOpacity style={{flex:1, justifyContent: 'center', alignItems: 'center'}}
                onPress ={()=>navigation.goBack()}
                >
              
                    <Image style={{width:25,height:25, marginLeft:5}}
                    source={require('./images/back.png')}
                        resizeMode="contain"
                        />
                     <Text>Back</Text>
                     </TouchableOpacity>
            }
          
     <View style={{flex:1.5, justifyContent:'center'}}> 
         <Text style={{textAlign:'center'}}>Title</Text>
         </View>
    <View style={{flex:1}}>
       

    </View>
    </View>
    );

    }
}*/