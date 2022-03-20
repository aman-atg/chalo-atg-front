import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import { useUserActions } from "../hooks/useActions";

const Signin = ({ onChangeMethod }) => {
  const { handleSubmit, control } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "aman.atg001@gmail.com",
      password: "amanaman",
    },
  });
  const { getAuth } = useUserActions();

  const onSubmit = async (data) => {
    console.log({ data });
    getAuth(data);
  };

  return (
    <div className="Signin AuthFormContainer">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Welcome</h1>

        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <TextField
              label="Email"
              inputProps={{ style: { fontSize: 18 } }}
              InputLabelProps={{ style: { fontSize: 18 } }}
              variant="outlined"
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <TextField
              type="password"
              label="Password"
              inputProps={{ style: { fontSize: 18 } }}
              InputLabelProps={{ style: { fontSize: 18 } }}
              variant="outlined"
              {...field}
            />
          )}
        />
        <button type="submit">Sign in</button>
      </form>
      <div className="AuthFormContainer__footer">
        Don&apos;t have an account?{" "}
        <button onClick={onChangeMethod}>Sign up</button>
      </div>
    </div>
  );
};

export default Signin;

Signin.propTypes = {
  onChangeMethod: PropTypes.func.isRequired,
};
