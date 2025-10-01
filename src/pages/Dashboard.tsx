import { Button, Container, Typography, List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
    return (
        <Container sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>Αναφορές Eliza</Typography>
            <hr></hr>
            <Typography variant="body1" gutterBottom>
                Χρησιμοποιήστε τις επιλογές στα αριστερά για να περιηγηθείτε στην εφαρμογή.
            </Typography>
        </Container>
    );
};
