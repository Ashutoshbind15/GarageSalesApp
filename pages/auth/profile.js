import { unstable_getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]";

const Profile = ({ logSession }) => {
  return (
    <div>
      {logSession.user.name}
      {logSession.user.role}
    </div>
  );
};

export const getServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  console.log(session);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      logSession: session,
    },
  };
};

export default Profile;
