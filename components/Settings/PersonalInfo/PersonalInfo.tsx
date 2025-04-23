"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import customAxios from "@/api/CustomAxios";
import { endpoints } from "@/api/Endpoints";
import { ProfileSchema } from "@/lib/schema/schema";
import SwalToaster from "@/components/SwalToaster/SwalToaster";
import { PencilLine } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setAccountType, setPasscode } from "@/redux/accountTypeSlice";

type ProfileFormValues = z.infer<typeof ProfileSchema>;

const PersonalInfo = () => {
  const [profileImage, setProfileImage] = useState("/imgPlace.jpeg");
  const [enableEdit, setEnableEdit] = useState(false);
  const [getUser, setGetUser] = useState<any>({});
  const queryClient = useQueryClient();
  const accountType = localStorage.getItem("accountType");
  const oldPasscode = useSelector(
    (state: RootState) => state.accountType.passcode
  );
  const dispatch = useDispatch();

  // Set user from localStorage on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      setGetUser(user);
    }
  }, []);

  //console.log("getUser", getUser);

  const editPersonalInfo = useMutation({
    mutationFn: async (value: any) =>
      await customAxios
        .patch(`${endpoints.user}${getUser?.id}/`, value)
        .then((res) => res),
  });

  const changePassCode = useMutation({
    mutationFn: async (value: any) =>
      await customAxios
        .post(endpoints.changepasscode, value)
        .then((res) => res),
  });

  //get personal info data
  const { data: getPersonalData } = useQuery({
    queryKey: ["personalInformation"],
    queryFn: async () =>
      await customAxios
        .get(
          accountType === "employee"
            ? `${endpoints.managements}employees/${getUser?.id}/`
            : `${endpoints.user}${getUser?.id}/`
        )
        .then((res) => res?.data),
    enabled: !!getUser?.id,
  });

  const iconName =
    accountType === "employee"
      ? getPersonalData?.full_name.split(" ")[0][0] +
        getPersonalData?.full_name.split(" ")[1][0]
      : getPersonalData?.first_name[0] + getPersonalData?.last_name[0];

  // React Hook Form with Zod validation
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileSchema),
  });

  const onSubmit = (data: ProfileFormValues) => {
    const { pin } = data;

    const passCodePin = {
      old_passcode: oldPasscode,
      new_passcode: pin,
    };

    !!enableEdit &&
      editPersonalInfo.mutate(data, {
        onSuccess: () => {
          SwalToaster("Personal Information Updated Successfully!", "success");
          queryClient.invalidateQueries({ queryKey: ["personalInformation"] });
          setEnableEdit(false);
          if (pin !== "")
            return changePassCode.mutate(passCodePin, {
              onSuccess: () => {
                dispatch(setPasscode(pin));
                SwalToaster("Passcode Updated Successfully!", "success");
              },
              onError: () => {
                SwalToaster("Failed to update passcode!", "error");
              },
            });
        },
        onError: () => {
          SwalToaster("Failed to update personal information!", "error");
        },
      });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    !!getPersonalData
      ? reset({
          ...getPersonalData,
          license_number: getPersonalData?.pharmacy?.license_number,
        })
      : reset({});
  }, [reset, getPersonalData]);

  return (
    <form
      className="bg-white shadow-lg rounded-xl px-8 2xl:px-12 pt-12 pb-20 flex mt-3 flex-col gap-10 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-start w-full">
        <div className="flex flex-col items-center gap-3">
          <label
            className="text-start w-full max-2xl:text-sm font-medium"
            htmlFor="profileimage"
          >
            Profile Picture
          </label>
          {/* Profile Picture Section */}
          <div className="relative size-40 ">
            {profileImage === "/imgPlace.jpeg" ? (
              <div className="w-full h-full bg-rose-700  rounded-full relative flex justify-center items-center">
                {/* <div className="bg-green-400 w-1/2 h-1/2">jjjj</div> */}
                <span className="text-[#f1f0ef] text-5xl">
                  {typeof iconName === "string" ? iconName : ""}
                </span>
              </div>
            ) : (
              <>
                <Image
                  id="profileimage"
                  width={150}
                  height={100}
                  src={profileImage}
                  alt="Profile"
                  className="rounded-full w-full h-full border border-[#2648EA] object-cover"
                />
                <label
                  htmlFor="profilePic"
                  className="absolute bottom-0 -right-2.5 cursor-pointer"
                >
                  <div className="bg-white rounded-full p-2 border border-[#2648EA]">
                    <PencilLine className=" outline-current text-[#2648EA]" />
                  </div>
                </label>
                <input
                  type="file"
                  id="profilePic"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </>
            )}
          </div>
        </div>
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-3 justify-between gap-8 2xl:gap-x-12 gap-y-7 w-full">
        {/* First Name */}
        <div className="flex flex-col">
          <label
            htmlFor="first_name"
            className="mb-1 font-medium max-2xl:text-sm"
          >
            First Name
          </label>
          <input
            type="text"
            id="first_name"
            {...register("first_name")}
            className={`${
              enableEdit === false
                ? "bg-[#EAEBF0]"
                : "bg-[#FFFF] border-2 border-[#EAEBF0]"
            } placeholder:text-[#858C95] placeholder:text-sm rounded px-4 py-3 ${
              errors.first_name ? "border-red-500" : ""
            }`}
            placeholder="Enter first name"
            disabled={enableEdit === false}
          />
          {errors.first_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.first_name.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div className="flex flex-col">
          <label
            htmlFor="last_name"
            className="mb-1 font-medium max-2xl:text-sm"
          >
            Last Name
          </label>
          <input
            type="text"
            id="last_name"
            {...register("last_name")}
            className={`${
              enableEdit === false
                ? "bg-[#EAEBF0]"
                : "bg-[#FFFF] border-2 border-[#EAEBF0]"
            }
               placeholder:text-[#858C95] placeholder:text-sm rounded px-4 py-3 ${
                 errors.last_name ? "border-red-500" : ""
               }`}
            placeholder="Enter last name"
            disabled={enableEdit === false}
          />
          {errors.last_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.last_name.message}
            </p>
          )}
        </div>

        {/* Other Names */}
        <div className="flex flex-col">
          <label
            htmlFor="other_name"
            className="mb-1 font-medium max-2xl:text-sm"
          >
            Other Name(s)
          </label>
          <input
            type="text"
            id="other_name"
            {...register("other_name")}
            className={`${
              enableEdit === false
                ? "bg-[#EAEBF0]"
                : "bg-[#FFFF] border-2 border-[#EAEBF0]"
            } placeholder:text-[#858C95] placeholder:text-sm rounded px-4 py-3`}
            placeholder="Enter other name(s)"
            disabled={enableEdit === false}
          />
        </div>

        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1 font-medium max-2xl:text-sm">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            {...register("email")}
            className={`${
              enableEdit === false
                ? "bg-[#EAEBF0]"
                : "bg-[#FFFF] border-2 border-[#EAEBF0]"
            } placeholder:text-[#858C95] placeholder:text-sm rounded px-4 py-3 ${
              errors.email ? "border-red-500" : ""
            }`}
            placeholder="Enter email address"
            disabled={enableEdit === false}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="flex flex-col">
          <label
            htmlFor="phone_number"
            className="mb-1 font-medium max-2xl:text-sm"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone_number"
            {...register("phone_number")}
            className={`${
              enableEdit === false
                ? "bg-[#EAEBF0]"
                : "bg-[#FFFF] border-2 border-[#EAEBF0]"
            } placeholder:text-[#858C95] placeholder:text-sm rounded px-4 py-3 ${
              errors.phone_number ? "border-red-500" : ""
            }`}
            placeholder="Enter Phone Number"
            disabled={enableEdit === false}
          />
          {errors.phone_number && (
            <p className="text-red-500 text-sm mt-1">
              {errors.phone_number.message}
            </p>
          )}
        </div>

        {/* PIN */}
        <div className="flex flex-col">
          <label htmlFor="pin" className="mb-1 font-medium max-2xl:text-sm">
            PIN
          </label>
          <input
            type="text"
            id="pin"
            maxLength={4} // This restricts typing more than 4 characters
            {...register("pin", {
              maxLength: {
                value: 4,
                message: "PIN must be exactly 4 characters",
              },
              minLength: {
                value: 4,
                message: "PIN must be exactly 4 characters",
              },
              pattern: {
                value: /^\d{4}$/,
                message: "PIN must be 4 digits",
              },
            })}
            className={`${
              enableEdit === false
                ? "bg-[#EAEBF0]"
                : "bg-[#FFFF] border-2 border-[#EAEBF0]"
            } placeholder:text-[#858C95] placeholder:text-sm rounded px-4 py-3 ${
              errors.pin ? "border-red-500" : ""
            }`}
            placeholder="Enter pin"
          />
          {errors.pin && (
            <p className="text-red-500 text-sm mt-1">{errors.pin.message}</p>
          )}
        </div>

        {/* License Number */}
        {accountType !== "employee" && (
          <div className="col-span-1 flex flex-col">
            <label
              htmlFor="license_number"
              className="mb-1 font-medium max-2xl:text-sm"
            >
              License Number
            </label>
            <input
              type="text"
              id="license_number"
              {...register("license_number")}
              className={`${
                enableEdit === false
                  ? "bg-[#EAEBF0]"
                  : "bg-[#FFFF] border-2 border-[#EAEBF0]"
              } placeholder:text-[#858C95] placeholder:text-sm rounded px-4 py-3 ${
                errors.license_number ? "border-red-500" : ""
              }`}
              placeholder="Enter License Number"
              disabled
            />
            {errors.license_number && (
              <p className="text-red-500 text-sm mt-1">
                {errors.license_number.message}
              </p>
            )}
          </div>
        )}

        <div className="col-span-3 mt-12 flex justify-end w-full gap-3">
          {/* Submit Button */}
          {enableEdit === true && (
            <button
              type="button"
              className={`px-6 py-2 text-white shadow-md w-48 rounded-[0.3rem] bg-[#ea9526] hover:bg-orange-600`}
              onClick={() => reset()}
            >
              Discard
            </button>
          )}

          {enableEdit === false && (
            <button
              type="button"
              onClick={() => setEnableEdit(true)}
              className={`px-6 py-2 text-white shadow-md w-48 rounded-[0.3rem] bg-[#2648EA] hover:bg-blue-600`}
            >
              Edit
            </button>
          )}

          {enableEdit === true && (
            <button
              type="submit"
              className={`px-6 py-2 text-white shadow-md w-48 rounded-[0.3rem] ${
                enableEdit && isDirty
                  ? "bg-[#2648EA] hover:bg-blue-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
              disabled={isDirty === false}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default PersonalInfo;
