import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { Controller, useForm } from "react-hook-form";

import { useUserActions } from "../hooks/useActions";

const Signup = ({ onChangeMethod }) => {
  const { handleSubmit, control } = useForm({ mode: "onChange" });
  const { getAuth } = useUserActions();

  const onSubmit = async (data) => {
    console.log({ data });
    getAuth(data);
  };

  return (
    <div className="Signup AuthFormContainer">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Create your Account</h1>

        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextField
              label="Name"
              inputProps={{ style: { fontSize: 18 } }}
              InputLabelProps={{ style: { fontSize: 18 } }}
              variant="outlined"
              {...field}
            />
          )}
        />

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
        <button type="submit">Submit</button>
      </form>

      <div className="AuthFormContainer__footer">
        Already have an account?{" "}
        <button onClick={onChangeMethod}>Sign in</button>
      </div>
    </div>
  );
};

export default Signup;

Signup.propTypes = {
  onChangeMethod: PropTypes.func.isRequired,
};
