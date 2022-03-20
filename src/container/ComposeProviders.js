import React from "react";

const ComposeProvider = ({ components, children }) =>
  components.reduceRight(
    (memo, Component) => <Component>{memo}</Component>,
    children
  );

export default ComposeProvider;
