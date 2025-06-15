import axios from "axios";
import parkShinHye from '@/assets/user/park_shin_hye.jpg';
import { promises } from "dns";

export interface User {
  fullName: string;
  email: string;
  avatarUrl: string;
  isDarkMode: boolean;
  isPro: boolean;
}

const DEFAULT_AVATAR_URL = parkShinHye.src; // Thay bằng URL mặc định bạn muốn
  
  const options = {
    method: 'POST',
    url: 'https://api.scanvirus.me/Payment/create-payment',
    withCredentials: true,
    data: {
      OrderDescription: 'Pro Subscription for LangStudio',
      Amount: 55000,
      OrderType: 'pro_subscription'
    }
  };

export async function handleSubmit() {


      try {
        const response  = await axios.request(options);
        const { paymentUrl } = response.data;
        if (paymentUrl) {
          window.location.href = paymentUrl; // Chuyển hướng trực tiếp
          // Lưu ý: Nếu dùng React Router, có thể thay bằng navigate(paymentUrl)
        } else {
          throw new Error('No payment URL returned');
        }
      } catch (error) {
        console.error(error);
      }
  };

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
