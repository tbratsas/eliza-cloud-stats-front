import React, { useContext, useState } from "react";
import {
  Toolbar,
  Stack,
  IconButton,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import DarkModeOutlined from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlined from "@mui/icons-material/LightModeOutlined";
import { useGetIdentity, useLogout } from "@refinedev/core";
import { ColorModeContext } from "../../contexts/color-mode";

type IUser = { id: number; name: string; avatar: string };

export const Header: React.FC = () => {
  const { mode, setMode } = useContext(ColorModeContext);
  const { data: user } = useGetIdentity<IUser>();
  const { mutate: logout } = useLogout();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    handleMenuClose();
    logout();
  };

  return (
    <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: 0 }}>
      {/* Left placeholder */}
      <Box />

      {/* Right content */}
      <Stack direction="row" spacing={2} alignItems="center">
        <IconButton color="inherit" onClick={setMode}>
          {mode === "dark" ? <LightModeOutlined /> : <DarkModeOutlined />}
        </IconButton>

        {(user?.avatar || user?.name) && (
          <Stack direction="row" alignItems="center" spacing={1}>
            {user?.name && (
              <Typography
                variant="subtitle2"
                sx={{ display: { xs: "none", sm: "inline-block" } }}
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
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <MenuItem disableGutters>
                <Button
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
  );
};
