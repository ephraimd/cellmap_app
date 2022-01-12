//


const MAP_LOCATION_UPDATED_CB = 'MAP_LOCATION_UPDATED_CB';
const MAP_LOCATION_UPDATE_REQUESTED_CB = 'MAP_LOCATION_UPDATE_REQUESTED_CB';
const FORM_UPDATED_CB = 'FORM_UPDATED_CB';
const CURRENT_LOCATION_REQUESTED_CB = 'CURRENT_LOCATION_REQUESTED_CB';
const LOCATION_VIEW_REQUESTED = 'LOCATION_VIEW_REQUESTED';

export default class ContextService{
    static data = [];
    static callBacks = {};

    static init(){
        this.callBacks[MAP_LOCATION_UPDATED_CB] = [];
        this.callBacks[FORM_UPDATED_CB] = [];
        this.callBacks[CURRENT_LOCATION_REQUESTED_CB] = [];
        this.callBacks[MAP_LOCATION_UPDATE_REQUESTED_CB] = [];
        this.callBacks[LOCATION_VIEW_REQUESTED] = [];
    }

    static formUpdated(formData){
        this.callBacks[FORM_UPDATED_CB].forEach(cb => cb(formData));
    }
    static mapLocationUpdated(mapLocation){
        this.callBacks[MAP_LOCATION_UPDATED_CB].forEach(cb => cb(mapLocation));
    }
    static locationViewRequested(mapLocation){
        this.callBacks[LOCATION_VIEW_REQUESTED].forEach(cb => cb(mapLocation));
    }
    static currentLocationRequested(){
        this.callBacks[CURRENT_LOCATION_REQUESTED_CB].forEach(cb => cb());
    }
    static mapLocationUpdateRequested(mapLocation){
        this.callBacks[MAP_LOCATION_UPDATE_REQUESTED_CB].forEach(cb => cb(mapLocation));
    }

    static onFormUpdated(callBack){
        this.callBacks[FORM_UPDATED_CB].push(callBack);
    }
    static onCurrentLocationRequested(callBack){
        this.callBacks[CURRENT_LOCATION_REQUESTED_CB].push(callBack);
    }
    static onMapLocationUpdated(callBack){
        this.callBacks[MAP_LOCATION_UPDATED_CB].push(callBack);
    }
    static onMapLocationUpdateRequested(callBack){
        this.callBacks[MAP_LOCATION_UPDATE_REQUESTED_CB].push(callBack);
    }
    static onLocationViewRequested(callBack){
        this.callBacks[LOCATION_VIEW_REQUESTED].push(callBack);
    }
}