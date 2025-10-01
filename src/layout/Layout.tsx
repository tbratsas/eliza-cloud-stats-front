import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import { CustomTitle } from "./CustomTitle";
import { Header } from "../components";

const drawerWidth = 240;
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { label: "Αρχική σελίδα", path: "/dashboard" },
    { label: "Πωλήσεις ανά προϊόν", path: "/sales_per_product" },
    { label: "Πωλήσεις ανά κατηγορία", path: "/sales_per_category" },
  ];

  const drawer = (
    <Box onClick={isMobile ? handleDrawerToggle : undefined} sx={{ p: 2 }}>
      <CustomTitle collapsed={false} />
      <Divider sx={{ my: 2 }} />
      <List>
        {menuItems.map(({ label, path }) => {
          const isActive = currentPath === path;

          return (
            <ListItem disablePadding key={path}>
              <ListItemButton
                onClick={() => navigate(path)}
                selected={isActive}
                sx={{
                  borderLeft: isActive ? "4px solid red" : "4px solid transparent",
                  backgroundColor: isActive ? "action.selected" : "inherit",
                  pl: 2,
                }}
              >
                <ListItemText
                  primary={label}
                  sx={{ fontWeight: isActive ? "bold" : "normal" }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}

        <ListItem sx={{ mt: 2 }}>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={() => {
              localStorage.removeItem(TOKEN_KEY);
              navigate("/login");
            }}
          >
            Αποσύνδεση
          </Button>
        </ListItem>
      </List>

    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {/* AppBar with menu button */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          {/* <Typography variant="h6" noWrap component="div"> */}
           <Header/>
          {/* </Typography> */}
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="sidebar"
      >
        {/* Mobile Drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }} // Better performance on mobile
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {/* Space for AppBar */}
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
