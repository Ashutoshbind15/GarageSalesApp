import { unstable_getServerSession } from "next-auth";
import React from "react";
import User from "../../models/User";
import { authOptions } from "../api/auth/[...nextauth]";

const Profile = ({ user }) => {
  return <div>{JSON.stringify(user)}</div>;
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
