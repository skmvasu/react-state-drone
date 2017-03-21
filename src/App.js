import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
// Build an application to operate a fleet of drones delivering goods:

// The command center sends an instruction to the drone to pickup an item from the warehouse (only one at present).

// The drone picks up the item from a designated spot (one spot only at this moment) and lifts off to the delivery address.

// After it reaches the delivery address, the drone sends an instruction back to the command center that it has reached.

// The drone unloads the item and sends an instruction back to the command center that it has unloaded the item.

// It comes back to the warehouse, reaches its parking spot, and lets the command center know that it is ready for next instruction.




// You may choose any of the following languages - Javascript, Ruby, Java, Python, Scala, Clojure, R.

// We would be looking for application design, object modeling, data modeling (if any), coding practices followed to evaluate your solution. You may want to include unit test cases to support your solution. 

// We would like the code to be version controlled using Git. Please do not upload it to bitbucket or github but instead zip the entire code repository and send it to us.

export const DroneStatus = {
  WAITING_FOR_INSTRUCTIONS: 'WAITING_FOR_INSTRUCTIONS',
  ITEM_PICKUP: 'ITEM_PICKUP',
  ARRIVED_AT_DELIVERY_ADDRESS: 'ARRIVED_AT_DELIVERY_ADDRESS',
  UNLOADED_ITEM: 'UNLOADED_ITEM',
  WAY_BACK_TO_COMMAND_CENTRE: 'WAY_BACK_TO_COMMAND_CENTRE'
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Scripbox Drone task</h2>
        </div>
        <p className="App-intro">
          
        </p>
      </div>
    );
  }
}

export default App;
