"use client";
import React, { useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Fab,
  TableContainer,
} from "@mui/material";
import BaseCard from "../shared/DashboardCard";
import { IconHome, IconTrash, IconUser } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const ProductsList = ({ pagetitle, products }) => {

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const nbPerPage = 5;
  const numberOfPages = Math.ceil(products && products.length / nbPerPage);
  const lastIndex = currentPage * nbPerPage;
  const startIndex = lastIndex - nbPerPage;
  const records = products && products.slice(startIndex, lastIndex);

  function nextPage() {
    if (currentPage != numberOfPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }

  function prevPage() {
    if (currentPage != 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }

  async function deleteRecord(productSlug) {

    if (confirm("Are You Sure to Delete this Product?")) {
      let resp = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/products/${productSlug}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        });

      resp = await resp.json();

      if (resp.success) {
        alert('Product Deleted Successfully !');
        router.push('/admin/allproducts');
        router.refresh();
      }
    }

  }

  return (
    <BaseCard title={`${pagetitle} (${products && products.length} items)`}>
      <>
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
                  <Typography
                    color="textSecondary"
                    fontWeight={600}
                    fontSize={"16px"}
                    variant="h6"
                  >
                    Product Slug
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    fontWeight={600}
                    fontSize={"16px"}
                    variant="h6"
                  >
                    Product Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    fontWeight={600}
                    fontSize={"16px"}
                    variant="h6"
                  >
                    Size/Color
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    color="textSecondary"
                    fontWeight={600}
                    fontSize={"16px"}
                    variant="h6"
                  >
                    Price
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    color="textSecondary"
                    fontWeight={600}
                    fontSize={"16px"}
                    variant="h6"
                  >
                    Image
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography
                    color="textSecondary"
                    fontWeight={600}
                    fontSize={"16px"}
                    variant="h6"
                  >
                    Delete
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {products &&
                records.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <Typography fontSize="15px" fontWeight={500}>
                        {product.slug}
                      </Typography>
                    </TableCell>

                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Box>
                          <Typography variant="h6" fontWeight={600}>
                            {product.title}
                          </Typography>
                          <Typography color="textSecondary" fontSize="13px">
                            {product.category}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Typography color="textSecondary" variant="h6">
                        {product.size}/{product.color}
                      </Typography>
                    </TableCell>
                    {/* <TableCell>
                  <Chip
                    sx={{
                      pl: "4px",
                      pr: "4px",
                      backgroundColor: product.pbg,
                      color: "#fff",
                    }}
                    size="small"
                    label={product.priority}
                  ></Chip>
                </TableCell> */}
                    <TableCell align="right">
                      <Typography variant="h6">${product.price}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="h6">
                        <img
                          src={product.img}
                          alt="Product Image"
                          style={{ height: "36px", margin: "0 12px" }}
                        />
                      </Typography>
                    </TableCell>

                    <TableCell align="right">
                      <Typography variant="h6">
                        <Fab color="secondary" aria-label="add">
                          <IconTrash
                            onClick={() => deleteRecord(product.slug)}
                          />
                        </Fab>
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="w-full flex flex-row items-center p-5">
          <div className="flex flex-row items-center gap-4">
            <span
              className="cursor-pointer font-bold btn btn-light"
              onClick={() => setCurrentPage(1)}
            >
              {"<<"} First
            </span>

            <span
              className="cursor-pointer font-bold btn btn-light"
              style={{ margin: '0 5px' }}
              onClick={() => prevPage()}
            >
              {"<"} Prev
            </span>

            <span className="flex flex-row items-center" style={{ margin: '0 10px', fontWeight: 'bold' }}>
              <span>{currentPage}</span>
              <span>/</span>
              <span>{numberOfPages}</span>
            </span>
            
            <span
              className="cursor-pointer font-semibold"
              style={{ margin: '0 5px' }}
              onClick={() => nextPage()}
            >
              Next {">"}
            </span>

            <span
              className="cursor-pointer font-semibold"
              onClick={() => setCurrentPage(numberOfPages)}
            >
              Last {">>"}
            </span>
          </div>
        </div>
      </>
    </BaseCard>
  );
};

export default ProductsList;
