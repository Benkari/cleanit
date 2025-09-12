import React from "react";
import type { TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField";
import { StyledTextField } from "./TextField.styles";

const TextField: React.FC<MuiTextFieldProps> = (props) => {
  return <StyledTextField {...props}>{props.children}</StyledTextField>;
};

export default TextField;
