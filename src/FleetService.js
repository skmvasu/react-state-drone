import {DroneStatus} from './constants.js';

export const pickupItem = (drone) => {
  // In real life this will make a HTTP call
  // Let's keep things simple and assume there is a server processing these requests
  return Promise.resolve({
      item : 1, 
      status: DroneStatus.ITEM_PICKUP
  });
}

export const updateLocation = (drone) => {
  return Promise.resolve({
      item: 1,
      status: DroneStatus.ARRIVED_AT_DELIVERY_ADDRESS
  });
}

export const deliverItem = (drone) => {
  return Promise.resolve({
      item: 1,
      status: DroneStatus.DELIVER_ITEM
  });
}

export const returnToCommandCenter = (drone) => {
  return Promise.resolve({
      status: DroneStatus.WAY_BACK_TO_COMMAND_CENTER
  });
}

export const untillNextTime = (drone) => {
  return Promise.resolve({
      status: DroneStatus.WAITING_FOR_INSTRUCTIONS
  });
}
