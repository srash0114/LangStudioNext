// context/UserContext.tsx
"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getUserInfo, User } from "@/fetch-data";

// Định nghĩa kiểu context
type UserContextType = {
  userData: User | null;
  isLoadingAuth: boolean;
};

// Giá trị mặc định
const UserContext = createContext<UserContextType>({
  userData: null,
  isLoadingAuth: true,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<User | null>(null);
  const [isLoadingAuth, setIsLoading] = useState<boolean>(true);

  const fetchUserData = useCallback(async () => {
    if (userData) {
      const data = await getUserInfo();
      setUserData(data);
      return; 
    }
    
    setIsLoading(true);
    try {
      const data = await getUserInfo();
      setUserData(data);
    } catch (err) {
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  }, [userData]);

  const fetchUser = useCallback(async () => {
    if (userData) return; 
    setIsLoading(true);
    try {
      const data = await getUserInfo();
      setUserData(data);
    } catch (err) {
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  }, [userData]);




  useEffect(() => {
    fetchUser();

    const handleUpdate = () => {
      fetchUserData();
    };
    

    window.addEventListener("update-header", handleUpdate);
    window.addEventListener("user-logout-success", () => setUserData(null));

    return () => {
      window.removeEventListener("update-header", handleUpdate);
      window.removeEventListener("user-logout-success", () => setUserData(null));
    };
  }, [fetchUser, fetchUserData]);

  return (
    <UserContext.Provider value={{ userData, isLoadingAuth }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook để sử dụng context
export const useUser = () => useContext(UserContext);
