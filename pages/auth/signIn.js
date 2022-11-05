import { signIn } from "next-auth/react";
import React, { useState } from "react";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submissionHandler = async (e) => {
    e.preventDefault();

    await signIn("credentials", {
      redirect: false,
      username: username,
      password: password,
    });
  };

  return (
    <div>
      <form action="" onSubmit={submissionHandler}>
        <input
          type="text"
          name=""
          id=""
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          name=""
          id=""
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Sign in</button>
      </form>
    </div>
  );
};

export default SignIn;
