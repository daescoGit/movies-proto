import React from 'react'
import { useParams } from "react-router-dom";
import { Row, Container } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { REQUESTOPTIONS } from '../utilities/constants';
import MediaEntryHeader from '../components/MediaEntryHeader';
import { IMGFORMATBACKDROP } from '../utilities/constants';
import { filterByFormat } from '../utilities/miscFunc';

const MediaEntry = () => {
  const params = useParams();
  const fetchURL = `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas/${params.mediaId}?form=json`;

  const { isLoading, error, data } = useQuery(['mediaEntry', params.mediaId], () =>
    fetch(fetchURL, REQUESTOPTIONS).then(res =>
      res.json()
    )
  )

  //if (isLoading) return 'Loading...
  if (error) console.log('An error has occurred: ' + error.message)
  //if (data) console.log(data)

  let backdrop;
  if (data) {
    console.log(data)
    console.log(filterByFormat(IMGFORMATBACKDROP, data))

    const backdropRes = filterByFormat(IMGFORMATBACKDROP, data)
    if (backdropRes.length) backdrop = backdropRes[0].plprogram$url
  }

  console.log(backdrop)
  // xs={1} md={2} lg={3}
  return (
    <div className="container-fluid entry-container-bg" style={{ backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,1) 100%), url(${backdrop})` }}>
      <Container className="mb-5 entry-container">
        {!isLoading && data &&
          <>
            <div className="p-4 text-center">
              <h1>{data.title}</h1>
            </div>

            <Row className="g-4">
              <MediaEntryHeader mediaEntry={data} />
            </Row>
          </>
        }
      </Container>
    </div>
  )
}

export default MediaEntry