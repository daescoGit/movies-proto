import React from 'react'
import { useQuery } from 'react-query';
import { REQUESTOPTIONS } from '../utilities/constants';
import { LinkContainer } from 'react-router-bootstrap';
import { Container, Row } from 'react-bootstrap';
import { filterByFormat } from '../utilities/miscFunc';
import { IMGFORMATCOVER } from '../utilities/constants';

const Hero = () => {
  // bør være "featured" frem for hardcoded
  const fetchURL = 'https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&byTags=franchise:James Bond&lang=da&byYear=2021';

  const { isLoading, error, data } = useQuery(['hero'], () =>
    fetch(fetchURL, REQUESTOPTIONS).then(res =>
      res.json()
    )
  )

  if (data) console.log(data.entries)

  let hero;
  if (data) {
    // filterByFormat kigger på billeders "tags"
    const heroRes = filterByFormat(IMGFORMATCOVER, data.entries[0])
    if (heroRes.length) hero = heroRes[0].plprogram$url
  }

  //className="container-fluid"
  return (
    !isLoading && data && data.entryCount !== 0 &&
    <Container className="container-fluid hero">
      <Row>
        <img src={hero} />
      </Row>
    </Container>
  )
}

export default Hero