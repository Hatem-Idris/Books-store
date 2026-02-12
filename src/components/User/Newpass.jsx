import { Form, Field, Formik, ErrorMessage } from "formik";
import axios from "axios";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function Newpassword() {
  const navigate=useNavigate()
  let domain = "https://bookstore.eraasoft.pro/api";
  const handlereset = async (values) => {
    let endpoint = "/reset-password";
    let url = domain + endpoint;
    const email = localStorage.getItem("resetEmail");
    const otp = localStorage.getItem("resetOtp");

    const data = {
      email,
      otp,
      password: values.password,
      password_confirmation: values.password_confirmation,
    };
    try {
      const res = await axios.post(url, data);
      toast.success(res.data.message);
      navigate("/Login")
      localStorage.clear()
      sessionStorage.clear()
      console.log(res.data);
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };
  const registerscheme = Yup.object({
    password: Yup.string()
      .required()
      .min(8, "Password must be at least 8 characters"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
  });
  return (
    <div className="flex flex-col justify-start items-center gap-5 bg-[#F5F5F5] h-dvh">
      <p className="font-semibold textarea-lg font-sans text-[#D9176C] mt-20">
        Create new password!
      </p>
      <div className="flex flex-col text-center">
        <p className="font-normal text-[14px] textarea-lg font-sans text-black/50">
          Create a strong password
        </p>
        <p className="font-normal text-[14px] textarea-lg font-sans text-black/50">
          Your new password must be different from previous one
        </p>
      </div>
      <div className="w-full p-2 md:w-6/12 xl:w-4/12">
        <Formik
          validationSchema={registerscheme}
          initialValues={{
            password: "",
            password_confirmation: "",
            rememberMe: false,
          }}
          onSubmit={(values) => {
            handlereset(values);
          }}
        >
          <Form className="flex flex-col gap-10 font-medium text-black w-full">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2 text-[18px] font-medium">
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  type="password"
                  id="password"
                  placeholder="Enter password"
                  className="rounded-lg border border-black/20 p-4 bg-white"
                ></Field>
                <p className="font-normal text-[14px] textarea-lg font-sans text-black/50">
                  Must be at least 8 characterss
                </p>
                <ErrorMessage
                  name="password"
                  component={"p"}
                  className="text-red-500 font-medium py-2"
                />
              </div>
              <div className="flex flex-col gap-2 text-[18px] font-medium">
                <label htmlFor="confirm">Confirm passowrd</label>
                <Field
                  name="password_confirmation"
                  type="password"
                  id="confirm"
                  placeholder="Enter password"
                  className="rounded-lg border border-black/20 p-4 bg-white"
                ></Field>
                <ErrorMessage
                  name="password_confirmation"
                  component={"p"}
                  className="text-red-500 font-medium py-2"
                />
                <div className="flex gap-2 items-center">
                  <Field
                    name="rememberMe"
                    className="w-4 h-4"
                    type="checkbox"
                    id="rememberme"
                  ></Field>
                  <label htmlFor="rememberme">Remember me</label>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#D9176C] text-white cursor-pointer"
            >
              Register
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
