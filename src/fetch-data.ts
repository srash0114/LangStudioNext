import axios from "axios";

export interface User {
  fullName: string;
  email: string;
  avatarUrl: string;
  isDarkMode: boolean;
}

const DEFAULT_AVATAR_URL = "https://api.scanvirus.me/minio/file/343b096a-62eb-4053-8d88-2a3076977b7f_park_shin_hye.jpg"; // Thay bằng URL mặc định bạn muốn

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
