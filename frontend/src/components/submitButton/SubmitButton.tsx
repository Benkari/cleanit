import { StyledButton } from "./SubmitButton.styles";
import type { ButtonProps } from "@mui/material/Button";

const SubmitButton: React.FC<ButtonProps> = (props) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default SubmitButton;
