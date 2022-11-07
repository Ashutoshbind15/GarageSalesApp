import React, { useContext, useEffect, useState } from "react";
import Button from "../../components/UI/Button";
import axios from "axios";
import connectDB from "../../utils/db";
import Product from "../../models/Product";
import ProductItem from "../../components/products/Product";

const ProductPage = ({ products }) => {
  const [prod, setprods] = useState(products);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [price, setPrice] = useState(0);
  const [quantity, setQty] = useState(0);
  const [title, setTitle] = useState("");

  return (
    <>
      <div className="my-4 bg-gray-400 flex items-center justify-between ">
        <select name="" id="" className="flex-1 mx-4">
          <option value="opt1">Option1</option>
          <option value="opt2">Option2</option>
          <option value="opt3">Option3</option>
        </select>

        <div>
          <Button
            className="bg-pink-600 text-white"
            onClick={() => setShowAddProduct((prev) => !prev)}
          >
            Add Products
          </Button>
        </div>
      </div>

      {showAddProduct && (
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const { data } = await axios.post(
              "http://localhost:3000/api/products",
              { price: +price, quantity: +quantity, title, selected: false }
            );

            setprods((prev) => [...prev, data]);
          }}
        >
          <input
            type="text"
            name=""
            id=""
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="number"
            name=""
            id=""
            onChange={(e) => setPrice(+e.target.value)}
          />
          <input
            type="number"
            name=""
            id=""
            onChange={(e) => setQty(e.target.value)}
          />
          <Button className="bg-pink-600 p-2">submit</Button>
        </form>
      )}

      <div className="px-6">
        {prod.map((prod) => (
          <ProductItem
            key={prod._id}
            title={prod.title}
            price={prod.price}
            _id={prod._id}
          />
        ))}
      </div>
    </>
  );
};

export async function getStaticProps() {
  await connectDB();

  const products = await Product.find({});

  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
    revalidate: 15,
  };
}

export default ProductPage;
