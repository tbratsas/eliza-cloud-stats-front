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
      Title={() => <ThemedTitle text="Πίνακας Ελέγχου" collapsed={false} />}
      Sider={() => (
        <ThemedSider
          activeItemDisabled={false}
          siderItemsAreCollapsed={false}
          render={() => (
            <List>
              <ListItemButton onClick={() => navigate("/sales_per_product")}>
                <ListItemText primary="Πωλήσεις ανά προϊόν" />
              </ListItemButton>
              <ListItemButton onClick={() => navigate("/sales_per_day")}>
                <ListItemText primary="Πωλήσεις ανά ημέρα" />
              </ListItemButton>
            </List>
          )}
        />

      )}
    >
      {children}
    </ThemedLayout>
  );
};
