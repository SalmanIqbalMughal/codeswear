'use client';
import {
  Paper,
  Grid,
  Stack,
  TextField,
  Checkbox,
  FormGroup,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormLabel,
  FormControl,
  Button
} from '@mui/material';

import BaseCard from '../../../(dashboard)/components/shared/BaseCard';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { useRef, useState } from 'react';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

const darkTheme = createTheme({ palette: { mode: 'dark' } });
const lightTheme = createTheme({ palette: { mode: 'light' } });

const Page = () => {

  const ref = useRef();
  const buttonRef = useRef();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState();
  const [category, setCategory] = useState('tshirt');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [price, setPrice] = useState('');
  const [qtyAvail, setQtyAvail] = useState('');

  const onOptionChange = e => {
    setCategory(e.target.value)
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    const formData = new FormData();
    formData.set('file', image);
    formData.set('slug', slug);

    let result = await fetch('/api/imageUpload', {
      method: 'POST',
      body: formData
    });

    result = await result.json();
    console.log(result);

    if (result.success) {
      ref.current.value = '';
    }
  }

  const add_Product = async () => {

    const data = { title, slug, description, category, size, color, price, availableQty: qtyAvail };

    let a = await fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    a = await a.json();

    if (a.status == 'Added') {

      buttonRef.current.click();

      alert("Product Saved Successfully !");

      setTitle('');
      setSlug('');
      setDescription('');
      setImage();
      setCategory('tshirt');
      setSize('');
      setColor('');
      setPrice('');
      setQtyAvail('');
    }

  }

  const fileChange = (e) => {
    setImage(e.target.files?.[0]);
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} lg={12}>
        <BaseCard title="Add a Product">
          <>
            <Stack spacing={3}>
              <TextField id="title" value={title} onChange={e => setTitle(e.target.value)} label="Title" variant="outlined" />
              <TextField id="slug" value={slug} onChange={e => setSlug(e.target.value)} label="Slug" variant="outlined" />

              <TextField
                id="description"
                label="Description"
                multiline
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
              />

              <form onSubmit={handleSubmit} className='flex flex-col'>
                {/* <TextField ref={ref} type='file' onChange={fileChange} id="img" label="Product Image" variant="outlined" /> */}

                <input ref={ref} type='file' onChange={fileChange} />

                <img src={image && URL.createObjectURL(image)} className="border-2 mt-3" height={200} width={250} style={{ float: 'right' }} />
                <button ref={buttonRef} type="submit" style={{ display: 'none' }}>Upload</button>

              </form>

              {/* <TextField
              id="pass-basic"
              label="Password"
              type="password"
              variant="outlined"
            />        
            <TextField
              error
              id="er-basic"
              label="Error"
              defaultValue="ad1avi"
              variant="outlined"
            /> 
            
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Terms & Condition"
              />
              <FormControlLabel
                disabled
                control={<Checkbox />}
                label="Disabled"
              />
            </FormGroup>*/}

              <FormControl>
                <FormLabel id="demo-radio-buttons-group-label" className='font-bold'>Category</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="tshirt"
                    control={<Radio />}
                    label="T-Shirt"
                    checked={category === "tshirt"}
                    onChange={onOptionChange}
                  />
                  <FormControlLabel
                    value="hoodie"
                    control={<Radio />}
                    label="Hoodie"
                    checked={category === "hoodie"}
                    onChange={onOptionChange}
                  />
                  <FormControlLabel
                    value="sticker"
                    control={<Radio />}
                    label="Sticker"
                    checked={category === "sticker"}
                    onChange={onOptionChange}
                  />
                  <FormControlLabel
                    value="mug"
                    control={<Radio />}
                    label="Mug"
                    checked={category === "mug"}
                    onChange={onOptionChange}
                  />
                </RadioGroup>
              </FormControl>

              <select name="size" id="size" value={size} onChange={(e) => setSize(e.target.value)}>
                <option value={''}>-- Choose a Size --</option>
                <option value="XS">Extra Small</option>
                <option value="SM">Small</option>
                <option value="M">Medium</option>
                <option value="L">Large</option>
                <option value="XL">Extra Large</option>
                <option value="XXL">Double Extra Large</option>
              </select>

              <select id="countries" value={color} onChange={(e) => setColor(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                <option value={''}>-- Choose a Color --</option>
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="green">Green</option>
                <option value="yellow">Yellow</option>
                <option value="gray">Gray</option>
                <option value="white">White</option>
                <option value="black">Black</option>
                <option value="purple">Purple</option>
              </select>

              {/* 
              <select id="gender" name="gender"
                class="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400" required>
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select> */}

              <TextField id="price" value={price} onChange={e => setPrice(Math.floor(e.target.value))} label="Price" type='number' variant="outlined" />
              <TextField id="quantity" value={qtyAvail} onChange={e => setQtyAvail(Math.floor(e.target.value))} label="Available Quantity" type='number' variant="outlined" />

            </Stack>
            <br />
            <Button onClick={add_Product} variant='outlined'>
              Submit
            </Button>

          </>
        </BaseCard>
      </Grid>

      {/* <Grid item xs={12} lg={12}>
        <BaseCard title="Form Design Type">
          <Stack spacing={3} direction="row">
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
            />
            <TextField id="filled-basic" label="Filled" variant="filled" />
            <TextField
              id="standard-basic"
              label="Standard"
              variant="standard"
            />
          </Stack>
        </BaseCard>
      </Grid> */}
    </Grid>
  );
}

export default Page
