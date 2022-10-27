import connectDB from "../../../utils/db";
import ProductItem from "../../../components/products/Product";
import Garage from "../../../models/Garage";

const GPage = ({ products }) => {
  return (
    <>
      <div className="my-4 bg-gray-400 flex items-center justify-between "></div>

      {products &&
        products.map((el) => (
          <div className="px-6" key={el._id}>
            <ProductItem
              title={el.title}
              price={el.price}
              quantity={el.quantity}
              _id={el._id}
              selected={el.selected}
            />
          </div>
        ))}
    </>
  );
};

export async function getStaticPaths() {
  await connectDB();

  const garages = await Garage.find({});

  const ids = garages.map((el) => ({
    params: { gid: JSON.parse(JSON.stringify(el._id)) },
  }));

  console.log(ids);

  return {
    paths: ids,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  await connectDB();

  console.log("ctx", context);
  const { gid } = context.params;
  const { products } = await Garage.findById(gid, { products: 1 }).populate(
    "products"
  );
  console.log(gid, products);

  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
    revalidate: 100,
  };
}

export default GPage;
