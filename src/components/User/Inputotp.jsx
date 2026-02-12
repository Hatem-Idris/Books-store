import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function Fieldotp() {
  const navigate = useNavigate();
  let domain = "https://bookstore.eraasoft.pro/api";

  const handlogin = (values) => {
    const otp =
      values.place1 +
      values.place2 +
      values.place3 +
      values.place4 +
      values.place5 +
      values.place6;

    const email = localStorage.getItem("resetEmail");

    localStorage.setItem("resetOtp", otp);
    localStorage.setItem("resetEmail", email);

    toast.success("تم حفظ الـ OTP. انتقل لإدخال كلمة المرور الجديدة");
    console.log({ email, otp });
    navigate("/Newpass");
  };
  const otpscheme = Yup.object({
    place1: Yup.string()
      .matches(/^[0-9]$/, "Must be a single digit")
      .required("Required"),
    place2: Yup.string()
      .matches(/^[0-9]$/, "Must be a single digit")
      .required("Required"),
    place3: Yup.string()
      .matches(/^[0-9]$/, "Must be a single digit")
      .required("Required"),
    place4: Yup.string()
      .matches(/^[0-9]$/, "Must be a single digit")
      .required("Required"),
    place5: Yup.string()
      .matches(/^[0-9]$/, "Must be a single digit")
      .required("Required"),
    place6: Yup.string()
      .matches(/^[0-9]$/, "Must be a single digit")
      .required("Required"),
  });
  return (
    <div className="flex flex-col justify-start items-center gap-5 bg-[#F5F5F5] h-[70vh]">
      <p className="font-semibold textarea-lg font-sans text-[#D9176C] mt-20">
        Reset your password!
      </p>
      <p className="font-normal text-[14px] textarea-lg font-sans text-black/50">
        Enter the 6 digits code that you received on your email
      </p>
      <Formik
        validationSchema={otpscheme}
        initialValues={{
          place1: "",
          place2: "",
          place3: "",
          place4: "",
          place5: "",
          place6: "",
        }}
        onSubmit={(values) => {
          handlogin(values);
        }}
      >
        <Form className="flex flex-col">
          <div className="flex items-center gap-3 md:gap-5">
            <Field
              name="place1"
              type="text"
              maxLength={1}
              className="w-11 h-11 rounded-lg border border-neutral-300 bg-white text-center text-lg font-medium text-neutral-800 outline-none"
            />
            <Field
              name="place2"
              type="text"
              maxLength={1}
              className="w-11 h-11 rounded-lg border border-neutral-300 bg-white text-center text-lg font-medium text-neutral-800 outline-none"
            />
            <Field
              name="place3"
              type="text"
              maxLength={1}
              className="w-11 h-11 rounded-lg border border-neutral-200 bg-white text-center text-lg font-medium text-neutral-800 outline-none"
            />
            <Field
              name="place4"
              type="text"
              maxLength={1}
              className="w-11 h-11 rounded-lg border border-neutral-200 bg-white text-center text-lg font-medium text-neutral-800 outline-none"
            />
            <Field
              name="place5"
              type="text"
              maxLength={1}
              className="w-11 h-11 rounded-lg border border-neutral-200 bg-white text-center text-lg font-medium text-neutral-800 outline-none"
            />
            <Field
              name="place6"
              type="text"
              maxLength={1}
              className="w-11 h-11 rounded-lg border border-neutral-200 bg-white text-center text-lg font-medium text-neutral-800 outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-[#D9176C] text-white cursor-pointer mt-7"
          >
            Reset password
          </button>
          <div className="flex gap-1 text-[16px] font-[400] justify-center mt-7">
            <p>Didn’t receive a code?</p>
            <span className="text-[#D9176C] hover:underline cursor-pointer">
              Send again
            </span>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
