import { Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';

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
      <BarChartOutlinedIcon sx={{ mr: collapsed ? 0 : 1 }} />
      {!collapsed && (
        <Typography variant="h6" fontWeight="bold">
          Eliza Reports
        </Typography>
      )}
    </Box>
  );
};
