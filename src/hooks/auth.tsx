import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import * as AuthSession from 'expo-auth-session';
import  AsyncStorage  from "@react-native-async-storage/async-storage";

interface IAuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar_url?: string;
}

interface IAuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
  signOut(): Promise<void>;
  userStorageLoading: boolean;
}

interface IAuthCredentials {
  params: {
    access_token: string;
  };
  type: string;
}

export const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: IAuthProviderProps) {
  const [user, setUser] = useState<User>({} as User);
  const [userStorageLoading, setUserStorageLoading] = useState(true);

  async function signInWithGoogle() {
    try {
      const CLIENT_ID = process.env.CLIENT_ID;
      const REDIRECT_URI = process.env.REDIRECT_URI;
      const RESPONSE_TYPE = 'token';
      const SCOPE = encodeURI('profile email');

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

     const {type, params} = await AuthSession.startAsync({authUrl}) as IAuthCredentials;
     
     if(type === 'success') {
      const response = await fetch(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${params.access_token}`);
      const userInfo = await response.json();
      const userLogged = {
        id: userInfo.id,
        name: userInfo.given_name, 
        email: userInfo.email,
        avatar_url: userInfo.picture
      };
      setUser(userLogged);
      await AsyncStorage.setItem('@goFinances:user', JSON.stringify(userLogged));
     }
    } catch (error) {
      throw new Error(`${error}`); 
    }
  }

  async function signOut() {
    await AsyncStorage.removeItem('@goFinances:user');
    setUser({} as User);
  }
  useEffect(() => {

    async function loadUserStorageData() {
      const userData = await AsyncStorage.getItem('@goFinances:user');
      if(userData) {
        setUser(JSON.parse(userData));
      }
      setUserStorageLoading(false);
    }
    loadUserStorageData(); 
  } , []);


  return (
    <AuthContext.Provider value={{
       user, 
       signInWithGoogle,
       signOut,
       userStorageLoading
    }}>
      {children}
    </AuthContext.Provider>);
}

function useAuth() {
  const context = useContext(AuthContext);
  return context;
}

export { AuthProvider, useAuth };
