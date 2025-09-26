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
  const token = localStorage.getItem("auth");

  const queryResult = useList({
    resource: "sales_per_product",
    meta: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  //console.log(queryResult)

  const { data, isLoading, isError } = queryResult.query

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography>Σφάλμα φόρτωσης δεδομένων</Typography>;

  const items = data?.data ?? [];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>Πωλήσεις Προϊόντων</Typography>
      <Table>
        <TableHead>
          <TableRow>
            {/* Replace with your actual field names */}
            <TableCell>Product ID</TableCell>
            <TableCell>Όνομα</TableCell>
            <TableCell>Ποσότητα</TableCell>
            <TableCell>Συνολικές Πωλήσεις</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item: any) => (
            <TableRow key={item.product_id}>
              <TableCell>{item.product_id}</TableCell>
              <TableCell>{item.product_name}</TableCell>
              <TableCell>{item.total_quantity}</TableCell>
              <TableCell>{item.total_sales} Euros</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};
