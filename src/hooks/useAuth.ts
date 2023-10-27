import {
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  User,
} from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";

import { auth } from "@/firebase";
import Cookies from "js-cookie";

// function is started
export const useAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setIsError] = useState<string>("");
  const [user, setIsUser] = useState<User | null>(null);

  const router = useRouter();

  // sign up function
  const signUp = async (email: string, password: string) => {
    setIsLoading(true);

    await createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setIsUser(res.user);
        fetch("/api/customer", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: res.user.email, user_id: res.user.uid }),
        });
        router.push("/");
        Cookies.set("user_id", res.user.uid);
        setIsLoading(true);
      })
      .catch((error) => setIsError(error.message))
      .finally(() => setIsLoading(false));
  };

  // sign in function
  const signIn = async (email: string, password: string) => {
    setIsLoading(true);

    await signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        setIsUser(res.user);
        router.push("/");
        Cookies.set("user_id", res.user.uid);
        setIsLoading(true);
      })
      .catch((error) => setIsError(error.message))
      .finally(() => setIsLoading(false));
  };

  // logout function
  const logout = async () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setIsUser(null);
        Cookies.remove("user_id");
      })
      .catch((error) => setIsError(error.message))
      .finally(() => setIsLoading(false));
  };

  // exporting the functions and states
  return {
    error,
    isLoading,
    user,
    signIn,
    signUp,
    logout,
    setIsUser,
    setIsLoading,
  };
};
