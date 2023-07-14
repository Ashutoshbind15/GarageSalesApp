import Button from "../../components/UI/Button";
import connectDB from "../../utils/db";

import Garage from "../../models/Garage";
import GarageItem from "../../components/garages/GarageItem";

const ProductPage = ({ garages }) => {
  return (
    <>
      <div className="my-4 bg-gray-400 flex items-center justify-between"></div>

      <div className="px-6">
        {garages.map((gar) => (
          <GarageItem
            key={gar._id}
            name={gar.name}
            location={gar.location}
            contact={gar.contact}
            id={gar._id}
          />
        ))}
      </div>
    </>
  );
};

export async function getStaticProps() {
  await connectDB();

  const garages = await Garage.find({});

  return {
    props: { garages: JSON.parse(JSON.stringify(garages)) },
    revalidate: 1800,
  };
}

export default ProductPage;
