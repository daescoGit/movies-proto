import React from 'react'
import { Card, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useQuery } from 'react-query';
import { REQUESTOPTIONS, IMGSIZEPRIORITYMEDIACARD } from '../utilities/constants';

const WishListCard = ({ fetchURL, type, cat, id, removeWish }) => {
  const { isLoading, error, data } = useQuery(['mediaEntry', id], () =>
    fetch(fetchURL, REQUESTOPTIONS).then(res =>
      res.json()
    )
  )

  if (error) console.log('An error has occurred: ' + error.message)

  let image;

  if (data) {
    // find billede ud fra prioritet
    for (const size of IMGSIZEPRIORITYMEDIACARD) {
      if (Object.keys(data.plprogram$thumbnails).includes(size)) {
        image = data.plprogram$thumbnails[size].plprogram$url
        break;
      }
    }
  }

  return (
    !isLoading && data &&
    <Col>
      <Card text={'dark'} bg={'Info'} border="secondary">
        <Card.Header as="h5" className="card-header" >
          {data.title}
        </Card.Header>
        <Card.Body className="card-body-cat">
          <LinkContainer
            style={{ cursor: 'pointer' }}
            to={`/${type}/${cat.title}/${id}`}
          >
            <img
              className="d-block w-100"
              src={image ? image : require('../utilities/placeholder.png')}
              alt={'mediaEntry.title'}
            />
          </LinkContainer>
          <div className="media-card-wish"
            style={{ background: '#ab3715' }}
            onClick={removeWish}
          >
            {'−'}
          </div>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default WishListCard