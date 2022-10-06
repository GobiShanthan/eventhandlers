import { Component } from "react";
import './App.css';

export default class App extends Component {

  state ={
    spiceLevel:10,
    status:''
  }



  statusChange = () =>{
    let newNum = this.state.spiceLevel
    if(newNum ===1){
      this.setState({status:'Nice'}) 
    }else if(newNum <3 && newNum >1 ){
      this.setState({status:'Start mopping your brow'})
    }else{
      this.setState({status:'A little kick'})
    }
  }




  render () {

  return (
    <div className="App">
  <h1>HELLO</h1>

    </div>
  );
}
}

