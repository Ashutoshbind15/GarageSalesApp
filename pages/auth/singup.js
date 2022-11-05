import axios from "axios";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submissionHandler = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:3000/api/auth/signup", {
      username,
      password,
      role: process.env.ROLE_BASIC,
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

        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;
