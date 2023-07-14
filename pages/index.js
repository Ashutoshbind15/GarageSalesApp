import { useRouter } from "next/router";
import AunctionsList from "../components/aunctions/AunctionsList";
import GarageList from "../components/garages/GarageList";
import Aunction from "../models/Aunction";
import Garage from "../models/Garage";
import connectDB from "../utils/db";

export default function Home({ garages, aunctions }) {
  const router = useRouter();

  return (
    <div className="text-2xl">
      <h1 className="text-pink-700 text-center text-3xl my-8 font-bold">
        Welcome to my garage sales app!
      </h1>
      <h1 className="text-pink-700 text-center text-3xl my-8 font-bold">
        Featured garages!
      </h1>
      <div className="flex flex-col">
        <GarageList garages={garages} />
        <button
          onClick={() => router.push("/garages")}
          className="btn btn-primary w-4/5 my-4 self-center"
        >
          View all garages
        </button>
      </div>
      <h1 className="text-pink-700 text-center text-3xl my-8 font-bold">
        Featured auctions!
      </h1>
      <AunctionsList aunctions={aunctions} />
    </div>
  );
}

export const getStaticProps = async () => {
  await connectDB();

  const garages = await Garage.find({ featured: true }).limit(6);
  const aunctions = await Aunction.find({}).limit(4);

  return {
    props: {
      garages: JSON.parse(JSON.stringify(garages)),
      aunctions: JSON.parse(JSON.stringify(aunctions)),
    },
    revalidate: 2,
  };
};
