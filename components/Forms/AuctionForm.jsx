import { Field, Form, Formik } from "formik";
import React, { useState } from "react";

const AuctionForm = () => {
  const [show, setShow] = useState(true);

  return (
    <div className="flex flex-col items-center">
      {show && (
        <Formik
          onSubmit={(values) => {
            console.log(values);
          }}
          initialValues={{ title: "", location: "", contact: "" }}
        >
          <Form className="flex flex-col justify-around items-center font-semibold font-serif text-white">
            <label htmlFor="title">Title</label>
            <Field
              name="title"
              className="my-2 rounded-md py-1 px-2"
              id="title"
            />
            <lable htmlFor="location">Location</lable>
            <Field name="location" className="my-2 rounded-md py-1 px-2" />
            <label htmlFor="contact">Contact</label>
            <Field name="contact" className="my-2 rounded-md py-1 px-2" />
            <button type="submit" className="btn">
              Submit
            </button>
          </Form>
        </Formik>
      )}

      <div className="btn text-center mt-4" onClick={() => setShow((p) => !p)}>
        {show ? "Hide add auction" : "Add Auction"}
      </div>
    </div>
  );
};

export default AuctionForm;
