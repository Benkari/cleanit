import { StyledToggleButton } from "./ToggleButton.styles";
import type { ToggleButtonProps } from "@mui/material/ToggleButton";

const ToggleButton: React.FC<ToggleButtonProps> = (props) => {
  return <StyledToggleButton {...props}>{props.children}</StyledToggleButton>;
};

export default ToggleButton;
