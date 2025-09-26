import { Typography, Box } from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { useNavigate } from "react-router-dom";

export const CustomTitle = ({ collapsed }: { collapsed: boolean }) => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      alignItems="center"
      p={2}
      sx={{ cursor: "pointer" }}
      onClick={() => navigate("/dashboard")}
    >
      <StorefrontIcon sx={{ mr: collapsed ? 0 : 1 }} />
      {!collapsed && (
        <Typography variant="h6" fontWeight="bold">
          Greek Sales App
        </Typography>
      )}
    </Box>
  );
};
