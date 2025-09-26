import { Button, Container, Typography, List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("auth"); // or TOKEN_KEY
        navigate("/login");
    };

    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Καλώς ήρθατε στον πίνακα ελέγχου</Typography>

            {/* <List>
                <ListItemButton onClick={() => navigate("/sales_per_product")}>
                    <ListItemText primary="Πωλήσεις ανά προϊόν" />
                </ListItemButton>
                <ListItemButton onClick={() => navigate("/sales_per_category")}>
                    <ListItemText primary="Πωλήσεις ανά κατηγορία" />
                </ListItemButton>
                <ListItemButton onClick={() => navigate("/dashboard")}>
                    <ListItemText primary="Αρχική σελίδα" />
                </ListItemButton>
            </List>

            <Button variant="outlined" color="error" onClick={handleLogout} sx={{ mt: 2 }}>
                Αποσύνδεση
            </Button> */}
        </Container>
    );
};
