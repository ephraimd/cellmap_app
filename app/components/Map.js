//

import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View, ToastAndroid, Platform, PermissionsAndroid } from 'react-native';
//import MapView from 'react-native-maps';

import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import ContextService from '../services/ContextService';
import SendIntentAndroid from 'react-native-send-intent';
import Geolocation from '@react-native-community/geolocation';

async function requestPermissions() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'Give me location permission',
                'message': 'To access your current location, please grant location permission'
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        } else {
            ToastAndroid.showWithGravity(
                `Cannot resolve current location because permission is denied`,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            return false;
        }
    } catch (err) {
        console.warn(err);
        ToastAndroid.showWithGravity(
            `Cannot resolve current location. `,
            ToastAndroid.SHORT,
            ToastAndroid.CENTER
        );
        return false;
    }
}

export default (props) => {

    const [cellname, setCellname] = useState('My Sample Cell');
    const [address, setAddress] = useState('Some Address here');
    const [latitude, setLatitude] = useState(37.78825);
    const [longitude, setLongitude] = useState(-122.4324);

    useEffect(() => {
        requestPermissions();
        ContextService.onLocationViewRequested(({ longitude, latitude, cellname, address }) => {
            ToastAndroid.showWithGravity(
                `Opening Maps for route direction. See you at the cell!`,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            SendIntentAndroid.openMapsWithRoute(`${latitude}, ${longitude}`, "d");
        });

        ContextService.onCurrentLocationRequested(() => {
            const watchID = Geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const long = position.coords.longitude;
                setLatitude(lat);
                setLongitude(long);
                Geolocation.clearWatch(watchID);
                ContextService.mapLocationUpdated({
                    latitude: lat,
                    longitude: long,
                    cellname: cellname,
                    address: address
                });
            },
                (error) =>
                    ToastAndroid.showWithGravity(
                        JSON.stringify(error),
                        ToastAndroid.SHORT,
                        ToastAndroid.CENTER
                    ));

            ToastAndroid.showWithGravity(
                `Map is set to your current location`,
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
            );
        });

        ContextService.onMapLocationUpdated(({ longitude, latitude, cellname, address }) => {
            setLatitude(latitude);
            setLongitude(longitude);
            setCellname(cellname);
            setAddress(address);
            console.log(latitude, longitude);
        });
    });

    function onPress(data) {
        if (data.nativeEvent.coordinate) {
            ContextService.mapLocationUpdated({
                latitude: data.nativeEvent.coordinate.latitude,
                longitude: data.nativeEvent.coordinate.longitude,
                cellname: cellname,
                address: address
            });
        }
    }

    // useEffect(() => {
    //     ContextService.mapLocationUpdated({
    //         latitude: latitude,
    //         longitude: longitude,
    //         cellname: cellname,
    //         address: address
    //     });
    // });

    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: latitude,
                    longitude: longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
                onPress={onPress}
            >
                {!isNaN(latitude) && !isNaN(longitude) &&
                    <Marker
                        coordinate={{ latitude: latitude, longitude: longitude }}
                        title={cellname}
                        description={address}
                    />}
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});

// export default function Map() {
//     const [region, setRegion] = useState({
//         latitude: 37.78825,
//         longitude: -122.4324,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//     });
//     return (
//         <MapView
//         region={region}
//         onRegionChange={setRegion}
//         />
//     );
// }