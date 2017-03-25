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
  WAITING_FOR_INSTRUCTIONS: "zzz",
  ITEM_PICKUP: "Picking up from the warehouse",
  ARRIVED_AT_DELIVERY_ADDRESS: "Knock! Knock!",
  UNLOADED_ITEM: "You've been served",
  WAY_BACK_TO_COMMAND_CENTRE: "on the way back"
};

export const PackageStatus = {
  PROCESSING: "We're processing you order",
  ITEM_PICKEDUP: "package pickedup  from the warehouse",
  ON_THE_WAY: "Should reach you soon",
  DELIVERD: "Delivered"
};

class App extends Component {
  constructor(props) {
    super(props);
    this.getInstructions = this.getInstructions.bind(this);
    this.state = {
      drone: {
        name: 'Millenium Falcon', 
        status: DroneStatus.WAITING_FOR_INSTRUCTIONS
      }, items: {
        1: {
          name: 'Light saber',
          status: PackageStatus.PROCESSING
        }
      }
    };
  }

  getInstructions(drone) {
    getInstructions(drone).then(updated_state => {
      this.setState({drone: {...drone, ...updated_state}});
    });
  }
  
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Scripbox Drone task</h2>
        </div>
        <div className="App-intro">
		      <Drone 
            getInstructions={this.getInstructions}
            item={this.state.item}
            drone={this.state.drone} />
        </div>
      </div>
    );
  }
}

export default App;

class Drone extends Component {
  componentDidMount() {
    const {drone} = this.props;
    if (drone.status === DroneStatus.WAITING_FOR_INSTRUCTIONS) {
      setTimeout(() => this.props.getInstructions(drone), 1000);
    }
  }

  render() {
    const {drone} = this.props;
    return (
        <div>
          <h4> {drone.name}</h4>
          {drone.status} 
        </div>
    );
  }
}

export const getInstructions = (drone) => {
  // In real life this will make a HTTP call
  // Let's keep things simple and assume there is a server processing these requests
  return Promise.resolve({
      item : 1, 
      status: DroneStatus.ITEM_PICKUP
  });
}
