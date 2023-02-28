import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Button, PermissionsAndroid} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { PERMISSIONS, check, request } from 'react-native-permissions'

const App = () => {
  // state to hold location
  const [location, setLocation] = useState(false);

  const getLocation = async () => {
    const result_in_use = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    const result_always = await check(PERMISSIONS.IOS.LOCATION_ALWAYS)
    
    if (result_in_use === 'granted' || result_always === 'granted') {
      Geolocation.getCurrentPosition(
              position => {
                console.log(position);
                setLocation(position);
              },
              error => {
                // See error code charts below.
                console.log(error.code, error.message);
                setLocation(false);
              },
              {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
      );
    } 
    else {
            const res2 = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
            console.log(res2);
            if (res2 === 'granted') {
              setLocation(true);
              getLocation();
            } else {
              setLocation(false);
            }
    }
  };
  
  return (
    <View style={styles.container}>
      <Text>Welcome!</Text>
      <View
        style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
        <Button title="Get Location" onPress={getLocation} />
      </View>
      <Text>Latitude: {location ? location.coords.latitude : null}</Text>
      <Text>Longitude: {location ? location.coords.longitude : null}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default App;