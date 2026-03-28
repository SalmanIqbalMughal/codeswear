'use client';
import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Chip,
  TableContainer,
} from "@mui/material";
import BaseCard from "../shared/DashboardCard";

const OrdersList = ({ pagetitle, orders }) => {

  const [search, setSearch] = useState('');
  const [ordersData, setOrdersData] = useState([]);

  function GetBrands() {
    let searchData = orders.filter((row) => row.email.toLowerCase().includes(search.toLowerCase())
      || row.orderId.toLowerCase().includes(search.toLowerCase())
      || row.address.toLowerCase().includes(search.toLowerCase())
      || row.status.toLowerCase().includes(search.toLowerCase())
    );
    setOrdersData(searchData);
  }

  useEffect(() => {
    if (orders) {
      GetBrands();
    }
    // eslint-disable-next-line
  }, [orders, search]);

  return (
    <BaseCard title={pagetitle}>

      <TextField id="filled-basic" value={search} onChange={e => setSearch(e.target.value)} label="Search" variant="filled" />

      <TableContainer
        sx={{
          width: {
            xs: "274px",
            sm: "100%",
          },
        }}
      >
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography color="textSecondary" fontWeight={600} fontSize={'16px'} variant="h6">
                  Order Id
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" fontWeight={600} fontSize={'16px'} variant="h6">
                  Email
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" fontWeight={600} fontSize={'16px'} variant="h6">
                  Address
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary" fontWeight={600} fontSize={'16px'} variant="h6">
                  Price
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography color="textSecondary" fontWeight={600} fontSize={'16px'} variant="h6">
                  Status
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {ordersData.map((order) => (
              <TableRow key={order._id}>
                <TableCell>
                  <Typography fontSize="15px" fontWeight={500}>
                    {order.orderId}
                  </Typography>
                </TableCell>

                {/* <TableCell>
                  <Box display="flex" alignItems="center">
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {order.address}
                      </Typography>
                      <Typography color="textSecondary" fontSize="13px">
                        {order.paymentInfo}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                  sx={{
                    pl: "4px",
                    pr: "4px",
                    backgroundColor: order.pbg,
                    color: "#fff",
                    }}
                    size="small"
                    label={order.priority}
                    ></Chip>
                    </TableCell> */}

                <TableCell>
                  <Typography variant="h6">{order.email}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">{order.address}</Typography>
                </TableCell>

                <TableCell align="right">
                  <Typography variant="h6">${order.amount}</Typography>
                </TableCell>

                <TableCell align="right">
                  <Typography color="textSecondary" variant="h6">
                    {order.status}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>
    </BaseCard>
  );
};

export default OrdersList;
