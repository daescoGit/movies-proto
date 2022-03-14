import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CategoryList from './routes/CategoryList';
import MyPage from './routes/MyPage';
import MovieEntry from './routes/MovieEntry';
import CategoryIndex from './routes/CategoryIndex';
import 'bootstrap/dist/css/bootstrap.min.css';

// for at opsætte endpoint routing & singlepage funktionalitet har jeg implementeret "react-router" pakken

// vi kan med fordel lægge child-componenter som nested routes
// det vil resultere i at url's reflekterer hierarkiet samt parent UI kan deles via "Outlet"

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} >
        <Route
          // index er en root default til categories
          index
          element={
            <>
              <CategoryList type="Movie" />
              <CategoryList type="Series" />
            </>
          }
        />

        <Route
          // :movieID virker som et url param til categories
          path=":mediaType/:category" element={<CategoryIndex />}
        />
        <Route
          // :movieID virker som et url param til categories
          path=":movieId" element={<MovieEntry />}
        />
        <Route path="/mypage" element={<MyPage />} />
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