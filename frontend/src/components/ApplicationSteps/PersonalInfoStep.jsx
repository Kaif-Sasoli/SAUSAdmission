import React, { useState, useEffect } from "react";
import correctImage from "../../assets/correctPhoto.jpeg";
import { districtsByProvince } from "../../data/domicileData";
import { Pencil } from 'lucide-react'

function PersonalInfoStep({  register, errors, watch, setValue, handleFileUpload, }) {

  const selectedProvince = watch("domicileProvince");
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
  const file = watch("photo");

  console.log("RHF photo value:", file);

  if (!file) {
    setPhotoPreview(null);
    return;
  }

  if (file instanceof File) {
    const url = URL.createObjectURL(file);
    setPhotoPreview(url);
    return () => URL.revokeObjectURL(url);
  }

  if (typeof file === "string") {
    setPhotoPreview(file);
  }
}, [watch("photo")]);

    const onPhotoChange = (e) => {
      const file = e.target.files?.[0];
      if (!file) return;

      console.log("Selected file:", file);

      setValue("photo", file, { shouldValidate: true, shouldDirty: true });

      const preview = URL.createObjectURL(file);
      setPhotoPreview(preview);

      if (handleFileUpload) handleFileUpload(file, "photo");
    };

    
  return (

    <div className=" mt-2 pb-5 bg-gray-100 rounded-lg">
      {/* Header */}
      <div className="border-b px-3 py-2">Personal Information</div>
      <form>
      {/* Body */}
      <div className="flex px-5">

        {/* Left Side */}
        <div className="w-full pt-20">

          {/* Row 1 */}
          <div className="flex justify-between items-center gap-4">

            {/* Name */}
            <div className="w-full">
              <label className="w-full text-sm block text-gray-700 font-medium mb-1">
                Name <span className="text-red-500">*</span>
              </label>
              <div className="w-full flex items-center py-0.5 border border-primary rounded-md">
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  className="w-full px-2 outline-none"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Father's Name */}
            <div className="w-full">
              <label className="text-sm block text-gray-700 font-medium mb-1">
                Father's Name <span className="text-red-500">*</span>
              </label>
              <div className="w-full py-0.5 border border-primary rounded-md">
                <input
                  type="text"
                  {...register("fatherName", {
                    required: "Father's name is required",
                  })}
                  className="w-full px-2 outline-none"
                />
              </div>
              {errors.fatherName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fatherName.message}
                </p>
              )}
            </div>

            {/* Surname */}
            <div className="w-full">
              <label className="text-sm block text-gray-700 font-medium mb-1">
                Surname
              </label>
              <div className="w-full py-0.5 border border-primary rounded-md">
                <input
                  type="text"
                  {...register("surname")}
                  className="w-full px-2 outline-none"
                />
              </div>
            </div>

          </div>

          {/* Row 2 */}
          <div className="flex justify-between items-center gap-4 mt-3">

            {/* Gender */}
            <div className="w-full">
              <label className="text-sm block text-gray-700 font-medium mb-1">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                {...register("gender", { required: "Gender is required" })}
                className="w-full  px-2 py-0.5 border border-primary rounded-md outline-none"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
              )}
            </div>

            {/* Guardian Name */}
            <div className="w-full">
              <label className="text-sm block text-gray-700 font-medium mb-1">
                Guardian's Name
              </label>
              <div className="w-full py-0.5 border border-primary rounded-md">
                <input
                  type="text"
                  {...register("guardianName")}
                  className="w-full px-2 outline-none"
                />
              </div>
            </div>

            {/* CNIC */}
            <div className="w-full">
              <label className="text-sm block text-gray-700 font-medium mb-1">
                CNIC Number <span className="text-red-500">*</span>
              </label>
              <div className="w-full py-0.5 border border-primary rounded-md">
                <input
                  type="text"
                  maxLength={13}
                  {...register("cnic", {
                    required: "CNIC is required",
                    minLength: {
                      value: 13,
                      message: "CNIC must be exactly 13 digits"
                    },
                    maxLength: {
                      value: 13,
                      message: "CNIC must be exactly 13 digits"
                    },
                    pattern: {
                      value: /^[0-9]{13}$/,
                      message: "Only 13 digits allowed (no dashes)"
                    }
                  })}
                  className="w-full px-2 outline-none"
                />

              </div>
              {errors.cnic && (
                <p className="text-red-500 text-sm mt-1">{errors.cnic.message}</p>
              )}
            </div>
          </div>

          {/* Row 3 */}
          <div className="flex justify-between items-center gap-5 mt-3">

          {/* DOB */}
            <div className="w-3/6">
              <label className="text-sm block text-gray-700 font-medium mb-1">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <div className="w-full px-2 py-0.5 border border-primary rounded-md">
                <input
                  type="date"
                  {...register("dob", {
                    required: "Date of Birth is required",
                  })}
                  className="w-full px-2 outline-none"
                />
              </div>
              
              {errors.dob && (
                <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
              )}
            </div>

            {/* Current Address */}
            <div className="w-full">
              <label className="text-sm block text-gray-700 font-medium mb-1">
                Current Address <span className="text-red-500">*</span>
              </label>
              <div className="w-full py-0.5 border border-primary rounded-md">
                <input
                  type="text"
                  {...register("currentAddress", {
                    required: "Current address is required",
                  })}
                  className="w-full px-2 outline-none"
                />
              </div>
              {errors.currentAddress && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.currentAddress.message}
                </p>
              )}
            </div>

          </div>
        </div>

        {/* Right: Image */}
        <div className="py-5 pl-10 flex gap-2
        flex-col justify-center items-center w-2/5">
          <p
          className="px-5 py-2 text-sm bg-gray-300 rounded-t-md text-white" 
          >Please upload passport size photo. Do not upload selfies</p>

          <div 
          onClick={() => document.getElementById("photoUpload").click()}
          className="px-5 flex flex-col w-full h-full border-2 border-gray-400
          rounded-b-md overflow-hidden relative cursor-pointer">

         {/* Demo Image */}
          <img 
          src={photoPreview || correctImage}
          alt="Preview"
          className="h-48 w-52 my-1" />

          {/* Image */}
          

           {/* Hidden file input */}
           <input
              type="file"
              id="photoUpload"
              className="hidden"
              accept="image/*"
              onChange={onPhotoChange}
            />
          
           <div
           className="bg-gray-300 p-2 absolute right-5 top-2
            text-white rounded-full cursor-pointer hover:bg-gray-400 
             transition-all ease-in-out">
            <Pencil 
            size={18}/>
            </div>
        </div>

        {/* Validation error */}
         {errors.photo && (
           <p className="text-red-500 text-sm mt-1">{errors.photo.message}</p>
         )}

        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-4 px-5">

        {/* Row 4 */}
        <div className="flex justify-between items-center gap-4">

          {/* Permanent Address */}
          <div className="w-full">
            <label className="text-sm block text-gray-700 font-medium mb-1">
              Permanent Address <span className="text-red-500">*</span>
            </label>
            <div className="w-full py-0.5 border border-primary rounded-md">
              <input
                type="text"
                {...register("permanentAddress", {
                  required: "Permanent address is required",
                })}
                className="w-full px-2 outline-none"
              />
            </div>
            {errors.permanentAddress && (
              <p className="text-red-500 text-sm mt-1">
                {errors.permanentAddress.message}
              </p>
            )}
          </div>

        {/* Correspondence Address */}
        <div className="w-2/5">
          <label className="text-sm block text-gray-700 font-medium mb-1">
            Correspondence Address <span className="text-red-500">*</span>
          </label>

          <select
            {...register("correspondenceAddress", {
              required: "Correspondence address is required",
            })}
            className="w-full px-2 py-1 border border-primary rounded-md
                      ring-0 focus:outline-0"
          >
            <option value="">Select Address</option>
            <option value="currentAddress">Current Address</option>
            <option value="permanentAddress">Permanent Address</option>
          </select>
        
          {errors.correspondenceAddress && (
            <p className="text-red-500 text-sm mt-1">
              {errors.correspondenceAddress.message}
            </p>
          )}
        </div>

          {/* Nationality */}
            <div className="w-2/5">
              <label className="text-sm block text-gray-700 font-medium mb-1">
                Nationality <span className="text-red-500">*</span>
              </label>

              <select
                {...register("nationality", {
                  required: "Nationality is required",
                })}
                className="w-full px-2 py-1 border border-primary rounded-md"
              >
                <option value="">Select Nationality</option>
                <option value="pakistani">Pakistani</option>
                <option value="other">Other</option>
              </select>
            
              {errors.nationality && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.nationality.message}
                </p>
              )}
            </div>

        </div>

        {/* Row 5 */}
        <div className="flex justify-between items-center gap-4 mt-3">

          {/* Religion */}
          <div className="w-full">
            <label className="text-sm block text-gray-700 font-medium mb-1">
              Religion <span className="text-red-500">*</span>
            </label>
            <select
              {...register("religion", { required: "Religion is required" })}
              className="w-full px-1 py-0.5 border border-primary rounded-md"
            >
              <option value="">Select Religion</option>
              <option value="islam">Islam</option>
              <option value="hindu">Hindu</option>
              <option value="christian">Christian</option>
            </select>
            {errors.religion && (
              <p className="text-red-500 text-sm mt-1">
                {errors.religion.message}
              </p>
            )}
          </div>

            {/* Domicile Province */}
            <div className="w-full">
              <label className="text-sm block text-gray-700 font-medium mb-1">
                Domicile Province <span className="text-red-500">*</span>
              </label>

              <select
                {...register("domicileProvince", {
                  required: "Domicile province is required",
                })}
                className="w-full px-1 py-0.5 border border-primary rounded-md outline-none"
              >
                <option value="">Select Province</option>
                <option value="Punjab">Punjab</option>
                <option value="Sindh">Sindh</option>
                <option value="Khyber Pakhtunkhwa">Khyber Pakhtunkhwa</option>
                <option value="Balochistan">Balochistan</option>
                <option value="Gilgit-Baltistan">Gilgit-Baltistan</option>
                <option value="Azad Jammu & Kashmir">Azad Jammu & Kashmir</option>
                <option value="Islamabad Capital Territory">
                  Islamabad Capital Territory
                </option>
              </select          >

              {errors.domicileProvince && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.domicileProvince.message}
                </p>
              )}
            </div>

          {/* Domicile District */}
        <div className="w-full">
          <label className="text-sm block text-gray-700 font-medium mb-1">
            Domicile District <span className="text-red-500">*</span>
          </label>

          <select
            {...register("domicileDistrict", {
              required: "Domicile district is required",
            })}
            disabled={!selectedProvince}  // disable until province selected
            className="w-full px-1 py-0.5 border border-primary rounded-md outline-none disabled:bg-gray-100"
          >
            <option value="">Select District</option>
        
            {selectedProvince &&
              districtsByProvince[selectedProvince]?.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
          </select>
          
          {errors.domicileDistrict && (
            <p className="text-red-500 text-sm mt-1">
              {errors.domicileDistrict.message}
            </p>
          )}
        </div>

          {/* Residence Number */}
          <div className="w-full">
            <label className="text-sm block text-gray-700 font-medium mb-1">
              Residence Number
            </label>
            <input
              type="number"
              {...register("residenceNumber")}
              className="w-full px-1 py-0.5 border border-primary rounded-md outline-none"
            />
          </div>

        </div>

        {/* Row 6 */}
        <div className="flex justify-between items-center gap-4 mt-3">

          {/* Mobile */}
          <div className="w-full">
            <label className="text-sm block text-gray-700 font-medium mb-1">
              Mobile No <span className="text-red-500">*</span>
            </label>
             <input
              type="text"
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  // Supports: 03XXXXXXXXX, +923XXXXXXXXX, 923XXXXXXXXX
                  value: /^(03\d{9}|923\d{9}|\+923\d{9})$/,
                  message: "Enter a valid Pakistani mobile number",
                },
              })}
              className="w-full px-1 py-0.5 border border-primary rounded-md outline-none"
              maxLength={13} // prevents extremely long numbers (optional)
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">{errors.mobile.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="w-full">
            <label className="text-sm block text-gray-700 font-medium mb-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
            //   disabled={true}
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-1 py-0.5 border border-primary rounded-md outline-none"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Employed */}
          <div className="w-full">
            <label className="text-sm block text-gray-700 font-medium mb-1">
              Are you employed?
            </label>
            <div className="px-2 flex gap-5 w-full py-0.5 border border-primary
             rounded-md outline-none">
              <label>
                <input 
                type="radio" 
                value="yes" 
                {...register("employed")}
                className="cursor-pointer mx-2" />
                 Yes
              </label>
              <label>
                <input 
                type="radio" 
                value="no" 
                {...register("employed")}
                className="cursor-pointer mx-2" />
                 No
              </label>
            </div>
          </div>

          {/* Self Finance */}
          <div className="w-full">
            <label className="text-sm block text-gray-700 font-medium mb-1">
              Self-Finance Base
            </label>
            <div className="px-2 flex gap-5 w-full py-0.5 border border-primary
             rounded-md outline-none">
              <label>
                <input 
                type="radio" 
                value="yes"
                 {...register("selfFinance")} 
                 className="cursor-pointer mx-2"
                 /> Yes
              </label>
              <label>
                <input 
                type="radio" 
                value="no" 
                {...register("selfFinance")}
                className="cursor-pointer mx-2" 
                /> No
              </label>
              
            </div>
          </div>

        </div>

      </div>

      </form>

    </div>
  );
}

export default PersonalInfoStep;
