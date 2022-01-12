//

import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Container(props) {
    return (
        <View
            style={styles.container}
        >
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 2,
        flex: 1,
        flexDirection: 'column'
    }
});