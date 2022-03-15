import React from 'react'
import { Card, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const MediaCard = ({ mediaEntry, type, cat }) => {
  let image;
  const imgSizePriority = [
    'orig-470x836',
    'orig-669x1188',
    'orig-636x1242',
    'orig-720x1280',
    'da-470x836',
    'da-669x1188',
    'da-636x1242',
    'da-720x1280'
  ];

  // find billede ud fra prioritet
  for (let size of imgSizePriority) {
    if (Object.keys(mediaEntry.plprogram$thumbnails).includes(size)) {
      image = mediaEntry.plprogram$thumbnails[size].plprogram$url
      break;
    }
  }

  return (
    <Col>
      <LinkContainer style={{ cursor: 'pointer' }} to={`/${type}/${cat}/${mediaEntry.tdc$urlSlug}`}>
        <Card>
          <Card.Header as="h5" className="card-header-cat" >{mediaEntry.title}</Card.Header>
          <Card.Body className="card-body-cat">
            <LinkContainer style={{ cursor: 'pointer' }} to={`/${mediaEntry.type}/${cat}/${mediaEntry.tdc$urlSlug}`}>
              <img
                className="d-block w-100"
                src={image ? image : require('./placeholder.png')}
                alt={'mediaEntry.title'}
              />
            </LinkContainer>
          </Card.Body>

          <Card.Body>
            <small className="media-card-text text-muted">
              {mediaEntry.description}
            </small>
          </Card.Body>

        </Card>
      </LinkContainer>
    </Col>
  )
}

export default MediaCard