import { ReactNode, createContext, useContext, useEffect, useState } from "react";

// import { GoogleSignin } from '@react-native-google-signin/google-signin';
import * as AppleAuthentication from 'expo-apple-authentication';

import AsyncStorage from "@react-native-async-storage/async-storage";

// GoogleSignin.configure();

interface AuthProviderProps {
  children: ReactNode;
}

interface User {
  id: string;
  name: string;
  email: string;
  photo?: string;
}

interface IAuthContextData {
  user: User;
  signInWithGoogle(): Promise<void>;
  signInWithApple(): Promise<void>;
  signOut(): Promise<void>;
  userStorageLoadding: boolean;
}

const userStorageKey = '@gofinance:user'

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps){
  const [ user, setUser ] = useState<User>({} as User)
  const [ userStorageLoadding, setUserStorageLoadding ] = useState(true)

  async function signInWithGoogle(){
    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const userInfo = await GoogleSignin.signIn();

    //   const userLogged = {
    //     id: String(userInfo.user.id),
    //     email: userInfo.user.email!,
    //     name: userInfo.user.name!,
    //     photo: userInfo.user.photo!
    //   }

    //   setUser(userLogged)
    //   await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))

    // }catch(error){
    //     throw new Error(error)
    // }
  }

  async function signInWithApple(){
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL
        ]
      })

      if (credential){
        const name = credential.fullName!.givenName!
        const photo = `https://ui-avatars.com/api/?name=${ name }&length=1`

        const userLogged = {
          id: String(credential.user),
          email: credential.email!,
          name,
          photo
        }

        console.log(userLogged)
        setUser(userLogged)
        await AsyncStorage.setItem(userStorageKey, JSON.stringify(userLogged))
      }

    } catch(error){
      throw new Error(error)
    }
  }

  async function signOut(){
    setUser({} as User)
    await AsyncStorage.removeItem(userStorageKey)
  }

  useEffect(() => {
    async function loadStorageDate(){
      const userStoraged = await AsyncStorage.getItem(userStorageKey)

      if(userStoraged){
        const userLogger = JSON.parse(userStoraged) as User;
        setUser(userLogger)
      }
      setUserStorageLoadding(false)
    }
    loadStorageDate()
  }, [])

  return(
    <AuthContext.Provider value={{
      user,
      signInWithGoogle,
      signInWithApple,
      signOut,
      userStorageLoadding
    }}>
      { children }
    </AuthContext.Provider>
  )
}

function useAuth(){
  const context = useContext(AuthContext);

  return context
}

export { AuthProvider, useAuth }
