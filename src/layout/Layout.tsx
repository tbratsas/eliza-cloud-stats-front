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
  ListItemIcon,
  ListItemText,
  Toolbar,
  useTheme,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CategoryIcon from "@mui/icons-material/Category";
import { useNavigate, useLocation } from "react-router-dom";
import { CustomTitle } from "./CustomTitle";
import { Header } from "../components";

const drawerWidth = 240;
const collapsedWidth = 120;
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // On mobile, sidebar should always be expanded
  const effectiveCollapsed = isMobile ? false : collapsed;

  const menuItems = [
    { label: "Αρχική σελίδα", path: "/dashboard", icon: <DashboardIcon /> },
    { label: "Πωλήσεις ανά προϊόν", path: "/sales_per_product", icon: <ShoppingCartIcon /> },
    { label: "Πωλήσεις ανά κατηγορία", path: "/sales_per_category", icon: <CategoryIcon /> },
  ];

  const drawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Top Section */}
      <Box sx={{ p: 2, flexGrow: 1 }}>
        <CustomTitle collapsed={effectiveCollapsed} />
        <Divider sx={{ my: 2 }} />

        <List>
          {menuItems.map(({ label, path, icon }) => {
            const isActive = currentPath === path;

            return (
              <ListItem disablePadding key={path}>
                <Tooltip title={effectiveCollapsed ? label : ""} placement="right">
                  <ListItemButton
                    onClick={() => navigate(path)}
                    selected={isActive}
                    sx={{
                      pl: effectiveCollapsed ? 0 : 2,
                      justifyContent: effectiveCollapsed ? "center" : "flex-start",
                      borderLeft: isActive ? "4px solid red" : "4px solid transparent",
                      backgroundColor: isActive ? "action.selected" : "inherit",
                      "&:hover": { backgroundColor: "action.hover" },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: effectiveCollapsed ? 0 : 2,
                        display: "flex",
                        justifyContent: "center",
                        color: isActive ? "primary.main" : "inherit",
                      }}
                    >
                      {icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={label}
                      sx={{
                        display: effectiveCollapsed ? "none" : "block",
                        fontWeight: isActive ? "bold" : "normal",
                      }}
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Bottom Section */}
      <Box sx={{ p: 2, mt: "auto", display: "flex", flexDirection: "column", gap: 1 }}>
        {/* Logout Button */}
        <Tooltip title={effectiveCollapsed ? "Αποσύνδεση" : ""} placement="right">
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              localStorage.removeItem(TOKEN_KEY);
              navigate("/login");
            }}
            sx={{
              width: effectiveCollapsed ? `${collapsedWidth}px` : "100%",
              minHeight: 40,
              display: "flex",
              justifyContent: "center",
              px: 0,
            }}
          >
            {effectiveCollapsed ? <LogoutIcon /> : "Αποσύνδεση"}
          </Button>
        </Tooltip>

        {/* Collapse/Expand Button (Desktop only) */}
        {!isMobile && (
          <IconButton
            onClick={() => setCollapsed((prev) => !prev)}
            sx={{ alignSelf: effectiveCollapsed ? "center" : "flex-end" }}
          >
            {effectiveCollapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        )}
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{
          width: { xs: "100%", md: `calc(100% - ${effectiveCollapsed ? collapsedWidth : drawerWidth}px)` },
          ml: { md: `${effectiveCollapsed ? collapsedWidth : drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ px: { xs: 2, md: 1 } }}>
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

          {/* Header stretched across */}
          <Box sx={{ flexGrow: 1 }}>
            <Header />
          </Box>
        </Toolbar>
      </AppBar>


      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { md: effectiveCollapsed ? collapsedWidth : drawerWidth }, flexShrink: { md: 0 } }}
        aria-label="sidebar"
      >
        {/* Mobile Drawer (temporary) */}
        {isMobile && (
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{
              "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
            }}
          >
            {drawerContent}
          </Drawer>
        )}

        {/* Desktop Drawer (permanent) */}
        {!isMobile && (
          <Drawer
            variant="permanent"
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: effectiveCollapsed ? collapsedWidth : drawerWidth,
                transition: "width 0.3s",
                overflowX: "hidden",
              },
            }}
            open
          >
            {drawerContent}
          </Drawer>
        )}
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { xs: "100%", md: `calc(100% - ${effectiveCollapsed ? collapsedWidth : drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};
