import React from 'react'
import { Card, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { addToStorage, getFromStorage, removeFromStorage } from '../utilities/miscFunc';
import { useState } from 'react';
import { IMGSIZEPRIORITYMEDIACARD } from '../utilities/constants';

const MediaCard = ({ mediaEntry, type, cat }) => {
  const onlyID = mediaEntry.id.split('ProgramAvailability/')[1];
  const [inWishList, setInWishList] = useState(getFromStorage(onlyID) || null);

  // find billede ud fra prioritet
  let image;
  for (const size of IMGSIZEPRIORITYMEDIACARD) {
    if (Object.keys(mediaEntry.plprogram$thumbnails).includes(size)) {
      image = mediaEntry.plprogram$thumbnails[size].plprogram$url
      break;
    }
  }

  // localstorage key/values
  // samt state til reaktiv visning
  const handleWish = () => {
    if (inWishList === null) {
      addToStorage(onlyID, `${type}:${cat.title}:`)
      setInWishList(onlyID)
    } else {
      removeFromStorage(onlyID)
      setInWishList(null)
    }
  }

  return (
    <Col>
      <Card text={'dark'} bg={'Info'} border="secondary">
        <Card.Header as="h5" className={`card-header-cat`} style={{ color: '#383838' }}>
          {mediaEntry.title}
        </Card.Header>
        <Card.Body className="card-body-cat">
          <LinkContainer
            style={{ cursor: 'pointer' }}
            to={`/${type}/${cat.title}/${onlyID}`}
          >
            <img
              className="d-block w-100"
              src={image ? image : require('../utilities/placeholder.png')}
              alt={'mediaEntry.title'}
            />
          </LinkContainer>
          <div className="media-card-wish"
            style={{ background: inWishList === null ? '#e2cf69' : '#ab3715' }}
            onClick={handleWish}
          >
            {inWishList === null ? '+' : '−'}
          </div>
        </Card.Body>

        <Card.Body>
          <small className="media-card-text text-muted">
            {mediaEntry.description}
          </small>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default MediaCard