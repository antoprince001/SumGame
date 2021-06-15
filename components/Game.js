import React from 'react';
import {View, Text,StyleSheet,Button} from 'react-native';
import PropTypes from 'prop-types';
import RandomNumber from '../components/RandomNumber'
import shuffle from 'lodash.shuffle';
class Game extends React.Component {

  static propTypes = {
        randomNumberCount : PropTypes.number.isRequired,
        initialSeconds : PropTypes.number.isRequired,
        onPlayAgain : PropTypes.func.isRequired
  }
  state = {
      selectedNumbers : [],
      remainingSeconds : this.props.initialSeconds
  }
  gameStatus = 'PLAYING';
  randomNumbers = Array
                      .from ({ length : this.props.randomNumberCount })
                       .map(() => 1 +  Math.floor(10*Math.random())); 
  target = this.randomNumbers
        .slice(0,this.props.randomNumberCount - 2)
        .reduce((acc,curr) => acc+curr)

  shuffleRandomNumbers = shuffle(this.randomNumbers);
  componentDidMount(){
    this.intervalId = setInterval(()=>{
      this.setState((prevState)=>{
        return { remainingSeconds : prevState.remainingSeconds - 1 }
      },()=>{
        if(this.state.remainingSeconds === 0){
          clearInterval(this.intervalId);
       }
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  isNumberSelected = (numberIndex) =>{
    return this.state.selectedNumbers.indexOf(numberIndex) >=0 ;
  }
  selectNumber = (numberIndex) => {
    this.setState((prevState)=>{
      return { selectedNumbers : [...prevState.selectedNumbers, numberIndex]};
    });
  }
  gameStatus = ()=>{
    const sumSelected = this.state.selectedNumbers.reduce((acc,curr)=>{
      return acc+this.shuffleRandomNumbers[curr];
    },0);
    console.log(sumSelected);
    if(this.state.remainingSeconds === 0){
      return 'Lost';
    }
    if(sumSelected < this.target){
      return 'PLAYING';
    }
    if(sumSelected ==  this.target){
      return 'WON';
    }
    if(sumSelected > this.target){
      return 'LOST';
    }

  } 
  render() {
    const gameStatus = this.gameStatus();
    return (
    <View style={styles.container} >
        <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>{this.target} </Text>
        <View style={styles.randomContainer}>
        { this.shuffleRandomNumbers.map((randomNumber,index)=>
         <RandomNumber 
          key={index} 
          id = {index}
          number ={randomNumber}  
          isDisabled={this.isNumberSelected(index) || gameStatus !== 'PLAYING'} 
          onPress={this.selectNumber}
          />  )}
        </View>
        <Text style={styles.timer}>Game ends in {this.state.remainingSeconds}</Text>
        {
          this.gameStatus !== 'PLAYING' && (
        <Button title="Play Again" onPress={this.props.onPlayAgain} />
          )}
    </View>    
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    flex: 1,
    paddingTop : 30,
  },
  target : {
      fontSize : 40,
      margin : 50,
      textAlign : 'center'
  },
  randomContainer : {
      flex : 1,
      flexDirection : 'row',
      flexWrap : 'wrap',
      justifyContent : 'space-around'
  },

  STATUS_PLAYING : {
    backgroundColor : 'cyan',
  },
  STATUS_WON : {
    backgroundColor : 'green',
  },
  STATUS_LOST : {
    backgroundColor : 'red',
  },
  timer : {
    fontSize : 20,
    margin : 50,
    textAlign : 'center'
},


});
export default Game;