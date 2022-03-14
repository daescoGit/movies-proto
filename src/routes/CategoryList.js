import React from 'react';

// import { NavLink, Outlet, useSearchParams } from "react-router-dom";
// import { useSearchFilter, Search } from '../utilities/Search';

import { Container, Row } from 'react-bootstrap';

import CategoryCard from '../components/CategoryCard';

// fetch data
// bør laves som shared proxy/cdn cache (hvis samme delte data) og evt. også client-sided.
// eftersom http request caching mulighederne på given tidspunk er ukendte for mig laver jeg blot lidt simpel client-side caching. 
// wishlist bør være privat browser cached

// søgefunktionaliteten er sat op via react-router's "searchParams"
// man kunne også have lavet det med state hooks, men searchParams giver os praktisk url integration ud af boksen


// I kravspecifikationen er det beskrevet at både forside og generesider indeholder tal på totale film/serier
// eftersom api query eksemplerne ikke har funktionalitet til dette specifikt -
// er vi nød til at hente alle film/serier for at få count
// herefter har vi dog på denne måde adgang til alt data og behøver ikke at lave flere individuelle fetch

const CategoryList = ({ type }) => {
  const categories = ['Action', 'Comedy', 'Thriller', 'War', 'Romance', 'Drama', 'Crime', 'Documentary', 'Horror'];

  const baseURL = 'https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&lang=da'
  const title = type == 'Movie' ? 'Movies' : type;

  return (
    <Container>
      <h2>{title}</h2>

      <Row xs={1} md={2} lg={3} className="g-4">
        {categories.map((cat, index) => (
          <CategoryCard key={index} cat={cat} type={type} fetchURL={`${baseURL}&byProgramType=${type}&byTags=genre:${cat}`} />
        ))}
      </Row>
    </Container>
  );
}

export default CategoryList