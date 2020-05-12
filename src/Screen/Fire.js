import firebase from 'firebase'

class Fire {
    constructor(){
        this.init()
        this.checkAuth()
    }

     init=() => {
         if (!firebase.apps.length){
             firebase.initializeApp({
                apiKey: "AIzaSyAf848ciDWw0XmLCEq74YG-Wafg5aGPmUg",
                authDomain: "fypp-962d4.firebaseapp.com",
                databaseURL: "https://fypp-962d4.firebaseio.com",
                projectId: "fypp-962d4",
                storageBucket: "fypp-962d4.appspot.com",
                messagingSenderId: "724501644635",
                appId: "1:724501644635:web:c6e7c3d99700a24d7d867e",
                measurementId: "G-FCHC3H20YL"
             });
         }
     };
     checkAuth =() => {
         firebase.auth().onAuthStateChanged(user => {
             if(!user){
                 firebase.auth().signInAnonymously();
             }
         });
     };

     send = messages =>{
         messages.forEach(item => {
             const message ={
                 text: item.text,
                 timestamp: firebase.database.ServerValue.TIMESTAMP,
                 user: item.user
             };
             this.db.push(message)
         });
};

parse =message => {
    const {user, text, timestamp} = message.val();
    const {key:_id} = message 
    const createdAt= new Date(timestamp)

    return{
        _id,
        createdAt,
        text,
        user
    };
};

get = callback => {
    this.db.on("child_added", snapshot => callback(this.parse(snapshot)));
};
off(){
    this.db.off();
}
   get db(){
       return firebase.database().ref("messages");
   }

   get uid(){
       return (firebase.auth().currentUser || {}).uid;
   }
}

export default new Fire();