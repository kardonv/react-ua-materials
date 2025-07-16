import React from 'react';
import { Route, RouterProvider, Routes } from 'react-router-dom';

import Home from './components/Home';
import About from './components/About';
import Navbar from './components/NavBar';
import OrderSummary from './components/OrderSummary';
import NotFound from './components/NotFound';
import Products from './components/Products';
import FeaturedProducts from './components/FeaturedProducts';
import NewProducts from './components/NewProduct';
import Users from './components/Users';
import UserDetails from './components/UserDetails';
import Admin from './components/Admin';

const LazyAbout = React.lazy(() => import('./components/About'));

export default function App() {
  return (
    <>
      <Navbar></Navbar>
      <div style={{ border: '1px solid blue', padding: '8px', borderRadius: '5px' }}>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          {/* <Route path='/about' element={<About />}></Route> */}

          <Route path='/about' element={
            <React.Suspense fallback='Loading...'>
              <LazyAbout />
            </React.Suspense>
          }></Route>

          <Route path='/order-summary' element={<OrderSummary />} />

          <Route path='/products' element={<Products />}>
            <Route index element={<FeaturedProducts />} />

            <Route path='featured' element={<FeaturedProducts />} />
            <Route path='new' element={<NewProducts />} />
          </Route>

          <Route path='/users' element={<Users />}>
            <Route path=':userId' element={<UserDetails />} />
            <Route path='admin' element={<Admin />} />

            {/* <Route path='1' element={<UserDetails />} />
            <Route path='2' element={<UserDetails />} />
            <Route path='3' element={<UserDetails />} /> */}
          </Route>



          {/* <Route path='/users/:userId' element={<UserDetails />} />
        <Route path='/users/admin' element={<Admin />} /> */}

          <Route path='*' element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}