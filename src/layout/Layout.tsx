import { ThemedLayout, ThemedSider } from "@refinedev/mui";
import { CustomTitle } from "./CustomTitle"; // adjust path
import { Box, List, ListItem, Button, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY;

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <ThemedLayout
      Sider={() => (
        <Box sx={{ width: 240, bgcolor: "background.paper", height: "100vh" }}>
          <CustomTitle collapsed={false} />
          <List>
            <ListItemButton onClick={() => navigate("/dashboard")}>
              <ListItemText
                primary="Αρχική σελίδα"
                slotProps={{
                  primary: {
                    sx: {
                      fontWeight: currentPath === "/dashboard" ? "bold" : "normal",
                    },
                  },
                }} />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/sales_per_product")}>
              <ListItemText
                primary="Πωλήσεις ανά προϊόν"
                slotProps={{
                  primary: {
                    sx: {
                      fontWeight: currentPath === "/sales_per_product" ? "bold" : "normal",
                    },
                  },
                }} />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/sales_per_category")}>
              <ListItemText
                primary="Πωλήσεις ανά κατηγορία"
                slotProps={{
                  primary: {
                    sx: {
                      fontWeight: currentPath === "/sales_per_category" ? "bold" : "normal",
                    },
                  },
                }}
              />
            </ListItemButton>
            <ListItem>
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
      )}
    >
      {children}
    </ThemedLayout>
  );
};
