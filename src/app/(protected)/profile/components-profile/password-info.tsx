"use client";

import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { useState } from "react";
import axios from 'axios';
import "@/css/fireworks.css";
import { ChevronUpIcon } from "@/assets/icons";
import InputGroup from "@/components/FormElements/InputGroup";
export function UpdatePassword() {
  const [showFireworks, setShowFireworks] = useState(false);
  const [formData, setFormData] = useState({
    oldpassword: '',
    newpassword: '',
    repassword: '',
  });
  const [showPopup, setShowPopup] = useState(false); // Trạng thái để hiển thị popup

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.newpassword === formData.repassword) {
      try {
        const response = await axios.post(
          'https://api.scanvirus.me/User/change-password',
          { currentPassword: formData.oldpassword, newPassword: formData.newpassword },
          { withCredentials: true }
        );
        if (response.status === 200) {
          setShowPopup(false)
          setShowFireworks(true); // Hiển thị pháo hoa
          window.dispatchEvent(new Event('update-header'));
          console.log('Cập nhật thành công:', response.data);
          setTimeout(() => {
            setShowFireworks(false);
          }, 5000);
        } else {
          console.error('Không thể cập nhật:', response.status);
        }
      } catch (error) {
        console.error(error);
      }
    }
    console.log('Submit data:', formData);
  };

  return (
    <ShowcaseSection title="Change Password" className="!p-7">
      
      <div className="relative" >
        {showFireworks && (
            <div className="pyro">
              <div className="before"></div>
              <div className="after"></div>
            </div>
        )}
        <input
          className="form-datepicker w-full rounded-[7px] border-[1.5px] 
          border-stroke bg-transparent px-5 py-3 font-normal outline-none 
          transition focus:border-primary active:border-primary dark:border-dark-3 
          dark:bg-dark-2 dark:focus:border-primary cursor-pointer"
          placeholder="Change Password"
          data-class="flatpickr-right"
          readOnly
          onClick={() => setShowPopup(true)}
        />

        <div className="pointer-events-none absolute inset-0 left-auto right-5 flex items-center text-dark-4 dark:text-dark-6">
          <ChevronUpIcon className="rotate-90" />
        </div>
      </div>

      {showPopup && (
      <div className="fixed inset-0 z-[999] flex justify-center items-center bg-gray-500 bg-opacity-50">
        <div className="bg-white z-[999] p-6 rounded-lg shadow-lg w-11/12 sm:w-1/3 md:w-1/4 lg:w-1/5 dark:bg-gray-dark dark:shadow-card">
          <h2 className="text-xl font-semibold mb-4">Change Your Password</h2>
          <form onSubmit={handleSubmit}>
            <InputGroup
              className="mt-2.5"
              type="password"
              name="oldpassword"
              label="Old Password"
              placeholder="Old Password"
              handleChange={handleChange}
              required
            />
            <InputGroup
              className="mt-2.5"
              type="password"
              name="newpassword"
              label="New Password"
              placeholder="New Password"
              handleChange={handleChange}
              required
            />
            <InputGroup
              className="mt-2 mb-4.5"
              type="password"
              name="repassword"
              label="Re Password"
              placeholder="Re Password"
              handleChange={handleChange}
              required
            />
            <div className="flex justify-between">
              <button type="submit" className="rounded-lg bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90">Submit</button>
              <button type="button" onClick={() => setShowPopup(false)}
                className="rounded-lg border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )}

    </ShowcaseSection>
  );
}
