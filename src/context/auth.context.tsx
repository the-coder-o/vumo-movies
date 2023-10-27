import { ReactNode, useMemo, createContext, useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { useRouter } from "next/router";

// creating the interface for Authentication
interface AuthContextState {
  user: User | null;
  error: string;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// creating the context for Authentication
export const AuthContext = createContext<AuthContextState>({
  user: null,
  error: "",
  isLoading: false,
  signIn: async () => {},
  signUp: async () => {},
  logout: async () => {},
});

// creating the provider
const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

// importing the states and functions from useAuth hook
  const { user, error, isLoading, signIn, signUp, logout, setIsUser, setIsLoading } =
    useAuth();

  const router = useRouter();

  // memorizing the values
  const value = useMemo(
    () => ({
      user,
      isLoading,
      error,
      signUp,
      logout,
      signIn,
    }),
    // eslint-disable-next-line
    [user, error, isLoading]
  );

// function is about if user is authenticated or not
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setIsLoading(false)
          setIsUser(user);
        } else {
          setIsUser(null);
          setIsLoading(true)
          router.push("/auth");
        } 
        setIsLoading(false);
        setInitialLoading(false);
      }),
    // eslint-disable-next-line
    []
  );

  return (
    <AuthContext.Provider value={value}>
      {!initialLoading ? children : "Loading..."}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
