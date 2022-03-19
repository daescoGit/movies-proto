import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import CategoryCard from '../components/CategoryCard';
import { CATEGORIES } from '../utilities/constants';

// i kravspecifikationen er det beskrevet at både forside og generesider indeholder tal på totale film/serier
// eftersom api query eksemplerne ikke har funktionalitet til dette specifikt -
// er vi nød til at hente alle film/serier for at få count
// herefter har vi dog på denne måde adgang til data'en og behøver ikke at fetche det på ny til fx. underkategori siderne

const CategoryList = ({ type }) => {
  const [delayedTitle, setDelayedTitle] = useState('')
  const baseURL = 'https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&lang=da&fields=title,plprogram$thumbnails,id,description';
  const title = type === 'Movie' ? 'Movies' : type;

  useEffect(() => {
    setTimeout(() => {
      setDelayedTitle(type)
    }, 1500)

    return () => {
      // clean up
      clearTimeout();
    }
  }, [type])

  return (
    <Container className="mb-5 categoryList">
      <div className="p-4 text-center">
        {type === 'Movie' ?
          <h1 className={`category-headline-${type}`}>{title}</h1>
          : <h1>{delayedTitle}</h1>
        }
      </div>

      <Row xs={1} md={2} lg={3} className="g-4">
        {CATEGORIES.map((cat, index) => (
          <CategoryCard key={index} cat={cat} type={type} fetchURL={`${baseURL}&byProgramType=${type}&byTags=genre:${cat.title}`} />
        ))}
      </Row>
    </Container>
  );
}

export default CategoryList