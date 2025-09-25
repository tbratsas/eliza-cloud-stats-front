import {
  ThemedLayout,
  ThemedTitle,
  ThemedSider,
} from "@refinedev/mui";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  return (
    <ThemedLayout
      Title={() => <ThemedTitle text="Πίνακας Ελέγχου" />}
      Sider={() => (
        <ThemedSider>
          <List>
            <ListItemButton onClick={() => navigate("/sales_per_product")}>
              <ListItemText primary="Endpoint1" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/sales_per_category")}>
              <ListItemText primary="Endpoint2" />
            </ListItemButton>
          </List>
        </ThemedSider>
      )}
    >
      {children}
    </ThemedLayout>
  );
};
