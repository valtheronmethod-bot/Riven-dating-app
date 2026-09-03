import { Alert } from 'react-native';
global.alert = (msg?: unknown) => Alert.alert('', String(msg ?? ''));
