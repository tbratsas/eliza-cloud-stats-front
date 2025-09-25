import { useList } from "@refinedev/core";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  CircularProgress,
  Container,
} from "@mui/material";

export const SalesPerProduct = () => {
  //const { data, isLoading, isError } = useList({ resource: "sales_per_product" });
  console.log("SalesPerProduct component loaded");
  const token = localStorage.getItem("auth");

  const { data, isLoading, isError } = useList({
    resource: "sales_per_product",
    meta: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography>Σφάλμα φόρτωσης δεδομένων</Typography>;

  const items = data?.data ?? [];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Δεδομένα Endpoint1</Typography>
      <Table>
        <TableHead>
          <TableRow>
            {/* Replace with your actual field names */}
            <TableCell>ID</TableCell>
            <TableCell>Όνομα</TableCell>
            <TableCell>Τιμή</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item: any) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};
