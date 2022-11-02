import AunctionsList from "../components/aunctions/AunctionsList";
import GarageList from "../components/garages/GarageList";
import Aunction from "../models/Aunction";
import Garage from "../models/Garage";
import connectDB from "../utils/db";

export default function Home({ garages, aunctions }) {
  return (
    <div className="text-2xl ">
      <h1 className="text-pink-700 text-center text-2xl font-bold">
        Welcome to my garage sales app!
      </h1>
      <GarageList garages={garages} />
      <AunctionsList aunctions={aunctions} />
    </div>
  );
}

export const getStaticProps = async () => {
  await connectDB();

  const garages = await Garage.find({ featured: true });
  const aunctions = await Aunction.find({});

  return {
    props: {
      garages: JSON.parse(JSON.stringify(garages)),
      aunctions: JSON.parse(JSON.stringify(aunctions)),
    },
    revalidate: 2,
  };
};
