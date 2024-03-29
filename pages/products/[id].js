import Router, { useRouter } from "next/router";
import ProductPage from "../../components/products/ProductPage";
import Product from "../../models/Product";
import connectDB from "../../utils/db";

const GPage = ({ product }) => {
  const router = useRouter();

  return (
    <>
      <div className="my-4 bg-gray-400 flex items-center justify-between"></div>

      {product && (
        <div className="px-6">
          <ProductPage
            key={product._id}
            title={product.title}
            price={product.price}
            _id={product._id}
            quantity={product.quantity}
            garage={product.garage}
          />
        </div>
      )}
    </>
  );
};

export async function getStaticPaths() {
  await connectDB();

  const products = await Product.find({});

  const ids = products.map((el) => ({
    params: { id: JSON.parse(JSON.stringify(el._id)) },
  }));

  return {
    paths: ids,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  await connectDB();

  const { id } = context.params;
  const product = await Product.findById(id);

  return {
    props: { product: JSON.parse(JSON.stringify(product)) },
    revalidate: 100,
  };
}

export default GPage;
