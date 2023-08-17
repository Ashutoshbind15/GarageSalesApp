import Button from "../../../components/UI/Button";
import connectDB from "../../../utils/db";
import ProductItem from "../../../components/products/Product";
import Product from "../../../models/Product";
import Garage from "../../../models/Garage";
import GarageItem from "../../../components/garages/GarageItem";
import GaragePage from "../../../components/garages/GaragePage";
import { Field, Form, Formik } from "formik";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Auctions from "../../../components/Forms/AuctionForm";
import AuctionForm from "../../../components/Forms/AuctionForm";

const GPage = ({ garage }) => {
  const [show, setShow] = useState(false);
  const router = useRouter();
  const { gid } = router.query;
  return (
    <>
      {garage && (
        <div className="px-6 mt-12">
          <GaragePage
            key={garage._id}
            name={garage.name}
            location={garage.location}
            contact={garage.contact}
            _id={garage._id}
            products={garage.products}
            desc={garage.desc}
          />
        </div>
      )}

      <div className="my-4 flex flex-col items-center">
        {show && (
          <Formik
            initialValues={{
              title: "",
              price: 0,
              quantity: 0,
            }}
            onSubmit={async (val) => {
              await axios.post(`/api/products`, {
                garageId: gid,
                title: val.title,
                price: val.price,
                quantity: val.quantity,
              });
              router.push(`/garages/${gid}`);
            }}
          >
            <Form className="flex flex-col items-center justify-center">
              <label htmlFor="title">Item Name</label>
              <Field
                type="text"
                name="title"
                className="bg-white border-b-2 border-black my-2 focus:outline-none"
                placeholder="title"
                id="title"
              />
              <label htmlFor="price">Price</label>
              <Field
                type="number"
                name="price"
                className="bg-white border-b-2 border-black my-2 focus:outline-none"
                placeholder="price"
                id="price"
              />
              <label htmlFor="qty">Quantity</label>
              <Field
                type="number"
                name="quantity"
                className="bg-white border-b-2 border-black my-2 focus:outline-none"
                placeholder="quantity"
                id="qty"
              />
              <button className="btn mt-6" type="submit">
                Submit
              </button>
            </Form>
          </Formik>
        )}
        <button className="btn my-3" onClick={() => setShow((prev) => !prev)}>
          {show ? "Cancel" : "Add Product?"}
        </button>

        <AuctionForm />
      </div>
    </>
  );
};

export async function getStaticPaths() {
  await connectDB();

  const garages = await Garage.find({});

  const ids = garages.map((el) => ({
    params: { gid: JSON.parse(JSON.stringify(el._id)) },
  }));

  return {
    paths: ids,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  await connectDB();

  const { gid } = context.params;
  const garage = await Garage.findById(gid).populate({
    path: "products",
    options: { limit: 2 },
    Product,
  });

  return {
    props: { garage: JSON.parse(JSON.stringify(garage)) },
    revalidate: 100,
  };
}

export default GPage;
