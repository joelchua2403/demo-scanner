import { BarCodeScanner } from 'expo-barcode-scanner';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useState, useEffect } from 'react';
import MapView from 'react-native-maps';

export default function App() {

const [hasPermission, setHasPermission] = useState(null);
const [scanned, setScanned] = useState(false);
const [openScanner, setOpenScanner] = useState(false);

useEffect(() => {
  const getCameraPermission = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');
  }
  getCameraPermission();
}, []);

const handleBarCodeScanned = ({ type, data }) => {
  setScanned(true);
  alert(`Bar code with type ${type} and data ${data} has been scanned!`);
};

if (hasPermission === null) {
  return <Text>Requesting for camera permission</Text>;
}
if (hasPermission === false) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
  <Text >No access to camera</Text>
  </View>
  )
}

return (
  openScanner ? (
  <View style={styles.container}>
  
   
      
   <BarCodeScanner
      onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
      style={StyleSheet.absoluteFillObject}
    />
     {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} 
     <Button title={'Close'} onPress={() => setOpenScanner(false)} />
    </View>
  ) : (
  
  <View style={styles.container}>
<Button
title='Scan QR Code'
onPress={() => setOpenScanner(true)}
/> 
<MapView style={styles.MapContainer} />
</View>

  )
);
  
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  MapContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
});
