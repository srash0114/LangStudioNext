import axios from "axios";
import parkShinHye from '@/assets/user/park_shin_hye.jpg';

export interface User {
  fullName: string;
  email: string;
  avatarUrl: string;
  isDarkMode: boolean;
  isPro: boolean;
}

const DEFAULT_AVATAR_URL = parkShinHye.src; // Thay bằng URL mặc định bạn muốn

// Hàm lấy thông tin người dùng
export async function getUserInfo(): Promise<User | null> {
  try {
    const response = await axios.get<User>('https://api.scanvirus.me/User/info', {
      withCredentials: true,
    });

    if (response.status === 200) {
      const user = response.data;
      return {
        ...user,
        avatarUrl: user.avatarUrl?.trim() ? user.avatarUrl : DEFAULT_AVATAR_URL,
      };
    }

    return null;
  } catch (error: any) {
    if (error.response?.status === 401) {
      console.warn("Người dùng chưa đăng nhập.");
    } else {
      console.error("Lỗi khi gọi API:", error);
    }
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
