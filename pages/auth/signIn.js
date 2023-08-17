import axios from "axios";
import { Field, Form, Formik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";

const SignIn = () => {
  const router = useRouter();

  const [signup, setSignup] = useState(false);

  return (
    <div>
      {!signup && (
        <Formik
          initialValues={{
            username: "",
            password: "",
          }}
          onSubmit={async (values) => {
            const { username, password } = values;

            await signIn("credentials", {
              redirect: false,
              username: username,
              password: password,
            });

            router.push("/");
          }}
          className="text-white"
        >
          <Form className="flex flex-col w-full justify-center items-center py-32">
            <label htmlFor="username" className="label">
              {" "}
              Name
            </label>
            <Field
              id="username"
              name="username"
              placeholder="Jane"
              className="input w-1/2"
            />

            <label htmlFor="password" className="label">
              Password
            </label>
            <Field
              id="password"
              name="password"
              placeholder="Doe"
              className="input w-1/2"
            />

            <button type="submit" className="btn block mt-4 btn-primary w-2/5">
              Submit
            </button>
            <button
              type="button"
              className="btn text-center bg-green-600 mt-4 w-2/5"
              onClick={() => setSignup((prev) => !prev)}
            >
              Toggle
            </button>
          </Form>
        </Formik>
      )}
      {!!signup && (
        <Formik
          initialValues={{
            username: "",
            password: "",
            contact: 0,
            email: "",
            role: "",
          }}
          onSubmit={async (values) => {
            const { username, password, role, email, contact } = values;

            console.log(values);

            await axios.post("/api/auth/signup", {
              username,
              password,
              email,
              contact,
              // role: process.env.ROLE_BASIC || role,
            });

            await signIn("credentials", {
              redirect: false,
              username: username,
              password: password,
            });

            router.push("/");
          }}
        >
          <Form className="flex flex-col w-full justify-center items-center py-32">
            <label htmlFor="username" className="label">
              {" "}
              Name
            </label>
            <Field
              id="username"
              name="username"
              placeholder="Jane"
              className="input w-1/2"
            />

            <label htmlFor="password" className="label">
              Password
            </label>
            <Field
              id="password"
              name="password"
              placeholder="Doe"
              className="input w-1/2"
            />
            <label htmlFor="email" className="label">
              email
            </label>
            <Field
              id="email"
              name="email"
              placeholder="Doe"
              className="input w-1/2"
            />
            <label htmlFor="contact" className="label">
              contact
            </label>
            <Field
              id="contact"
              name="contact"
              placeholder="Doe"
              className="input w-1/2"
              type="number"
            />
            <label htmlFor="role" className="label">
              role
            </label>
            <Field
              id="role"
              name="role"
              placeholder="Doe"
              className="input w-1/2"
            />

            <button type="submit" className="btn block mt-4 btn-primary w-2/5">
              Submit
            </button>
            <button
              type="button"
              className="btn text-center bg-green-600 mt-4 w-2/5"
              onClick={() => setSignup((prev) => !prev)}
            >
              Toggle
            </button>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default SignIn;
