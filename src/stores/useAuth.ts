import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const isValidPassword = (password: string): boolean => {
  // Critérios para a senha:
  // - Pelo menos 8 caracteres
  // - Pelo menos 1 letra maiúscula
  // - Pelo menos 1 letra minúscula
  // - Pelo menos 1 número
  // - Pelo menos 1 caractere especial
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

const DEFAULT_EMAIL = 'maria20fernanda@gmail.com';
const DEFAULT_PASSWORD = 'Maria123*';

type AuthState = {
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
  isAuthenticated: boolean;
  emailError: string;
  passwordError: string;
  checkEmail: boolean;
  checkPassword: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loadAuthState: () => Promise<void>;
  loading: boolean;
};

const useAuthStore = create<AuthState>((set, get) => ({
  email: '',
  setEmail: (value: string) => set({email: value}),
  password: '',
  setPassword: (value: string) => set({password: value}),
  isAuthenticated: false,
  emailError: '',
  passwordError: '',
  checkEmail: false,
  checkPassword: false,
  loading: false,
  // Função de login
  login: async () => {
    set({loading: true});
    const {email, password} = get();
    if (!isValidEmail(email)) {
      set({emailError: 'Email inválido'});
    } else {
      set({checkEmail: true});
    }

    if (!isValidPassword(password)) {
      set({passwordError: 'Senha inválida'});
    } else {
      set({checkPassword: true});
    }

    if (!isValidEmail || !isValidPassword) {
      set({loading: false});
      return;
    }

    if (email === DEFAULT_EMAIL && password === DEFAULT_PASSWORD) {
      await AsyncStorage.setItem('email', email);
      await AsyncStorage.setItem('password', password);

      set({
        email,
        password,
        isAuthenticated: true,
        loading: false,
        checkEmail: false,
        checkPassword: false,
      });
    }
  },

  // Função de logout
  logout: async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('password');

    set({email: '', password: '', isAuthenticated: false});
  },

  // Carregar estado de autenticação do AsyncStorage
  loadAuthState: async () => {
    const email = await AsyncStorage.getItem('user');
    const password = await AsyncStorage.getItem('password');

    if (email && password) {
      set({email, password, isAuthenticated: true});
    } else {
      set({email: '', password: '', isAuthenticated: false});
    }
  },
}));

export default useAuthStore;
