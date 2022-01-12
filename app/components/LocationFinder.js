//

import React, {useState} from 'react';
import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import {Text, Card} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import ContextService from '../services/ContextService';
import Row from './layout/Row';

function AutocompleteItem(props) {
  return (
    <TouchableHighlight
      underlayColor={'#ecf0f1'}
      style={{}}
      onPress={() => ContextService.locationViewRequested(props.item)}>
      <View
        style={{
          borderWidth: 0,
          margin: 0,
          paddingVertical: 2,
          paddingHorizontal: 3,
          borderBottomWidth: 1,
          borderBottomColor: 'teal',
        }}>
        <Row>
          <Icon
            name="map-pin"
            size={13}
            color="teal"
            style={{marginTop: 6, paddingHorizontal: 5}}
          />
          <Text style={{fontSize: 17, fontWeight: 'bold'}}>
            {props.item.cellname}
          </Text>
        </Row>
        <Text style={{fontSize: 16, paddingLeft: 5}}>
          {`${Number(props.item.longitude).toFixed(2)}, ${Number(
            props.item.latitude,
          ).toFixed(2)}`}
        </Text>
      </View>
    </TouchableHighlight>
  );
}

export default function (props) {
  const [query, setQuery] = useState('');
  const data = props.addresses.filter(addr =>
    addr.cellname.includes(query.trim()),
  );

  function queryChanged(query) {
    setQuery(query);
  }
  //hideResults={query === undefined || query.length === 0}
  return (
    <View style={styles.autocompleteContainer}>
      <Autocomplete
        inputContainerStyle={styles.inputContainer}
        containerStyle={styles.container}
        listContainerStyle={styles.listContainer}
        listStyle={styles.list}
        data={data}
        value={query}
        hideResults={query === undefined || query.trim().length === 0}
        renderTextInput={props => {
          props.style = styles.search_input;
          return <TextInput {...props} />;
        }}
        onChangeText={queryChanged}
        flatListProps={{
          keyExtractor: (_, idx) => idx,
          renderItem: ({item}) => <AutocompleteItem item={item} />,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  autocompleteContainer: {
    width: Dimensions.get('window').width * 0.9,
    position: 'absolute',
    zIndex: 0.5,
    marginTop: 100,
    padding: 0,
    marginLeft: 20,
    borderWidth: 0,
  },
  inputContainer: {
    elevation: 4,
    borderRadius: 5,
    margin: 0,
    padding: 0,
  },
  container: {
    borderRadius: 50,
    padding: 0,
  },
  listContainer: {
    borderWidth: 0,
    margin: 0,
    padding: 0,
  },
  list: {
    padding: 80,
  },
  search_input: {
    color: 'black',
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
    borderRadius: 5,
  },
});
