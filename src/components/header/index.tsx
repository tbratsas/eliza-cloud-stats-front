import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useGetIdentity, useLogout } from "@refinedev/core";
import { RefineThemedLayoutHeaderProps } from "@refinedev/mui";
import React, { useContext, useState } from "react";
import { ColorModeContext } from "../../contexts/color-mode";
import { Button } from "@mui/material";

type IUser = {
  id: number;
  name: string;
  avatar: string;
};

export const Header: React.FC<RefineThemedLayoutHeaderProps> = ({
  sticky = true,
}) => {
  const { mode, setMode } = useContext(ColorModeContext);
  const { data: user } = useGetIdentity<IUser>();
  const { mutate: logout } = useLogout();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  return (
    <AppBar position={sticky ? "sticky" : "relative"}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left side placeholder (optional logo or title) */}
        <div />

        {/* Right side: Theme toggle, user info */}
        <Stack direction="row" spacing={2} alignItems="center">
          <IconButton color="inherit" onClick={setMode}>
            {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
          </IconButton>

          {(user?.avatar || user?.name) && (
            <Stack direction="row" alignItems="center" spacing={1}>
              {user?.name && (
                <Typography
                  variant="subtitle2"
                  sx={{
                    display: {
                      xs: "none",
                      sm: "inline-block",
                    },
                  }}
                >
                  {user.name}
                </Typography>
              )}

              <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                <Avatar src={user?.avatar} alt={user?.name} />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem disableGutters>
                  <Button
                    /* variant="outlined" */
                    color="error"
                    fullWidth
                    onClick={handleLogout}
                    sx={{ justifyContent: "flex-start", px: 2 }}
                  >
                    Αποσύνδεση
                  </Button>
                </MenuItem>

              </Menu>
            </Stack>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
