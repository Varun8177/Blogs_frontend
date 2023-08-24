import axios from "axios";

const { createContext, useState, useEffect } = require("react");

export const userContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState("");

  const handleUser = (val) => {
    setUser(val);
  };
  const validateUser = async (token) => {
    try {
      const res = await axios.get("http://16.170.240.91:8080/users/validate", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      const { data } = res;
      if (data) setUser(data.user);
    } catch (error) {
      console.log({ error });
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    if (token) {
      validateUser(token);
    }
  }, []);
  return (
    <userContext.Provider value={{ user, handleUser }}>
      {children}
    </userContext.Provider>
  );
};

export default UserContextProvider;
