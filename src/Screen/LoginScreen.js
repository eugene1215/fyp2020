import React,{Component} from 'react';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import { Container, Item, Form, Input, Button, Label } from "native-base";
import * as firebase from "firebase";
import { symbolName } from 'typescript';



export  class LoginScreen extends Component {


  
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }
  SignUp = (email, password) => {
    
    firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(user => { 
               console.log(user);
              // alert('seccess sign up');
              
         }).catch (err=> {
   
          alert(err.message);
        });

       

      

};
  LogIn = (email, password) => {
firebase
       .auth()
       .signInWithEmailAndPassword(email, password)
       .then(res => {
           console.log(res.user.email);
           //alert('seccess login');
           this.props.navigation.navigate('FYPdemo')
    }).catch (err=> {
   
      alert(err.message);
    });

};
  render() {
    return (
      <SafeAreaView style={{ flex: 1}}>
      {/* <Container  full rounded success style={{ marginTop: 50 }}> */}
        <Form>
      
           
            

            <Item  style={styles.item}
            floatingLabel>
                  <Label style={{fontFamily:"Times New Roman"}}>Email</Label>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={email => this.setState({ email })}
            />
           </Item>
         

<Item floatingLabel style={styles.item}>
<Label style={{fontFamily:"Times New Roman"}}>Password</Label>
            <Input
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={password => this.setState({ password })}
            />
          </Item>
          <Button  onPress={() => this.LogIn(this.state.email, this.state.password)} full rounded success style={{ marginTop: 40,width:200
            ,alignItems:"center",alignSelf:"center" ,backgroundColor:"#bab5a2"}}>
            <Text style={{ fontWeight: "bold"}}>Login</Text>
          </Button>
          <Button  onPress={() => this.SignUp(this.state.email, this.state.password)} full rounded success style={{ marginTop: 20,width:200,
            alignItems:"center",backgroundColor:"#fffdd0",alignSelf:"center"}}>
            <Text style={{fontWeight: "bold"}}>Sign Up</Text>
          </Button>


        </Form>
     
      
   
      </SafeAreaView>
    );
    
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item:{
    width:250,
    marginLeft:30,
    marginBottom:5,
    marginTop:30
  },
  label:{
    right:300,
    marginLeft:30,
    marginTop:30
  }
});