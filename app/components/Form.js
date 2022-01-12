//

import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import {
    Button, Card, Input, Text
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import ContextService from '../services/ContextService';

import Row from './layout/Row';

export default function Form(props) {
    const [cellname, setCellname] = useState('');
    const [address, setAddress] = useState('');
    const [latitude, setLatitude] = useState(37.78825);
    const [longitude, setLongitude] = useState(-122.4324);

    useEffect(() => {
        ContextService.onMapLocationUpdated((locationObj) => {
            console.log(locationObj, 'form');
            setLatitude(locationObj.latitude);
            setLongitude(locationObj.longitude);
        });
    });

    return (
        <Card containerStyle={styles.drawer_view}>
            <Card.Title style={{ marginTop: -3 }}>
                <Text h4
                    selectable={true}
                    style={{ fontFamily: 'Roboto', textAlign: 'left', padding: 0 }}
                >
                    Add new Cells
                </Text>
                <TouchableHighlight
                    underlayColor={'#fff'}
                    style={{ marginTop: 50 }}
                    onPress={() => {
                        ContextService.currentLocationRequested(); props.drawerHandle.hide();
                    }}>
                    <Icon
                        name='bullseye'
                        size={35}
                        color="#d35400"
                        style={{ marginLeft: 160 }}
                    />
                </TouchableHighlight>
            </Card.Title>

            <Input style={styles.formInput}
                placeholder='Cell name'
                value={cellname}
                onChangeText={setCellname}
            />
            <Row style={styles.row}>
                <View style={[styles.form_50, styles.form_item]}>
                    <Input style={[styles.formInput]}
                        placeholder='latitude'
                        value={String(latitude)}
                        disabled={true}
                        leftIcon={
                            <Icon
                                name='map-pin'
                                size={24}
                                color='teal'
                            />
                        }
                    />
                </View>
                <View style={[styles.form_50, styles.form_item]}>
                    <Input style={[styles.formInput]}
                        placeholder='longitude'
                        value={String(longitude)}
                        disabled={true}
                        leftIcon={
                            <Icon
                                name='map-pin'
                                size={24}
                                color='teal'
                            />
                        }
                    />
                </View>
            </Row>
            <Input style={[styles.formInput, { marginTop: 70 }]}
                placeholder='Address of cell'
                value={address}
                onChangeText={setAddress}
                leftIcon={
                    <Icon
                        name='map'
                        size={24}
                        color='teal'
                        style={{ height: 40, marginTop: 90 }}
                    />
                }
            />
            <Button
                buttonStyle={{ backgroundColor: '#2c3e50' }}
                title='Add Location'
                onPress={() => {
                    props.addLocation({
                        cellname: cellname || '',
                        address: address || '',
                        longitude: longitude,
                        latitude: latitude
                    });
                    //props.drawerHandle.hide();
                }}
                icon={
                    <Icon
                        name='plus'
                        size={15}
                        style={{ marginRight: 8 }}
                        color="white"
                    />
                }
            />
        </Card>
    );
}

const styles = StyleSheet.create({
    drawer_view: {
        borderTopWidth: 3,
        borderTopColor: '#d35400',
        borderBottomWidth: 20,
        borderTopRightRadius: 9,
        borderTopLeftRadius: 9,
        padding: 0,
        paddingTop: 17,
        margin: 0
    },
    row: {
    },
    formInput: {
        margin: 0
    },
    form_50: {
        width: 200
    },
    form_item: {
        height: 50
    }
});