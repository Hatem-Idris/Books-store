import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
export default function Forgetpassword() {
  const loginscheme = Yup.object({
    email: Yup.string().email().required(),
  });
  return (
    <div className="flex flex-col justify-start items-center gap-5 bg-[#F5F5F5] h-dvh">
      <p className="font-semibold textarea-lg font-sans text-[#D9176C] mt-20">
        Forget Password?
      </p>
      <p className="font-normal text-[14px] textarea-lg font-sans text-black/50">
        Enter your email to reset your password
      </p>
      <div className="w-full p-2 md:w-6/12 lg:w-4/12">
        <Formik
          validationSchema={loginscheme}
          initialValues={{ email: "",}}
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
            <button
              type="submit"
              className="w-full py-3 px-4 rounded-xl bg-[#D9176C] text-white cursor-pointer"
            >
              Send reset code
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
