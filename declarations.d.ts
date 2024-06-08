declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";

  interface CustomSvgProps extends SvgProps {
    letter: string
    arrow: string
  }

  const content: React.FC<CustomSvgProps>;
  export default content;
}