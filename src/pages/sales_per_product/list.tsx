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
  Box,
  Button,
  Collapse,
} from "@mui/material";
import { useState } from "react";
import PieChart from "./PieChart";

export const SalesPerProduct = () => {
  const [showChart, setShowChart] = useState(false);

  const handleToggle = () => setShowChart((prev) => !prev);
  
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
      <Box mt={3}>
        <Button
          variant="contained"
          onClick={handleToggle}
          disabled={!Array.isArray(items) || items.length === 0}
        >
          {showChart ? "Απόκρυψη Γραφήματος" : "Εμφάνιση Γραφήματος"}
        </Button>

        <Collapse in={showChart}>
          <Box mt={2}>
            <PieChart
              data={items as { product_name: string; total_sales: number }[]}
              title="Πωλήσεις ανα ΠροΪόν"
            />
          </Box>
        </Collapse>
      </Box>
    </Container>

  );
};
