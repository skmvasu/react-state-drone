import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import App, {Drone, updateState} from './App';
import {DroneStatus, PackageStatus} from './constants.js';
import {mount} from 'enzyme';

jest.useFakeTimers();

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('Test Drone', () => {
	it('should call pickupItem when drone is initialized and is in WAITING STATUS', () => {
		const drone = {
			name: "Test Drone 1",
			status: DroneStatus.WAITING_FOR_INSTRUCTIONS
		};

		const pickupItem = jest.fn();
		mount(<Drone drone={drone} items={{}} pickupItem={pickupItem}/>);
		jest.runTimersToTime(1000);
		expect(pickupItem).toBeCalledWith(drone);
	});

	it('should NOT when drone is initialized', () => {
		const drone = {
			name: "Test Drone 1",
			status: DroneStatus.DELIVERED
		};

		const pickupItem = jest.fn();
		mount(<Drone drone={drone} items={{}} pickupItem={pickupItem}/>);
		jest.runTimersToTime(1000);
		expect(pickupItem).not.toBeCalledWith(drone);
	});
});

describe('Test UpdateState function', () => {
	let default_items, default_drone, state;
	beforeEach(() => {
		default_items = {
	        1: {
	          name: 'Light saber',
	          status: PackageStatus.PROCESSING
	        }
        };
        default_drone =  {
	        name: 'Millenium Falcon', 
	        status: DroneStatus.WAITING_FOR_INSTRUCTIONS
	    };

		state = {
	      drone:default_drone, 
	      items: default_items
	    };
	});
	it('when item state is not passed', () => {
		const drone_state = {
	      item : 1, 
	      status: DroneStatus.ITEM_PICKUP
		};
		const updated_state = updateState(state, drone_state);
		
		expect(updated_state.items).toEqual(default_items);
		expect(updated_state.drone).toEqual(jasmine.objectContaining(drone_state));
	});

	it('when item state is passed', () => {
		const drone_state = {
	      item : 1, 
	      status: DroneStatus.ITEM_PICKUP
		};
		const new_item_state = PackageStatus.ON_THE_WAY;
		const updated_state = updateState(state, drone_state, {status: new_item_state});
		
		expect(updated_state.items[drone_state.item].status).toEqual(new_item_state);
	});
});

