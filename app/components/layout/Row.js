//

import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function Row(props) {
    return (
        <View
            style={[styles.row, props.style]}
        >
            {props.children}
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
});