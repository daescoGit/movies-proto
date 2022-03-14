import React, { useState, useEffect } from 'react'
import getData from '../utilities/fetchData';
import { Card, Carousel, Col } from 'react-bootstrap';

const CategoryCard = ({ cat, fetchURL, type }) => {

  const [readystate, setReadystate] = useState(false);
  const [data, setData] = useState({});



  useEffect(() => {
    caches.open(`${type}-${cat}-data`).then(cache => {
      // if not in..
      // + set expiry
      //const cachedResponse = await cache.match(data)
      getData(fetchURL, (data) => { setData(data); setReadystate(true) })

      /*       cache.match(fetchURL).then(settings => {
              console.log(settings);
            });
      
            cache.add(fetchURL).then(() => {
              console.log("Data cached ")
            }); */
    });


    return () => {
      // cleanup
    }
  }, [fetchURL]);

  console.log(data)

  return (
    readystate && data.entryCount !== 0 &&
    <Col>
      <Card>
        <Card.Header as="h5" className="card-header-cat" >{cat}</Card.Header>
        <Card.Body className="card-body-cat">

          <Carousel interval={null}>
            {data.entries.map((mediaEntry, index) => {
              const base = mediaEntry.plprogram$thumbnails
              let thumb = '';

              if ('orig-636x1242' in base) {
                thumb = base['orig-636x1242'].plprogram$url
              } else if ('orig-720x1280' in base) {
                thumb = base['orig-720x1280'].plprogram$url
              } else if ('orig-669x1188' in base) {
                thumb = base['orig-669x1188'].plprogram$url
              } else if ('orig-470x836' in base) {
                thumb = base['orig-470x836'].plprogram$url
              } else if ('origin-446x792' in base) {
                thumb = base['orig-446x792'].plprogram$url
              }

              return (
                <Carousel.Item key={index} style={{ maxHeight: '13rem' }}>
                  <img
                    className="d-block w-100"
                    src={thumb}
                    alt={mediaEntry.title}
                  />
                  <Carousel.Caption>
                    <h5 style={{ textShadow: '2px 2px 4px #000000' }}>{mediaEntry.title}</h5>
                  </Carousel.Caption>
                </Carousel.Item>
              )
            })}
          </Carousel>

        </Card.Body>
        <Card.Footer>
          <small className="text-muted">fff</small>
        </Card.Footer>
      </Card>
    </Col>
  )
}

export default CategoryCard