import axios from "axios";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";

const NewGarage = () => {
  const rtr = useRouter();

  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex flex-col items-center mt-16">
        <h1 className="text-2xl font-bold text-primary mb-4">Add a garage</h1>
        <Formik
          initialValues={{ name: "", location: "", contact: 0, desc: "" }}
          onSubmit={async (values) => {
            await axios.post("/api/garages", values);
            rtr.push("/");
          }}
        >
          <Form className="my-4 flex flex-col bg-white">
            <Field
              name="name"
              type="text"
              className=" outline-none border-b-2 border-black py-2 px-4 bg-white my-2"
              placeholder="name"
            />
            <Field
              name="location"
              type="text"
              className=" outline-none border-b-2 border-black py-2 px-4 bg-white my-2"
              placeholder="location"
            />
            <Field
              name="desc"
              type="text"
              className=" outline-none border-b-2 border-black py-2 px-4 bg-white my-2"
              placeholder="desc"
            />
            <Field
              name="contact"
              type="number"
              className=" outline-none border-b-2 border-black py-2 px-4 bg-white my-2"
              placeholder="contact"
            />
            <button type="submit" className="btn btn-success">
              Submit
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default NewGarage;
