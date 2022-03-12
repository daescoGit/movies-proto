import React from 'react'
import { NavLink, Outlet, useSearchParams } from "react-router-dom";
import { getMovies } from "../data";
import { useSearchFilter, Search } from '../utilities/Search';

// fetch data
// bør laves som shared proxy/cdn cache (hvis samme delte data) og evt. også client-sided.
// eftersom http request caching mulighederne på given tidspunk er ukendte for mig laver jeg blot lidt simpel client-side caching. 
// wishlist bør være privat browser cached

const requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

const getCategoryData = () => {
  console.log('fetching new')
  fetch("https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&lang=da&byProgramType=movie&range=1-4", requestOptions)
    .then(response => response.text())
    .then(result => (JSON.parse(result)))
    .catch(error => ('error', error))
}

// todo: memorization
// const memorized = (fetchCallback) => {
//   if (Cache.hasKey('categoryData')) {
//     return Cache.get('categoryData');
//   }

//   Cache.set('categoryData', fetchCallback);
//   return fetchCallback;
// }


// søgefunktionaliteten er sat op via react-router's "searchParams"
// man kunne også have lavet det med state hooks, men searchParams giver os praktisk url integration ud af boksen

const CategoryList = () => {
  const movies = getMovies(); // fjern
  getCategoryData();

  return (
    <>
      <div>CategoryList</div>

      <div style={{ display: "flex" }}>
        <nav
          style={{
            borderRight: "solid 1px",
            padding: "1rem",
          }}
        >
          <Search urlParam="movie" />
          {useSearchFilter(movies, "movie").map((movie) => (
            <NavLink
              style={({ isActive }) => {
                return {
                  display: "block",
                  margin: "1rem 0",
                  color: isActive ? "red" : "",
                };
              }}
              to={`/categories/${movie.number}`}
              key={movie.number}
            >
              {movie.name}
            </NavLink>
          ))}
        </nav>
        <Outlet />
      </div>
    </>
  );
}

export default CategoryList