import React from 'react';
import Game from './components/Game';
import { Text,StyleSheet,Image,View} from 'react-native';


class App extends React.Component {

  constructor(){  
    super();  
    this.state={  
    isVisible : true,  
    gameId : 1
   }  
 } 

 Hide_Splash_Screen=()=>{  
  this.setState({   
    isVisible : false   
  });  
}  

componentDidMount(){  
  var that = this;  
  setTimeout(function(){  
    that.Hide_Splash_Screen();  
  }, 4000);  
 }  
 
  resetGame = () => {
    this.setState((prevState)=>{
      return { gameId : prevState.gameId + 1 }
    });
  }
  render() {

    let Splash_Screen = (  
      <View style={styles.SplashScreen_RootView}>  
          <View style={styles.SplashScreen_ChildView}>  
                <Image source={ require('./joystick.png') }
             style={{width:'60%', height: '60%', resizeMode: 'contain'}} />  
         </View>  
      </View> )  
    return (
      <View style = { styles.MainContainer }>  
      <Text style={{textAlign: 'center'}}> Sum Game </Text>  
       {  
        (this.state.isVisible === true) ? Splash_Screen :  <Game key={this.state.gameId} onPlayAgain={this.resetGame} randomNumberCount={6}  initialSeconds={10} />  
      }  
     </View>  
   );
  }
}


const styles = StyleSheet.create(  
  {  
      MainContainer:  
      {  
          flex: 1,  
          justifyContent: 'center',  
          alignItems: 'center',  
          paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0  
      },  
     
      SplashScreen_RootView:  
      {  
          justifyContent: 'center',  
          flex:1,  
          margin: 10,  
          position: 'absolute',  
          width: '100%',  
          height: '100%',  
        },  
     
      SplashScreen_ChildView:  
      {  
          justifyContent: 'center',  
          alignItems: 'center',  
          backgroundColor: '#00BCD4',  
          flex:1,  
      },  
  }); 


export default App;
