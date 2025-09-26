import { ThemedLayout, ThemedSider } from "@refinedev/mui";
import { CustomTitle } from "./CustomTitle"; // adjust path
import { Box, List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  return (
     <ThemedLayout
      Sider={() => (
        <Box sx={{ width: 240, bgcolor: "background.paper", height: "100vh" }}>
          <CustomTitle collapsed={false} />
          <List>
            <ListItemButton onClick={() => navigate("/dashboard")}>
              <ListItemText primary="Αρχική σελίδα" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/sales_per_product")}>
              <ListItemText primary="Πωλήσεις ανά προϊόν" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/sales_per_category")}>
              <ListItemText primary="Πωλήσεις ανά κατηγορία" />
            </ListItemButton>
            <ListItemButton onClick={() => {
              localStorage.removeItem("auth");
              navigate("/login");
            }}>
              <ListItemText primary="Αποσύνδεση" />
            </ListItemButton>
          </List>
        </Box>
      )}
    >
      {children}
    </ThemedLayout>
  );
};
