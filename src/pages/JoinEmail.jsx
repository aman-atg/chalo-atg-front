import React, { useState } from "react";

import Signin from "../components/Signin";
import Signup from "../components/Signup";

const JoinEmail = () => {
  const [isLogin, setIsLogin] = useState(true);

  const onLogin = () => setIsLogin(true);
  const onSignup = () => setIsLogin(false);

  return (
    <div className="JoinEmail">
      {isLogin ? (
        <Signin onChangeMethod={onSignup} />
      ) : (
        <Signup onChangeMethod={onLogin} />
      )}
    </div>
  );
};

// UserAuth page
export default JoinEmail;
