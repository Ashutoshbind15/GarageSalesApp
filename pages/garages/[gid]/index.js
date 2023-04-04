import Button from "../../../components/UI/Button";
import connectDB from "../../../utils/db";
import ProductItem from "../../../components/products/Product";
import Product from "../../../models/Product";
import Garage from "../../../models/Garage";
import GarageItem from "../../../components/garages/GarageItem";
import GaragePage from "../../../components/garages/GaragePage";

const GPage = ({ garage }) => {
  return (
    <>
      <div className="my-4 bg-gray-400 flex items-center justify-between "></div>

      {garage && (
        <div className="px-6">
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
