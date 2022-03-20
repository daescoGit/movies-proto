import React from 'react'
import { useQuery } from 'react-query';
import { REQUESTOPTIONS } from '../utilities/constants';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Row } from 'react-bootstrap';
import { filterByFormatPrio } from '../utilities/miscFunc';
import { IMGFORMATCOVER } from '../utilities/constants';
const Hero = () => {
  // bør være "featured" frem for hardcoded
  const fetchURL = 'https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas/257076776112?form=json';

  const { isLoading, error, data } = useQuery(['hero'], () =>
    fetch(fetchURL, REQUESTOPTIONS).then(res =>
      res.json()
    )
  )

  if (data) console.log(data)

  let hero;
  if (data) {
    // filterByFormat kigger på billeders "tags"
    const heroRes = filterByFormatPrio(IMGFORMATCOVER, data)
    console.log(heroRes)
    if (heroRes) hero = heroRes
  }

  //className="container-fluid hero"
  //<img src={hero} className="img-fluid w-100 hero-img" />
  return (
    !isLoading && data && data.entryCount !== 0 &&
    <>
      <Row>
        <div
          className="hero-img jumbotron jumbotron-fluid"
          style={{ backgroundImage: `radial-gradient(circle, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%), url(${hero})` }}
        >
          <div className="container hero-text">
            <h1 className="display-4">One stop entertainment</h1>
            <p className="lead">Enjoy all the latest movie and series releases at your demand</p>
          </div>

        </div>
        <div className="text-seperator-hero" />
      </Row>
    </>
  )
}

export default Hero