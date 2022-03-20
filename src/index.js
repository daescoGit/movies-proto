import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoryList from './routes/CategoryList';
import WishList from './routes/WishList';
import MediaEntry from './routes/MediaEntry';
import CategoryIndex from './routes/CategoryIndex';
import Hero from './components/Hero';
import 'bootstrap/dist/css/bootstrap.min.css';

// for at opsætte endpoint routing & singlepage funktionalitet har jeg implementeret "react-router" pakken

// vi kan med fordel lægge child-componenter som nested routes
// det vil resultere i at url's reflekterer hierarkiet samt parent UI kan deles via "Outlet"

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
        <Route
          // index er en root default til parent path'en 
          index
          element={
            <>
              <Hero />
              <CategoryList type="Movie" />
              <CategoryList type="Series" />
            </>
          }
        />

        <Route
          // : param path
          path="/:mediaType/:category" element={<CategoryIndex />}
        />
        <Route
          path="/:mediaType/:category/:mediaId" element={<MediaEntry />}
        />
        <Route path="/wishlist" element={<WishList />} />
        <Route
          // "*" vil matche når ingen andre routes gør
          path="*"
          element={
            <main style={{ padding: "1rem" }}>
              <p>Nothing to see here, move along.</p>
            </main>
          }
        />
      </Route>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// virtuel dom entry-point, dette vil være toppen af component træet
// vi injecter react i 'root' elementet i index.html