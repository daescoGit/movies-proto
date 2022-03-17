import React, { useState } from 'react'
import { Container, Row } from 'react-bootstrap';
import { removeFromStorage, getAllFromStorage } from '../utilities/miscFunc';
import WishListCard from '../components/WishListCard';

// permanent data fra en db ville være ideelt her
// men eftersom vi er begrænset vil jeg gemme brugerens wishlist i local storage
// local storage i modsætning til session løber aldrig ud og virker over alle faner

// vi kunne gemme hele objecterne i storage for at undgå at fetche fra server/cache
// men vi ville hurtigt kunne løbe tør for plads i local storage samt andre object relateret problemer

const WishList = () => {
  const [storage, setStorage] = useState(getAllFromStorage());

  // det ville være ideelt at kunne genbruge MediaCard her
  // men eftersom mediaCard er lavet til at få data som prop
  // og "getQuery" er en hook som kun virker top level i komponenter (ikke conditional)
  // samt api query eksemplerne ikke præsenterer en mulighed for at query en liste af ID'er
  // må der laves et seperat WishListCard komponent (CategoryCard kunne også laves mere dynamisk til dette formål)

  const handleWish = (id) => {
    removeFromStorage(id);
    setStorage(getAllFromStorage());
  }

  return (
    <Container className="mb-5">
      <div className="p-4 text-center">
        <h1>WishList</h1>
      </div>
      <Row xs={1} md={2} lg={3} className="g-4">
        {storage.map((id, index) => {
          const type_cat_id = id.split(':')
          const fetchURL = `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas/${type_cat_id[2]}?form=json`;
          return <WishListCard
            fetchURL={fetchURL}
            key={index}
            type={type_cat_id[0]}
            cat={type_cat_id[1]}
            id={type_cat_id[2]}
            removeWish={() => handleWish(type_cat_id[2])}
          />
        })}
      </Row>
    </Container>
  )
}

export default WishList