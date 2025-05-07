// services/userService.ts
import axios from "axios";

export interface User {
  fullName: string;
  email: string;
  avatarUrl: string;
  isDarkMode: boolean;
}

// Hàm lấy thông tin người dùng
export async function getUserInfo(): Promise<User | null> {
  try {
    const response = await axios.get<User>('https://api.scanvirus.me/User/info', {
      withCredentials: true,
    });
    if (response.status === 200) {
      return response.data;
    } else {
      console.error('Không thể lấy thông tin người dùng:', response.status);
      return null;
    }
  } catch (error) {
    console.error('Lỗi khi gọi API:', error);
    return null;
  }
}

// Hàm logout
export async function logout(): Promise<void> {
  const res = await fetch('https://api.scanvirus.me/Auth/logout', {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) {
    throw new Error('Logout failed');
  }
}
