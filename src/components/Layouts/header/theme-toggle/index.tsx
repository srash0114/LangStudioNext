import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import axios from "axios";
import { Moon, Sun } from "./icons";
import { User } from "@/fetch-data";

const THEMES = [
  { name: "light", Icon: Sun },
  { name: "dark", Icon: Moon },
];

async function updateDarkMode(isDarkMode: boolean, onSuccess: () => void) {
  try {
    const response = await axios.post(
      "https://api.scanvirus.me/User/update-darkmode",
      isDarkMode,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("API response:", response.data);
    onSuccess();
  } catch (error: any) {
    console.error("Failed to update theme preference:", error)
  }
}

export function ThemeToggleSwitch({ userData }: { userData: User | null }) {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [localUserData, setLocalUserData] = useState<User | null>(userData);

  useEffect(() => {
    setMounted(true);
    if (userData) {
      console.log("userData.isDarkMode:", userData.isDarkMode);
      setLocalUserData(userData);
      setTheme(userData.isDarkMode ? "dark" : "light");
    }
  }, [userData]);
  const handleToggleTheme = async () => {
    if (!theme) {
      console.error("Theme is undefined");
      return;
    }
    
    const newTheme = theme === "light" ? "dark" : "light";
    console.log("Switching to theme:", newTheme);
    setTheme(newTheme);

    if (localUserData) {
      console.log("Updating dark mode for user:", localUserData);
      await updateDarkMode(newTheme === "dark", () => {
        setLocalUserData({ ...localUserData, isDarkMode: newTheme === "dark" });
      });
    }
  };

  if (!mounted || !theme) return null;

  return (
    <button
      onClick={handleToggleTheme}
      aria-pressed={theme === "dark"}
      className="group rounded-full bg-gray-3 p-[5px] text-[#111928] outline-1 outline-primary focus-visible:outline dark:bg-[#020D1A] dark:text-current"
    >
      <span className="sr-only">
        Switch to {theme === "light" ? "dark" : "light"} mode
      </span>
      <span aria-hidden className="relative flex gap-2.5">
        <span className="absolute size-[38px] rounded-full border border-gray-200 bg-white transition-all dark:translate-x-[48px] dark:border-none dark:bg-dark-2 dark:group-hover:bg-dark-3" />
        {THEMES.map(({ name, Icon }) => (
          <span
            key={name}
            className={cn(
              "relative grid size-[38px] place-items-center rounded-full",
              name === "dark" && "dark:text-white"
            )}
          >
            <Icon />
          </span>
        ))}
      </span>
    </button>
  );
}