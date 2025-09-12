import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import {
  Container,
  StyledAppBar,
  StyledMenu,
  StyledMenuItem,
} from "./Layout.styles";
import { LogoText } from "../../pages/login/Login.styles";
import { useAuth } from "../../auth/authContext";

const settings = ["Logout"];

const Appbar: React.FC = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleClickSetting = () => {
    logout();
    handleCloseUserMenu();
  };

  return (
    <StyledAppBar position="sticky">
      <Toolbar disableGutters>
        <Container>
          <LogoText onClick={() => navigate("/")}>Clean It! AG</LogoText>

          {user && (
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="SRemy Sharp" />
              </IconButton>
            </Tooltip>
          )}
          <StyledMenu
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {settings.map((setting) => (
              <StyledMenuItem key={setting} onClick={handleClickSetting}>
                <Typography sx={{ textAlign: "center" }}>{setting}</Typography>
              </StyledMenuItem>
            ))}
          </StyledMenu>
        </Container>
      </Toolbar>
    </StyledAppBar>
  );
};

const Layout: React.FC = () => {
  return (
    <>
      <Appbar />
      <Outlet />
    </>
  );
};

export default Layout;
