import { Button, styled } from "@mui/material";

export const StyledButton = styled(Button)`
  background-color: ${({ theme }) => theme.palette.primary.main};
  color: #fff;
  height: 50px;
  border-radius: ${({ theme }) => theme.shape.borderRadius};
  flex: 1;
  min-height: 50px;
`;
