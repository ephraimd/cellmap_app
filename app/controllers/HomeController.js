///

import {ToastAndroid} from 'react-native';
import ContextService from '../services/ContextService';
import fetch from 'node-fetch';

export default class HomeController {
  constructor() {
    //
  }

  async getLocations() {
    try {
      const resp = await fetch(
        'https://clmapi.herokuapp.com/v1/location/get_locations',
      );
      if (resp.status !== 200) {
        console.error(await resp.json());
        throw new Error(
          'Failed to get list of locations from the location service',
        );
      } else {
        return await resp.json();
      }
    } catch (err) {
      throw err;
    }
  }
  async sendLocation(locationObj) {
    try {
      console.log(locationObj);
      const resp = await fetch(
        'https://clmapi.herokuapp.com/v1/location/add_location',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(locationObj),
        },
      );

      if (resp.status !== 200) {
        console.error(await resp.json());
        throw new Error('Failed to update location to location service');
      } else {
        const json = await resp.json();
        if (json?.success !== true) {
          alert(json);
          throw new Error(
            'Failed to get list of locations from the location service',
          );
        }
      }
    } catch (err) {
      throw err;
    }
  }

  addLocation(addressObj, addresses) {
    //{longitude, latitude, cellname, address}
    if (addressObj.cellname.length === 0 || addressObj.address.length === 0) {
      ToastAndroid.showWithGravity(
        'Please ensure you fill in address and cell name fields properly',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return;
    }
    ContextService.mapLocationUpdateRequested(addressObj);

    if (
      addresses.findIndex(add => add.cellname === addressObj.cellname) !== -1
    ) {
      ToastAndroid.showWithGravity(
        `${addressObj.cellname} exists already!`,
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
      return;
    }
    this.sendLocation(addressObj)
      .then(did => {
        addresses.push(addressObj);
        ToastAndroid.showWithGravity(
          `${addressObj.cellname} has been added successfully!`,
          ToastAndroid.SHORT,
          ToastAndroid.CENTER,
        );
      })
      .catch(err => {
        console.error(err);
        alert(err);
      });
  }
}
