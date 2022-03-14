import React from 'react'

import { NavLink, Outlet, useSearchParams } from "react-router-dom";
import { useSearchFilter, Search } from '../utilities/Search';

// søgefunktionaliteten er sat op via react-router's "searchParams"
// man kunne også have lavet det med state hooks, men searchParams giver os praktisk url integration ud af boksen

const CategoryIndex = () => {


  {/* <div style={{ display: "flex" }}>
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
      </div>*/}
  return (
    <div>CategoryIndex</div>
  )
}

export default CategoryIndex