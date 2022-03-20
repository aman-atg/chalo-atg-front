import Tippy from "@tippyjs/react";
import PropTypes from "prop-types";
import React from "react";

const Tooltip = ({ children, content, tooltipClass, ...props }) => {
  return (
    <Tippy
      {...props}
      className={`tippy-tooltip-content ${tooltipClass}`}
      content={content}
    >
      {children}
    </Tippy>
  );
};

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  tooltipClass: PropTypes.string,
};

Tooltip.defaultProps = {
  tooltipClass: "",
};

export default Tooltip;
