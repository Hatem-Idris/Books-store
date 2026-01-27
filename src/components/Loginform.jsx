import { Form, Field, Formik, ErrorMessage } from "formik";
import { Link} from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import gimg from "../assets/Google__G__logo.svg.png"
import fimg from "../assets/Facebook_Logo_(2019).png"
export default function Loginform() {
  let domain = "https://bookstore.eraasoft.pro/api";
  const handlogin = async (values) => {
    let endpoint = "/login";
    let url = domain + endpoint;
    try {
      const res = await axios.post(url, values);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const loginscheme = Yup.object({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });
  return (
    <div className="flex flex-col justify-center items-center gap-10 bg-[#F5F5F5]">
      <p className="font-semibold textarea-lg font-sans text-[#D9176C] mt-20">
        Welcome Back!
      </p>
      <div className="w-full p-2 md:w-6/12 lg:w-4/12">
        <Formik
          validationSchema={loginscheme}
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            handlogin(values);
          }}
        >
          <Form className="flex flex-col gap-10 font-medium text-black w-full">
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
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
                <input className="w-4 h-4" type="checkbox"></input>
                <span>Remember me</span>
              </div>
              <p className="text-[16px] font-[400] font-sans text-[#D9176C]">
                Forget password?
              </p>
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#D9176C] text-white"
            >
              Log in
            </button>
            <div className="flex gap-1 text-[16px] font-[400] justify-center">
              <p>Don’t have an account?</p>
              <Link to="/Register">
                <span className="text-[#D9176C] hover:underline">Sign up</span>
              </Link>
            </div>
            <p className="text-[#00000080] self-center">or</p>
            <div className="flex flex-col gap-2">
              <button className="w-full py-3 px-4 rounded-xl bg-white text-black flex justify-center items-center gap-2 shadow-[0_1px_3px_0_rgba(97,97,97,0.05),0_5px_5px_0_rgba(97,97,97,0.05)]">
                <img
                  className="w-5 h-5"
                  src={gimg}
                ></img>
                Login with Google
              </button>
              <button className="w-full py-3 px-4 rounded-xl bg-white text-black flex justify-center items-center gap-2 shadow-[0_1px_3px_0_rgba(97,97,97,0.05),0_5px_5px_0_rgba(97,97,97,0.05)]">
                <img
                  className="w-5 h-5"
                  src={fimg}
                ></img>
                Login with Facebook
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
