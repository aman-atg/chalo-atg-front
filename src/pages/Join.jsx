import { AnimatePresence, motion } from "framer-motion";
import PropTypes from "prop-types";
import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { ReactComponent as EmailIcon } from "../assets/icons/email.svg";
import { ReactComponent as FbIcon } from "../assets/icons/fb.svg";
import { ReactComponent as GoogleIcon } from "../assets/icons/google.svg";
import { ReactComponent as RightIcon } from "../assets/icons/right.svg";
import { ReactComponent as RightArrowIcon } from "../assets/icons/rightArrow.svg";
import { ReactComponent as CoverIcon } from "../assets/imgs/authImg.svg";
import TermsAndCondition from "../components/TermsAndCondition";

const LoginMethod = ({ icon, text, name, url = "", disable }) => {
  const history = useHistory();

  const handleClick = () => {
    if (url) {
      history.push(url);
    }

    // if(name === "google"){
  };
  return (
    <button
      onClick={handleClick}
      style={disable ? { background: "#D9D9D8", color: "#AEAEAF" } : {}}
      className={`social social-${name}`}
    >
      <div className="social_icon">{icon}</div>
      <p>{text}</p>
      <RightIcon className="social-right" />
    </button>
  );
};

LoginMethod.propTypes = {
  icon: PropTypes.element.isRequired,
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  url: PropTypes.string,
  disable: PropTypes.bool,
};

const Join = () => {
  const { showTnCForAuth } = useSelector((state) => state.setting);
  const history = useHistory();
  return (
    <AnimatePresence>
      <div className="Join">
        <motion.div>
          <motion.div
            animate={{ x: 0, opacity: 1 }}
            initial={{ x: "-20vw", opacity: 0 }}
            transition={{
              delay: 0.5,
              ease: "easeOut",
              duration: 0.3,
            }}
            className="Join_header"
          >
            <h1>Welcome to Chalo ATG</h1>
            <p>The New Way Of Bus Travel</p>
          </motion.div>
          <motion.div
            animate={{ x: 0, rotate: 0 }}
            initial={{ x: "-40vw", rotate: "120deg" }}
            transition={{
              ease: "easeOut",
              duration: 0.75,
            }}
            // exit={{ x: "-20vw", rotate: "50deg" }}
            className="Join_body"
          >
            <LoginMethod
              icon={<GoogleIcon />}
              text="Continue with Google"
              name="google"
              disable
            />

            <LoginMethod
              icon={<FbIcon />}
              text="Continue with Facebook"
              name="facebook"
              disable
            />

            <LoginMethod
              icon={<EmailIcon />}
              text="Continue with Email"
              name="email"
              url="/join/email"
            />
          </motion.div>

          <motion.div
            animate={{ y: 0, opacity: 1 }}
            initial={{ y: "-50px", opacity: 0 }}
            transition={{
              delay: 1.5,
              ease: "easeOut",
              duration: 0.3,
            }}
            className="Join_footer"
          >
            <div
              className="container"
              onClick={() => {
                history.push("/");
              }}
              onKeyDown={() => {
                history.push("/");
              }}
              tabIndex="0"
              role="button"
            >
              <span className="guest-login">Guest Login</span>
              <RightArrowIcon className="guest-right" />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: 0 }}
          initial={{ y: "100vh" }}
          transition={{
            delay: 0.5,
            ease: "easeOut",
            duration: 0.65,
          }}
          className="Join_cover"
        >
          <CoverIcon style={{ width: "100%" }} />
        </motion.div>
      </div>

      {showTnCForAuth && <TermsAndCondition />}
    </AnimatePresence>
  );
};

export default Join;
