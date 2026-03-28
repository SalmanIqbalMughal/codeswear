'use client'
import { Grid, Box } from '@mui/material';
import PageContainer from '../../(dashboard)/components/container/PageContainer';
// components
import SalesOverview from '../../(dashboard)/components/dashboard/SalesOverview';
import DailyActivity from '../../(dashboard)/components/dashboard/DailyActivity';
import ProductPerformance from '../components/dashboard/ProductsList';
import BlogCard from '../../(dashboard)/components/dashboard/Blog';
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, decrementByAmount, increment, incrementByAmount } from '../../../lib/redux/features/counter/counterSlice'

const Dashboard = () => {

  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  const { status, data: session } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn();
    }
  }, [status])

  return (

    <PageContainer title="Dashboard" description="This is Dashboard">
      <Box mt={3}>
        {/* <h4>{JSON.stringify(session?.user?.rights)}</h4> */}
        <Grid container spacing={3}>
          <Grid item xs={12} lg={12}>
            <SalesOverview />
          </Grid>
          {/* ------------------------- row 1 ------------------------- */}
          <Grid item xs={12} lg={4}>
            <DailyActivity />
          </Grid>
          <Grid item xs={12} lg={8}>
            <ProductPerformance />
          </Grid>
          <Grid item xs={12} lg={12}>
            <BlogCard />
          </Grid>
          <Grid item xs={12} lg={12}>
            <div>
              <button
                aria-label="Decrement value"
                onClick={() => dispatch(decrementByAmount(5))}
              >
                Decrement by 5 (-5)
              </button>
              <button
                aria-label="Decrement value"
                onClick={() => dispatch(decrement())}
                style={{ margin: '0 1px' }}
              >
                Decrement
              </button>
              <span style={{ margin: '0 10px' }}>{count}</span>
              <button
                aria-label="Increment value"
                onClick={() => dispatch(increment())}
                style={{ margin: '0 1px' }}
              >
                Increment
              </button>
              <button
                aria-label="Increment value"
                onClick={() => dispatch(incrementByAmount(5))}
              >
                Increment by 5 (+5)
              </button>
            </div>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Dashboard;
