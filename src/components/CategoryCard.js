//import getData from '../utilities/fetchData';
import React, { useState } from 'react'
import { Card, Carousel, Col } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { REQUESTOPTIONS } from '../utilities/constants';
import { LinkContainer } from 'react-router-bootstrap';
import { RandomNr } from '../utilities/miscFunc';

// caching
// bør laves som shared proxy/cdn cache (hvis samme delte data) og yderligere også client-sided.
// eftersom server-side caching mulighederne på given tidspunk er ukendte for mig -
// laver jeg blot lidt client-side caching vha. react-query pakken

const CategoryCard = ({ cat, fetchURL, type }) => {
  // const [isLoading, setIsloading] = useState(true);
  // const [data, setData] = useState({})
  // getData(fetchURL, (data) => { setData(data); setIsloading(false) })

  const [slideIndex, setSlideIndex] = useState(-1)

  const { isLoading, error, data } = useQuery(['category', cat, type], () =>
    fetch(fetchURL, REQUESTOPTIONS).then(res =>
      res.json()
    )
  )

  //if (isLoading) return 'Loading... something cool should probably be here in the meanwhile'
  if (error) console.log('An error has occurred: ' + error.message)

  let defaultRandomSlide = 0
  if (data) {
    console.log(data)
    defaultRandomSlide = RandomNr(0, data.entryCount <= 4 ? data.entryCount - 1 : 3);
  }


  const handleSlideSelect = (selectedIndex, e) => {
    setSlideIndex(selectedIndex);
  };

  // medie slides er sat til at starte på en tilfældig slide for varriation
  // activeIndex={RandomNr(0, data.entryCount <= 5 ? data.entryCount - 1 : 4)}
  return (
    !isLoading && data && data.entryCount !== 0 &&
    <Col>
      <Card>
        <Card.Header as="h5" className="card-header-cat" >{cat}</Card.Header>
        <Card.Body className="card-body-cat">

          <Carousel activeIndex={slideIndex !== -1 ? slideIndex : defaultRandomSlide} onSelect={handleSlideSelect} interval={null}>
            {data.entries.slice(0, 4).map((mediaEntry, index) => {
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
                  <LinkContainer style={{ cursor: 'pointer' }} to={`/${type}/${mediaEntry.tdc$urlSlug}`}>
                    <img
                      className="d-block w-100"
                      src={thumb}
                      alt={mediaEntry.title}
                    />
                  </LinkContainer>
                  <Carousel.Caption>
                    <h5 style={{ textShadow: '2px 2px 4px #000000' }}>{mediaEntry.title}</h5>
                  </Carousel.Caption>
                </Carousel.Item>

              )
            })}
          </Carousel>

        </Card.Body>
        <LinkContainer style={{ cursor: 'pointer' }} to={`/${type}/${cat}`}>
          <Card.Footer className="card-footer-cat">
            <div>
              {data.entryCount} {type == 'Movie' && data.entryCount == 1 ? 'movie'
                : type == 'Movie' && data.entryCount > 1 ? 'movies'
                  : type == 'Series' && data.entryCount == 1 ? 'show'
                    : 'shows'} available
            </div>
            <div style={{ color: 'gold', fontSize: '1.3rem' }}>❯</div>
          </Card.Footer>
        </LinkContainer>
      </Card>
    </Col>
  )
}

export default CategoryCard