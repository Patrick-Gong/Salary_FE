import { atom } from 'recoil';
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistToken = async (token) => {
  try {
    await AsyncStorage.setItem('authToken', token);
  } catch (error) {
    console.error('Failed to save token to storage', error);
  }
};

const loadToken = async () => {
  try {
    return await AsyncStorage.getItem('authToken');
  } catch (error) {
    console.error('Failed to load token from storage', error);
    return '';
  }
};

export const authToken = atom({
  key: 'authToken',
  default: '',
  effects: [
    ({ setSelf, onSet }) => {
      loadToken().then((token) => {
        if (token) setSelf(token);
        
      });

      onSet((newToken) => {
        if (newToken) {
          persistToken(newToken);
        } else {
          AsyncStorage.removeItem('authToken'); 
        }
      });
    },
  ],
});
