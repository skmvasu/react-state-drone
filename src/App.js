import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { pickupItem,
  updateLocation,
  deliverItem,
  returnToCommandCenter,
  untillNextTime} from './FleetService.js';
import {DroneStatus, PackageStatus} from './constants.js';

// Build an application to operate a fleet of drones delivering goods:

// The command center sends an instruction to the drone to pickup an item from the warehouse (only one at present).

// The drone picks up the item from a designated spot (one spot only at this moment) and lifts off to the delivery address.

// After it reaches the delivery address, the drone sends an instruction back to the command center that it has reached.

// The drone unloads the item and sends an instruction back to the command center that it has unloaded the item.

// It comes back to the warehouse, reaches its parking spot, and lets the command center know that it is ready for next instruction.




// You may choose any of the following languages - Javascript, Ruby, Java, Python, Scala, Clojure, R.

// We would be looking for application design, object modeling, data modeling (if any), coding practices followed to evaluate your solution. You may want to include unit test cases to support your solution. 

// We would like the code to be version controlled using Git. Please do not upload it to bitbucket or github but instead zip the entire code repository and send it to us.

class App extends Component {
  constructor(props) {
    super(props);
    this.pickupItem = this.pickupItem.bind(this);
    this.updateState = this.updateState.bind(this);
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

  updateState(updated_state, item_status) {
    const item = updated_state.item;
    const {status} = updated_state;
    const updated_items = item ? {...this.state.items, [item]: {...this.state.items[item], status: item_status.status}} : this.state.items;

    return this.setState({
      drone: {...this.state.drone, status, item},
      items: updated_items
    });
  }

  pickupItem(drone) {
    pickupItem(drone).then(updated_state => {
      timeout(() => this.updateLocation(drone));
      this.updateState(updated_state, {status: PackageStatus.ITEM_PICKEDUP} );
    });
  }

  updateLocation(drone) {
    updateLocation(drone).then(updated_state => {
      timeout(() => this.deliverItem(drone));
      this.updateState(updated_state, {status: PackageStatus.ON_THE_WAY});
    });
  }
  
  deliverItem(drone) {
    deliverItem(drone).then(updated_state => {
      timeout(() => this.returnToCommandCenter(drone));
      this.updateState(updated_state, {status: PackageStatus.DELIVERD});
    });
  }

  returnToCommandCenter(drone) {
    returnToCommandCenter(drone).then(updated_state => {
      timeout(() => this.untillNextTime(drone));
      this.updateState(updated_state);
    });
  }

  untillNextTime(drone) {
    untillNextTime(drone).then(updated_state => {
      this.updateState(updated_state);
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
            pickupItem={this.pickupItem}
            items={this.state.items}
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
      timeout(() => this.props.pickupItem(drone));
    }
  }

  render() {
    const {drone, items} = this.props;
    return (
        <div>
          <h4> {drone.name}</h4>
          {drone.item 
            && <div>
              Assigned to item => <em>{items[drone.item].name}</em>
          </div> }
          {drone.status} 
        </div>
    );
  }
}

const timeout = (callback) => {
  setTimeout(callback, 1000);
};
