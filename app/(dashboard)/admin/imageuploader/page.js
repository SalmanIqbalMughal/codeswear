'use client';

import { Grid, ImageList, ImageListItem, Paper } from "@mui/material";
import BaseCard from '../../../(dashboard)/components/shared/BaseCard'
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Image from "next/image";
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from '../../../../lib/redux/features/counter/counterSlice'

import img1 from "/public/images/backgrounds/u1.jpg";
import img2 from "/public/images/backgrounds/u3.jpg";
import img3 from "/public/images/backgrounds/u4.jpg";
import img4 from "/public/images/big/img5.jpg";
import img5 from "/public/images/big/img6.jpg";
import img6 from "/public/images/big/img7.jpg";
import img7 from "/public/images/big/img8.jpg";
import img8 from "/public/img/Mug-001.jpg";
import img9 from "/public/img/Tshirt-001.jpg";
import img10 from "/public/img/Sticker-001.jpg";

import { useEffect, useState } from "react";

const itemData = [
  {
    img: img1,
    rows: 2,
    cols: 1,
  },
  {
    img: img2,
    title: "Burger",
    rows: 2,
    cols: 1,
  },
  {
    img: img3,
    rows: 2,
    cols: 1,
  }, 
  {
    img: img4,
    rows: 2,
    cols: 1,
  },
  {
    img: img3,
    rows: 2,
    cols: 1,
  },

  {
    img: img6,
    rows: 2,
    cols: 1,
  },
  {
    img: img5,
    title: "Fern",
    rows: 2,
    cols: 1,
  },
  {
    img: img7,
    rows: 2,
    cols: 1,
  },
  {
    img: img9,
    rows: 2,
    cols: 1,
  },
  {
    img: img8,
    rows: 2,
    cols: 1,
  },
  {
    img: img10,
    rows: 2,
    cols: 1,
  },
];

const Page = () => {

  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <Grid container spacing={0}>
      
      <div>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
        <span style={{margin:'0 10px'}}>{count}</span>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </button>
      </div>

      <Grid item xs={12} lg={12}>
        <BaseCard title="Images">
          <ImageList
            variant="quilted"
            cols={4}
            rowHeight={121}
          >
            {itemData.map((itemimg, index) => (
              <ImageListItem
                key={index}
                cols={itemimg.cols || 1}
                rows={itemimg.rows || 1}
              >
                <Image
                  src={itemimg.img}
                  alt="img"                 
                  style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", padding:'10px' }}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </BaseCard>
      </Grid>
    </Grid>
  )
}

export default Page
