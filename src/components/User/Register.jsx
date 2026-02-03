import { Form, Field, Formik, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import gimg from "../../assets/Google__G__logo.svg.png";
import fimg from "../../assets/Facebook_Logo_(2019).png";
export default function Register() {
  const navigate = useNavigate();
  let domain = "https://bookstore.eraasoft.pro/api";
  const handleregister = async (values) => {
    let endpoint = "/register";
    let url = domain + endpoint;
    try {
      const res = await axios.post(url, values);
      toast.success(res.data.message);
      console.log(res.data);
      return true;
    } catch (error) {
      console.log(error.data);
      return false;
    }
  };
  const registerscheme = Yup.object({
    first_name: Yup.string().required(),
    last_name: Yup.string().required(),
    email: Yup.string().email().required(),
    password: Yup.string()
      .required()
      .min(8, "Password must be at least 8 characters"),
    password_confirmation: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Required"),
  });
  const [checked, setChecked] = useState(false);
  return (
    <div className="flex flex-col justify-center items-center gap-10 bg-[#F5F5F5]">
      <div className="w-full p-2 lg:w-6/12 xl:4/12">
        <Formik
          validationSchema={registerscheme}
          initialValues={{
            first_name: "",
            last_name: "",
            email: "",
            password: "",
            password_confirmation: "",
          }}
          onSubmit={async (values) => {
            if (!checked) {
              alert("Please confirm on agreement first");
              return;
            }
            const success = await handleregister(values);
            if (success) {
              navigate("/Login");
            }
          }}
        >
          <Form className="flex flex-col gap-10 font-medium text-black w-full">
            <div className="flex flex-col md:flex-row gap-2 xl:gap-6 mt-20">
              <div className="flex w-full md:w-6/12 flex-col gap-2 text-[18px] font-medium">
                <label htmlFor="firstname">First name</label>
                <Field
                  name="first_name"
                  type="text"
                  id="firstname"
                  placeholder="John"
                  className="rounded-lg border border-black/20 p-4 bg-white"
                ></Field>
                <ErrorMessage
                  name="first_name"
                  component={"p"}
                  className="text-red-500 font-medium py-2"
                />
              </div>
              <div className="flex w-full md:w-6/12 flex-col gap-2 text-[18px] font-medium">
                <label htmlFor="lastname">Last name</label>
                <Field
                  name="last_name"
                  type="text"
                  id="lastname"
                  placeholder="Smith"
                  className="rounded-lg border border-black/20 p-4 bg-white"
                ></Field>
                <ErrorMessage
                  name="last_name"
                  component={"p"}
                  className="text-red-500 font-medium py-2"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 text-[18px] font-medium">
              <label htmlFor="email">E-mail</label>
              <Field
                name="email"
                type="text"
                id="email"
                placeholder="example@gmail.com"
                className="rounded-lg border border-black/20 p-4 bg-white"
              ></Field>
              <ErrorMessage
                name="email"
                component={"p"}
                className="text-red-500 font-medium py-2"
              />
            </div>
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
                <div className="flex gap-2 items-center mt-2">
                  <input
                    className="w-4 h-4"
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => setChecked(e.target.checked)}
                  ></input>
                  <span>
                    Agree with
                    <span className="text-[#D9176C] ml-0.5">
                      Terms & Conditions
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#D9176C] text-white cursor-pointer"
            >
              Register
            </button>
            <div className="flex gap-1 text-[16px] font-[400] justify-center">
              <p>Already have an account?</p>
              <Link to="/Login">
                <span className="text-[#D9176C] hover:underline">Login</span>
              </Link>
            </div>
            <p className="text-[#00000080] self-center">or</p>
            <div className="flex flex-col gap-2">
              <button className="w-full py-3 px-4 rounded-xl bg-white text-black flex justify-center items-center gap-2 cursor-pointer shadow-[0_1px_3px_0_rgba(97,97,97,0.05),0_5px_5px_0_rgba(97,97,97,0.05)]">
                <img className="w-5 h-5" src={gimg}></img>
                Login with Google
              </button>
              <button className="w-full py-3 px-4 rounded-xl bg-white text-black flex justify-center items-center gap-2 cursor-pointer shadow-[0_1px_3px_0_rgba(97,97,97,0.05),0_5px_5px_0_rgba(97,97,97,0.05)]">
                <img className="w-5 h-5" src={fimg}></img>
                Login with Facebook
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
