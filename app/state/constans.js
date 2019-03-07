import {Platform} from 'react-native';

const LOCAL_IP_ADDRESS = '0.0.0.0';

const server = Platform.select({
    ios: 'localhost',
    android: LOCAL_IP_ADDRESS
  });

  export const API_HOST = `http://${server}`;