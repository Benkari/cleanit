import { StyledSwitch } from "./Switch.styles";
import type { SwitchProps } from "@mui/material/Switch";

const Switch: React.FC<SwitchProps> = (props) => {
  return <StyledSwitch {...props} />;
};

export default Switch;
