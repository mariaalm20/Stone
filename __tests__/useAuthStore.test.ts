import useAuthStore, { isValidEmail, isValidPassword } from '../src/stores/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {describe, beforeEach, expect, it} from '@jest/globals';

describe('useAuthStore', () => {
  beforeEach(() => {
    AsyncStorage.clear();
  });

  it('should set email and password correctly', () => {
    const {setEmail, setPassword} = useAuthStore.getState();

    // Atualizando diretamente o estado
    setEmail('test@example.com');
    setPassword('Test123*');

    const {email, password} = useAuthStore.getState();


    expect(email).toBe('test@example.com');
    expect(password).toBe('Test123*');
  });

  it('should authenticate the user with valid credentials', async () => {
    AsyncStorage.getItem.mockResolvedValueOnce('maria20fernanda@gmail.com'); 
    AsyncStorage.getItem.mockResolvedValueOnce('Maria123*'); 
  
    const {login, setEmail, setPassword} = useAuthStore.getState();
  
    setEmail('maria20fernanda@gmail.com');
    setPassword('Maria123*');
  
    const {email, password} = useAuthStore.getState();
  
    await login();
  
    const {isAuthenticated} = useAuthStore.getState();
  
    expect(email).toBe('maria20fernanda@gmail.com');
    expect(isAuthenticated).toBe(true);
  
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('email', 'maria20fernanda@gmail.com');
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('password', 'Maria123*');
  });
  
  

  it('should fail authentication with invalid email', async () => {
    const {login, setEmail} =
      useAuthStore.getState();

    // Definindo o email inválido
    setEmail('invalid-email');

    // Tentando fazer o login
    await login();

    const {emailError, isAuthenticated} = useAuthStore.getState();


    expect(emailError).toBe('Email inválido');
    expect(isAuthenticated).toBe(false);
  });

  it('should load authentication state from AsyncStorage', async () => {
    // Salvando dados no AsyncStorage
    await AsyncStorage.setItem('email', 'maria20fernanda@gmail.com');
    await AsyncStorage.setItem('password', 'Maria123*');

    const {loadAuthState} = useAuthStore.getState();

    // Carregando o estado de autenticação
    await loadAuthState();

    const {isAuthenticated, email} = useAuthStore.getState();

    expect(email).toBe('maria20fernanda@gmail.com');
    expect(isAuthenticated).toBe(true);
  });

  it('should logout correctly', async () => {
    const {logout} = useAuthStore.getState();

    // Realizando o logout
    await logout();
  
    const {isAuthenticated, email, password} = useAuthStore.getState();
  
    // Garantindo que o estado foi atualizado
    expect(isAuthenticated).toBe(false);
    expect(email).toBe(''),
    expect(password).toBe('')
  });
  
    it('should return false for passwords that do not meet the criteria', () => {
      // Senha sem maiúsculas
      expect(isValidPassword('password123!')).toBe(false);
  
      // Senha sem minúsculas
      expect(isValidPassword('PASSWORD123!')).toBe(false);
  
      // Senha sem números
      expect(isValidPassword('Password!')).toBe(false);
  
      // Senha sem caracteres especiais
      expect(isValidPassword('Password123')).toBe(false);
  
      // Senha muito curta (menor que 8 caracteres)
      expect(isValidPassword('Pass1!')).toBe(false);
    });
    
    it('should return false for invalid email addresses', () => {
      expect(isValidEmail('plainaddress')).toBe(false); // Sem arroba e domínio
      expect(isValidEmail('missingdomain@.com')).toBe(false); // Falta o domínio
      expect(isValidEmail('@missingusername.com')).toBe(false); // Falta o nome de usuário
      expect(isValidEmail('user@domain@domain.com')).toBe(false); // Dois símbolos @
      expect(isValidEmail('user@domain,com')).toBe(false); // Vírgula no lugar de ponto
      expect(isValidEmail('user@domain..com')).toBe(false); // Dois pontos consecutivos
      expect(isValidEmail('user@domain.c')).toBe(false); // Domínio com extensão inválida
    });
});
