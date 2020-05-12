import  React,{Component} from 'react';
import { StyleSheet,SafeAreaView,TouchableOpacity,Image,
  Dimensions,FlatList,VirtualizedList,Text , View, Alert,Button} from 'react-native';
import { Rating, SearchBar ,Avatar  } from 'react-native-elements';
import {CustomHeader} from '../index';
import firebase from 'firebase';
import db from '../api';
import { FAB } from 'react-native-paper';
import CardList from "react-native-card-animated-modal";
import { Footer } from 'native-base';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const { height } = Dimensions.get("window");
const now = new Date();


export class HomeScreen extends Component{
  static navigationOptions = { header: null }
  constructor(props) {
    super(props);
    this.state = {
      itemDataSource : [],
      loaded: true,
      search:"",
     
    }
    this.itemsRef = this.getRef();
    this.pressRow = this.pressRow.bind(this);
   // this.renderRow = this.renderRow.bind(this);
}
getRef()
{return firebase.database().ref('Post/All').orderByChild('CreatedBy');}



componentDidMount(){
  this.getItems(this.itemsRef);
} 


pressRow(item){this.itemsRef.child(item._key).remove();}


getItems(itemsRef){
  itemsRef.on('value',(snap)=>{
    let items = [];
        snap.forEach((child) =>{
       items.push({
        Title:child.val().Title,
        Detail:child.val().Detail,
        CreatedBy:child.val().CreatedBy,
        Image : child.val().Image,
        Rating:child.val().Rating,
        Email:child.val().Email,
        _key:child.key
        
      });

    });
    this.setState({itemDataSource: items});


 });

}
 /*  renderButton(item,userId){
    var postId =item._key
    var userId = firebase.auth().currentUser.uid;
    // var userId = firebase.auth().currentUser.uid;
    if(userId==item.Uid){
      alert(userId)
}
else alert(userId)
  
   
    
   
  }  */

  render(){
    const {image, abc,search} = this.state

    return(
     
      <SafeAreaView style={{flex:1}}>
 
     {/*    <SearchBar 
          value={search}
          onChangeText={this.updateSearch()}
          placeholder="Search by email"
          /> */}

            <CardList
              listProps={{
                ListHeaderComponent: () => (
                  <View style={{ padding: 16, paddingBottom: 0 }}>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "rgba(0, 0, 0, 0.5)"
                      }}
                    >
                      {now.toDateString()}
                    </Text>
                    <Text 
                    style={{ fontSize: 20, fontWeight: "bold" }}>
                      Today's News</Text>
                      <Text 
                    style={{ fontSize: 20, fontWeight: "bold" }}>
                      Hello </Text>
                  </View>
                )
              }}
              data={this.state.itemDataSource.reverse()}
              detailsContainerStyle={{ borderRadius: 5,marginTop:50 }}
              cardContainerStyle={{ borderRadius: 10 }}
             // cardContainerStyle={{}}
              renderItem={({ item, index }) => 
               {
                //Render card per item 
                if (item.renderItem) return item.renderItem({ item , index });
              
              // Default card when not specified 
                return (
                  <View>
                  <View
                    style={{
                      width: "100%",
                      padding: 8,
                     //paddingVertical:50,
                    //  paddingBottom:10,
                   
                      backgroundColor: "rgb(255, 255, 255)"
                    }}
                  >
                     <Image source={{uri:item.Image} }
                    style={{
                            width: "100%",
                            height: height * 0.25,
                            resizeMode:"contain"
                          }}/>
                        <Text></Text>
                    <Text
                      style={{
                        fontSize: 20,
                        marginBottom: 5,
                        marginLeft:12,
                        fontWeight: "bold",
                        color: "rgba(0, 0, 0, 0.5)"
                      }}
                    >
                   
                 {item.Title}
                    </Text>
                  
                    <Text
                      style={{
                        fontSize: 26,
                        maxWidth: "60%",
                        fontWeight: "bold",
                        color: "rgb(51, 51, 51)"
                      }}
                    >
                      
             
                    </Text>
                 
                  </View>
                </View>
                );
              } 
            }
            renderDetails={({ item, index }) => (
              /* You can also provide custom content per item */
              <View style={{ paddingVertical: 15, paddingHorizontal: 18 }}>
                  <Avatar
                      rounded
                      activeOpacity={0.7}
                      icon={{name: 'user', type: 'font-awesome'}}
                      onPress={() => Alert.alert('Poster : ',item.Email)}
                      size="medium"/>
                  <Text style={{marginTop:5,color:"gray"}}>{item.Email}</Text>

                  <Text style={{ color: "rgba(0, 0, 0, 0.7)", fontSize: 20 ,marginTop:10,alignSelf:"center"}}>
                   
                   {item.Detail}
                 </Text>
                <Text style={{marginTop:5}}> {Date(item.CreatedBy)}</Text>
                 <Text style={styles.footer}>
                  
                   --------------------------------</Text>
               </View>
               


               
             
    
            
            )}

            />

 <FAB
    style={styles.fab}
    small
    icon="plus"  
    color='white'
    //label='ADD'
    // loading= "true"
    onPress={() =>  this.props.navigation.navigate('AddPost')}
  />
      
        </SafeAreaView>
    );
  }
}




    const styles = StyleSheet.create({ 
      
      fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      
      },
      footer:{
        marginTop:10,
        justifyContent:"center",
        //borderWidth:1,
        alignSelf:"flex-end",
        borderBottomWidth:2,
        marginLeft:40,
        color:"black",
       // backgroundColor:"gray"
      },
          fabIcon: { 
            fontSize: 40, 
            color: 'white' 
          },
          container:{
            flex:3,
            backgroundColor:"#EFECF4"
          },
          Card:{
            marginBottom:50,
            padding:0,
          },
          Rating:{
            marginBottom:15,
            marginLeft:15
          },
          CardContent:{
           fontSize:100,

          }
          
      });
        {/* <CardView
  cardElevation={5}
  //cardMaxElevation={2}
  cornerRadius={5}>  
    
      <FlatList
          style={styles.flatlist}
         // data={this.state.itemDataSource}
          data={this.state.itemDataSource.reverse()}
          keyExtractor={item=>item._key}
          refreshing = {true}
          //inverted  = {false}
          enableEmptySections={true}
          initialNumToRender ={5}
          initialListSize= {2}
          // ListFooterComponent = {this.state.renderFooter}
          // onEndReached={()=> this.getMore()}
          // renderItem={({item, index})=>
        
                   <Card style={styles.Card}
                  isDark = {false}
              >

                <CardImage 
                  //resizeMethod="resize"
                  resizeMode="auto"// s
                  source={{uri: item.Image}}
                />
                <CardTitle 
                  title={abc}
                  subtitle={item.Email}
                />
                <Rating
                imageSize={15}
                readonly
                startingValue={item.Rating}
                style={ styles.Rating }
              />
                <CardContent 
                text={item.Detail}
                style={styles.CardContent}
                />
              <CardButton
                  onPress={() =>this.pressRow()}
                    title="Delect Post"
                    color="#1E90FF"
                  /> 
                <CardAction 
                  separator={true} 
                  inColumn={false}>
                </CardAction>
              </Card> 
              
      
              
             
                   //     }
          />
            </CardView>  */}
   