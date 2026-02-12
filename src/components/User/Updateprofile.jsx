import { useEffect, useState } from "react";
import { Form, Field, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { BsPen } from "react-icons/bs";
import { useAuthStore } from "../Store/Index";

export default function ProfileEdit() {
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const [initialData, setInitialData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
  });

  const [preview, setPreview] = useState("/avatar.png");

  const [imageFile, setImageFile] = useState(null);

  let domain = "https://bookstore.eraasoft.pro/api";

  useEffect(() => {
    axios
      .get(`${domain}/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setInitialData(res.data.data);
        if (res.data.data.image) {
          setPreview(res.data.data.image);
        }
      });
  }, []);

  const handleupdate = async (values) => {
    let endpoint = "/profile/update";
    let url = domain + endpoint;

    const formData = new FormData();

    formData.append("first_name", values.first_name);
    formData.append("last_name", values.last_name);
    formData.append("email", values.email);
    formData.append("phone", values.phone);
    formData.append("address", values.address);

    if (imageFile) {
      formData.append("image", imageFile);
    }

    try {
      const res = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success(res.data.message);
      console.log(res.data);
    } catch (error) {
      console.log(error.response?.data.errors);
    }
  };
  const updatescheme = Yup.object({
    first_name: Yup.string().required("First name is required"),
    last_name: Yup.string().required("Last name is required"),
    email: Yup.string().email().required("E-mail is required"),
    phone: Yup.string()
      .required()
      .matches(/^01[0-9]{9}$/),
    address: Yup.string()
      .min(10, "Address must be at least 10 characters")
      .required("Address is required"),
  });

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImageFile(file);

    const newUrl = URL.createObjectURL(file);

    setPreview((oldPreview) => {
      if (oldPreview?.startsWith("blob:")) {
        URL.revokeObjectURL(oldPreview);
      }
      return newUrl;
    });
  };
  return (
    <>
      {isAuthenticated && (
        <div className="flex flex-col min-h-dvh items-center gap-6 mt-15">
          <div>
            <div className="relative">
              <div className="avatar">
                <label className="w-40 h-40 md:w-44 md:h-44 rounded-full ring-offset-2 border border-[#D9176C] block cursor-pointer overflow-hidden">
                  <img
                    src={preview}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
              <label className="w-8 h-8 flex justify-center items-center text-white bg-[#D9176C] btn-sm absolute bottom-0 right-0 md:bottom-5 md:right-1 rounded-full cursor-pointer">
                <BsPen className="cursor-pointer" />
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          <div className="w-full p-2 md:w-10/12 lg:w-8/12 xl:w-6/12 mt-2">
            <Formik
              enableReinitialize
              validationSchema={updatescheme}
              initialValues={initialData}
              onSubmit={async (values) => {
                handleupdate(values);
              }}
            >
              <Form className="flex flex-col items-center gap-7 md:gap-10 font-medium text-black w-full">
                <div className="flex flex-col w-full gap-6 p-6 md:p-10 bg-white rounded-[20px]">
                  <h3 className="w-full text-center text-[20px] font-[600]">
                    General information
                  </h3>
                  <div className="flex flex-col md:flex-row gap-2 xl:gap-6 mt-10">
                    <div className="flex w-full md:w-6/12 flex-col gap-2 text-[18px] font-medium">
                      <label className="text-black/30" htmlFor="firstname">
                        First name
                      </label>
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
                      <label className="text-black/30" htmlFor="lastname">
                        Last name
                      </label>
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
                    <label className="text-black/30" htmlFor="email">
                      Email
                    </label>
                    <Field
                      name="email"
                      type="text"
                      id="email"
                      placeholder="Johnsmith@gmail.com"
                      className="rounded-lg border border-black/20 p-4 bg-white"
                    ></Field>
                    <ErrorMessage
                      name="email"
                      component={"p"}
                      className="text-red-500 font-medium py-2"
                    />
                  </div>
                  <div className="flex flex-col gap-2 text-[18px] font-medium">
                    <label className="text-black/30" htmlFor="Number">
                      Phone number
                    </label>
                    <Field
                      name="phone"
                      type="text"
                      id="Number"
                      placeholder="123456789"
                      className="rounded-lg border border-black/20 p-4 bg-white"
                    ></Field>
                    <ErrorMessage
                      name="phone"
                      component={"p"}
                      className="text-red-500 font-medium py-2"
                    />
                  </div>
                  <div className="flex flex-col gap-2 text-[18px] font-medium">
                    <label className="text-black/30" htmlFor="Address">
                      Address
                    </label>
                    <Field
                      name="address"
                      type="text"
                      id="Address"
                      placeholder="Maadi, Cairo, Egypt."
                      className="rounded-lg border border-black/20 p-4 bg-white"
                    ></Field>
                    <ErrorMessage
                      name="address"
                      component={"p"}
                      className="text-red-500 font-medium py-2"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-9/12 md:w-6/12 lg:w-4/12 py-3 px-4 mb-5 rounded-xl bg-[#D9176C] text-white cursor-pointer"
                >
                  Update information
                </button>
              </Form>
            </Formik>
          </div>
        </div>
      )}
    </>
  );
}
