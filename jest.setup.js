//import '@react-native-async-storage/async-storage/jest/async-storage-mock';
import 'react-native';
//import '@testing-library/jest-native/extend-expect';


// jest.setup.js
jest.mock('@react-native-async-storage/async-storage', () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  }));
  