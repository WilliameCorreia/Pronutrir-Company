import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';
import { BluetoothManager } from 'react-native-bluetooth-escpos-printer';

interface AuthContextData {
  loading: boolean;
  validationBluetooth: () => Promise<boolean>;
  pairedDevices: string[];
  foundDs: string[];
}

export interface IDevices {
  index: number;
  name: string;
  address: string;
}

const PrintBluetoothContext = createContext({} as AuthContextData);

export const PrintBluetoothProvider = ({ children }: any) => {

  const [loading, setLoading] = useState(true);
  const [foundDs, setFoundDs] = useState<string[]>([]);
  const [pairedDevices, setPairedDevices] = useState<string[]>([]);

  const scanBluetoothDevice = async () => {
    debugger;
    try {
      const isBluetoothEnabled = await BluetoothManager.isBluetoothEnabled();

      if (!isBluetoothEnabled) {
        console.log('Bluetooth não está habilitado');
        return;
      }
      
      const devices = await scanDevices();
      console.log('Dispositivos encontrados:', devices);
    } catch (error) {
      console.error('Erro ao escanear dispositivos Bluetooth:', error);
    }
  }

  const scanDevices = () => {
    return new Promise((resolve, reject) => {
      BluetoothManager.scanDevices()
        .then((devices) => {
          setPairedDevices(devices.paired);
          setFoundDs(devices.found);
          setLoading(false);
          resolve(devices);
        })
        .catch((error: any) => {
          console.error('Erro ao escanear dispositivos:', error);
          reject(error);
        });
    });
  }

  /* const scanDevices = useCallback(async () => {
    setLoading(true);
    const {
      found,
      paired,
    }: {
      found: string[];
      paired: string[];
    } = await BluetoothManager.scanDevices();

    console.log('Dispositivos encontrados:', found);
    console.log('Dispositivos pareados:', paired);

    setPairedDevices(paired);
    setFoundDs(found);
    setLoading(false);
  }, []); */

  const validationBluetooth = async () => {
    debugger;
    try {
      // Solicitar permissões necessárias baseadas na versão do Android
      if (Platform.OS === 'android') {
        if (Platform.Version >= 31) { // Android 12+
          const permissions = [
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
          ];
          
          const granted = await PermissionsAndroid.requestMultiple(permissions);
          
          if (
            granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN] !== PermissionsAndroid.RESULTS.GRANTED ||
            granted[PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT] !== PermissionsAndroid.RESULTS.GRANTED
          ) {
            console.error('Permissões de Bluetooth não concedidas');
            return false;
          }
        } else {
          // Android 11 e anteriores
          const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH,
            PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADMIN,
          ]);
          
          const allGranted = Object.values(granted).every(
            status => status === PermissionsAndroid.RESULTS.GRANTED
          );
          
          if (!allGranted) {
            console.error('Permissões de Bluetooth não concedidas');
            return false;
          }
        }
      }
      
      // Verificar se Bluetooth está disponível
      const isBluetoothEnabled = await BluetoothManager.isBluetoothEnabled();
      
      if (!isBluetoothEnabled) {
        // Habilitar Bluetooth
        await BluetoothManager.enableBluetooth();
      }
      
      // Agora você pode escanear dispositivos
      // BluetoothManager.scanBluetoothDevice() deve funcionar agora
      scanBluetoothDevice();
      return true;
    } catch (error) {
      console.error('Erro ao validar Bluetooth:', error);
      return false;
    }
  };

  useEffect(() => {
    scanBluetoothDevice();
  }, [validationBluetooth]);
  
  return (
    <PrintBluetoothContext.Provider value={{ validationBluetooth, loading, pairedDevices, foundDs }}>
      {children}
    </PrintBluetoothContext.Provider>
  );
};

export default PrintBluetoothContext;
