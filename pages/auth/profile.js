import { unstable_getServerSession } from "next-auth";
import React, { useState } from "react";
import User from "../../models/User";
import { authOptions } from "../api/auth/[...nextauth]";
import { useUserMutations } from "../../hooks/mutations";
import { useUser } from "../../hooks/queries";

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
    <div className="flex flex-col items-center py-12 shadow-lg rounded-lg border-t-4">
      <div className="flex items-center justify-around w-1/5">
        <div className="bg-neutral-focus text-white avatar rounded-full flex items-center justify-center w-10">
          <span className="text-3xl">{user?.username?.toUpperCase()[0]}</span>
        </div>

        <h1 className="text-xl font-sans">{user?.username}</h1>
      </div>

      {show && (
        <form action="" onSubmit={submitHandler} className="my-4">
          <div className="flex flex-col">
            <input
              type="text"
              value={username}
              className="input my-2"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="number"
              value={contact}
              className="input my-2"
              onChange={(e) => setContact(e.target.value)}
            />
            <input
              type="text"
              value={mail}
              className="input my-2"
              onChange={(e) => setMail(e.target.value)}
            />
          </div>

          <button className="btn btn-primary">Submit</button>
        </form>
      )}

      <button
        type="button"
        className="btn btn-primary mt-4"
        onClick={() => setShow((e) => !e)}
      >
        Change Profile
      </button>
    </div>
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

  const user = await User.findById(session.user.id).select(
    "-password -_id -__v"
  );
  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
};

export default Profile;
