import axios from "axios";
import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const UserContext = createContext(null)

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const userIsLogged = async () => {
      try {
        const { data } = await axios.get("/users/profile")
        setUser(data)

      } catch (error) {
        console.log('erro ao autenticar usuario no front: ' + error);
      }
    }
    userIsLogged()
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}



