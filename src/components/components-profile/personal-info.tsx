import React from 'react';
import { EmailIcon, UserIcon } from "@/assets/icons";
import InputGroup from "@/components/FormElements/InputGroup";
import { ShowcaseSection } from "@/components/Layouts/showcase-section";
import { User } from "@/fetch-data";
import { useState } from "react";
import axios from 'axios';
import "@/css/fireworks.css"; //pháo hoa

interface PersonalInfoFormProps {
  userData: User | null;
}
export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ userData }) => {
  
  const [showFireworks, setShowFireworks] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
  })


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    if(formData.fullName!=userData?.fullName){
      try {
        const response = await axios.post(
          'https://api.scanvirus.me/User/update-fullname',
          { fullName: formData.fullName },
          { withCredentials: true }
        )
        if (response.status === 200) {
          setShowFireworks(true); // hiện pháo hoa
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

  if(!userData){
    return ;
    // ("vui lòng đăng nhập")
  }
  return (
    <ShowcaseSection title="Personal Information" className="!p-7">
      <form onSubmit={handleSubmit}>
          {showFireworks && (
            <div className="pyro">
              <div className="before"></div>
              <div className="after"></div>
            </div>
          )}
          <InputGroup
            className="mb-5.5"
            type="email"
            name="email"
            label="Email Address"
            placeholder={userData.email}
            defaultValue={userData.email}
            disabled
            icon={<EmailIcon />}
            iconPosition="left"
            height="sm"
          />


          <InputGroup
            className="mb-5.5"
            type="text"
            name="fullName"
            label="Full Name"
            placeholder={userData.fullName}
            defaultValue={userData.fullName}
            handleChange={handleChange}
            icon={<UserIcon />}
            iconPosition="left"
            height="sm"
          />

        <div className="flex justify-end gap-3">
          <button
              className="rounded-lg border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 hover:opacity-80
              dark:border-dark-3 dark:text-white"
              type="button"
              onClick={() => setFormData({ fullName: userData.fullName })}
            >
            Cancel
          </button>

          <button
            className="rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-[7px] font-medium text-gray-2 hover:opacity-80"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
            
    </ShowcaseSection>
    
  );
}
