import { ReactNode, createContext, useContext, useState } from "react";

import {
  GoogleSignin
} from '@react-native-google-signin/google-signin';
import AsyncStorage from "@react-native-async-storage/async-storage";

GoogleSignin.configure();

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
}

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps){
  const [ user, setUser ] = useState<User>({} as User)

  async function signInWithGoogle(){
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const userLogged = {
        id: String(userInfo.user.id),
        email: userInfo.user.email!,
        name: userInfo.user.name!,
        photo: userInfo.user.photo!
      }

      setUser(userLogged)
      await AsyncStorage.setItem('@gofinance:user', JSON.stringify(userLogged))

    }catch(error){
        throw new Error(error)
    }
  }

  return(
    <AuthContext.Provider value={{
      user,
      signInWithGoogle
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
