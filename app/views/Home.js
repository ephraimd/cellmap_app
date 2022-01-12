//

import React, { useEffect, useState } from 'react';

import SlidingUpPanel from 'rn-sliding-up-panel';
import Form from '../components/Form';
import { Dimensions } from 'react-native';

import LocationFinder from '../components/LocationFinder';
import Map from '../components/Map';
import HomeController from '../controllers/HomeController';

export default function Home() {
    const [drawerHandle, setDrawerHandle] = useState();
    const addresses = [];

    const ctrl = new HomeController();

    useEffect(()=> {
        ctrl.getLocations().then(data => addresses.push(...data)).catch(err => alert(err));
    });

    return (
        <React.Fragment>
            <LocationFinder
                addresses={addresses}
            />
            <Map />
            <SlidingUpPanel
                ref={c => setDrawerHandle(c)}
                draggableRange={{ top: (Dimensions.get('window').height / 2) - 70, bottom: 150 }}
            >
                <Form
                    addLocation={(locationObj) => ctrl.addLocation(locationObj, addresses)}
                    drawerHandle={drawerHandle} />
            </SlidingUpPanel>
        </React.Fragment>
    );
}

