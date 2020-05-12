/* import  React,{Component} from 'react';
import {Container, Header, Left, Body, Right, Button, Icon, Title, View,
        Text,Input,  
        Item} from 'native-base';
 
import { StyleSheet,SafeAreaView,TouchableOpacity,Image } from 'react-native';

import {IMAGE} from './images/ImagePath';

export class CustomHeader extends Component{
    render(){
            let {navigation,isHome,title} = this.props
        return(

      
            <View style={{flexDirection:'row', heigh:50}}>
                <View style={{flex:1,  justifyContent:'center'}}>
                {
                    isHome ?
                    <TouchableOpacity onPress={()=>navigation.openDrawer()}>
                     <Image style={{width: 25, height: 25, marginLeft: 5}}
                    source={IMAGE.ICON_MENU}
                    resizeMode="contain"/>
                    </TouchableOpacity>
                    :            
                    <TouchableOpacity 
                    style={{flex:1, justifyContent: 'center', alignItems: 'center'}}
                    onPress ={()=>navigation.goBack()}
                    >
                  
                
                    <Text>Back 123</Text>
                    </TouchableOpacity>
                }
              </View>
         <View style={{flex:1.5, justifyContent:'center'}}> 
            <Text style={{textAlign:'center'}}>{title}</Text>
        </View>
        <View style={{flex:1}}>
           
    
        </View>
        </View>

        );
      

    }
} */