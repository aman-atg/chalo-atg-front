import { AnimatePresence, motion } from "framer-motion";
import React from "react";

import { ReactComponent as CrossIcon } from "../assets/icons/cross.svg";
import { useSettingsActions } from "../hooks/useActions";

const TermsAndCondition = () => {
  const { toggleShowTnCForAuth } = useSettingsActions();

  const onAction = () => toggleShowTnCForAuth();

  return (
    <AnimatePresence>
      <motion.div
        animate={{ y: 0 }}
        initial={{ y: "50vh" }}
        transition={{
          delay: 1,
          ease: "easeOut",
          duration: 0.5,
        }}
        exit={{ y: "-20vh" }}
        className="termsAndCondition"
      >
        <p>
          By registering on this app, you agree with our{" "}
          <span className="external-link tnC-link">Terms &#38; Conditions</span>{" "}
          and <span className="external-link tnC-link">Privacy Policies</span>
        </p>

        <CrossIcon className="cross-icon" onClick={onAction} />
      </motion.div>
    </AnimatePresence>
  );
};

export default TermsAndCondition;

// By registering on this app, you agree to the
// following terms & conditions and privacy policies
