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

import ProductsList from "../../components/dashboard/ProductsList";
import { useEffect, useState } from "react";

const Page = () => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('/api/products', { cache: 'no-cache' }).then(resp => resp.json()).then(r => {
      setProducts(r.products);
      // console.log(products);
    }).catch(error => console.error());
  }, [])

  // const products = [
  //   {
  //     id: "1",
  //     name: "Sunil Joshi",
  //     post: "Web Designer",
  //     pname: "Elite Admin",
  //     priority: "Low",
  //     pbg: "primary.main",
  //     budget: "3.9",
  //   },
  //   {
  //     id: "2",
  //     name: "Andrew McDownland",
  //     post: "Project Manager",
  //     pname: "Real Homes WP Theme",
  //     priority: "Medium",
  //     pbg: "secondary.main",
  //     budget: "24.5",
  //   },
  //   {
  //     id: "3",
  //     name: "Christopher Jamil",
  //     post: "Project Manager",
  //     pname: "MedicalPro WP Theme",
  //     priority: "High",
  //     pbg: "error.main",
  //     budget: "12.8",
  //   },
  //   {
  //     id: "4",
  //     name: "Nirav Joshi",
  //     post: "Frontend Engineer",
  //     pname: "Hosting Press HTML",
  //     priority: "Critical",
  //     pbg: "success.main",
  //     budget: "2.4",
  //   },
  // ];

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <ProductsList pagetitle='List of Products' products={products} />
      </Grid>
    </Grid>
  );
}

export default Page
