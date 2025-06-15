import { UploadIcon } from "@/assets/icons";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import Image from "next/image";
import { User } from "@/fetch-data";
import axios from "axios";
import { useState } from "react";

interface PersonalInfoFormProps {
  userData: User | null;
}

export const UploadPhotoForm: React.FC<PersonalInfoFormProps> = ({ userData }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showFireworks, setShowFireworks] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // For image preview

  if (!userData) {
    // return <div>Please Signin</div>;
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Create a preview URL for the selected image
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      // toast.error("Vui lòng chọn file để upload!");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("avatar", selectedFile);

    try {
      const response = await axios.post(
        "https://api.scanvirus.me/User/update-avatar",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        window.dispatchEvent(new Event('update-header'));
        setShowFireworks(true);
        setTimeout(() => {
          setShowFireworks(false);
        }, 5000);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setSelectedFile(null);
      setPreviewUrl(null); // Clear the preview after the upload
    }
  };

  return (
    <ShowcaseSection title="Your Photo" className="!p-7">
      {showFireworks && (
        <div className="pyro">
          <div className="before"></div>
          <div className="after"></div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4 flex items-center gap-3">
          {/* Displaying the selected image or the user's current avatar */}
          <Image
            src={previewUrl || userData?.avatarUrl || "/default-avatar.png"}
            width={55}
            height={55}
            alt="User"
            className="size-14 rounded-full object-cover"
            quality={90}
          />
          <div>
            <span className="mb-1.5 font-medium text-dark dark:text-white">
              Edit your photo
            </span>
          </div>
        </div>

        <div className="relative mb-5.5 block w-full rounded-xl border border-dashed border-gray-4 bg-gray-2 hover:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-primary">
          <input
            type="file"
            name="profilePhoto"
            id="profilePhoto"
            accept="image/png, image/jpg, image/jpeg"
            onChange={handleFileChange}
            hidden
          />

          <label
            htmlFor="profilePhoto"
            className="flex cursor-pointer flex-col items-center justify-center p-4 sm:py-7.5"
          >
            <div className="flex size-13.5 items-center justify-center rounded-full border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
              <UploadIcon />
            </div>

            <p className="mt-2.5 text-body-sm font-medium">
              <span className="text-primary">Click to upload</span> or drag and drop
            </p>

            <p className="mt-1 text-body-xs">
              SVG, PNG, JPG or GIF (max, 800 X 800px)
            </p>
          </label>
        </div>

        <div className="flex justify-end gap-3">
          <button
            className="flex justify-center rounded-lg border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 hover:opacity-80 dark:border-dark-3 dark:text-white"
            type="button"
            onClick={() => {
              setSelectedFile(null);
              setPreviewUrl(null); // Clear preview on cancel
            }}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            className="flex items-center justify-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-[7px] font-medium text-gray-2 hover:opacity-80"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </ShowcaseSection>
  );
};
