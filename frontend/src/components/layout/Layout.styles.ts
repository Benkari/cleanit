import { Box, Menu, MenuItem, styled } from "@mui/material";
import AppBar from "@mui/material/AppBar";

export const StyledAppBar = styled(AppBar)`
  background-color: #fff;
  box-shadow: none;
  border-bottom: solid 1px ${({ theme }) => theme.palette.secondary.dark};
`;

export const Container = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;
  padding: 0 40px;
`;

export const StyledMenu = styled(Menu)`
  margin-top: 42px;

  & .MuiPaper-root {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
`;
export const StyledMenuItem = styled(MenuItem)``;
