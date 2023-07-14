import { unstable_getServerSession } from "next-auth";
import React, { useState } from "react";
import User from "../../models/User";
import { authOptions } from "../api/auth/[...nextauth]";
import { useUserMutations } from "../../hooks/mutations";
import { useUser } from "../../hooks/queries";
import GarageList from "../../components/garages/GarageList";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [mail, setMail] = useState("");
  const [contact, setContact] = useState("");
  const { editProfileMutation } = useUserMutations();
  const { data: user } = useUser();
  const [show, setShow] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    editProfileMutation.mutate({
      username,
    });
  };

  return (
    <>
      <div className="flex flex-col items-center py-12 shadow-lg rounded-lg border-t-4">
        <div className="flex items-center justify-around w-1/5">
          <div className="bg-neutral-focus text-white avatar rounded-full flex items-center justify-center w-10">
            <span className="text-3xl">{user?.username?.toUpperCase()[0]}</span>
          </div>

          <h1 className="text-xl font-sans">{user?.username}</h1>
        </div>

        {show && (
          <form
            action=""
            onSubmit={submitHandler}
            className="my-4 flex flex-col"
          >
            <div className="flex flex-col items-center">
              <input
                type="text"
                value={username}
                className="input my-2 bg-white outline-none border-b-2 border-black"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
              />
              <input
                type="number"
                value={contact}
                className="input my-2 bg-white outline-none border-b-2 border-black"
                onChange={(e) => setContact(e.target.value)}
                placeholder="contact"
              />
              <input
                type="text"
                value={mail}
                className="input my-2 bg-white outline-none border-b-2 border-black mb-6"
                onChange={(e) => setMail(e.target.value)}
                placeholder="mail"
              />
            </div>

            <button className="btn btn-primary ">Submit</button>
          </form>
        )}
        <button
          type="button"
          className="btn btn-primary mt-4"
          onClick={() => setShow((e) => !e)}
        >
          {!show ? `Change Profile` : `Cancel`}
        </button>
      </div>

      <h1 className="text-xl text-secondary font-bold text-center mt-4">
        My Garages
      </h1>
      <div className="my-4">
        <GarageList garages={user?.garages} />
      </div>
    </>
  );
};

export const getServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const user = await User.findById(session.user.id)
    .populate({ path: "garages", select: "name location _id contact desc" })
    .select("-password -_id -__v");

  //console.log("server", JSON.parse(JSON.stringify(user)));

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
};

export default Profile;
