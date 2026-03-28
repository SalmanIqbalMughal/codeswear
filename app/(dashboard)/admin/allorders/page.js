'use client';
import { Grid, Paper } from "@mui/material";
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

import { useEffect, useState } from "react";
import OrdersList from "../../components/dashboard/OrdersList";

const Page = () => {

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch('/api/allOrders').then(resp => resp.json()).then(r => {
      setOrders(r.orders);
      // console.log(products);
    }).catch(error => console.error());
  }, [])

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <OrdersList pagetitle='All Orders' orders={orders} />
      </Grid>
    </Grid>
  );
}

export default Page
