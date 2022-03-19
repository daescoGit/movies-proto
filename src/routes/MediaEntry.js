import React from 'react'
import { useParams } from "react-router-dom";
import { Container } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { REQUESTOPTIONS } from '../utilities/constants';
import MediaEntryHeader from '../components/MediaEntryHeader';
import { IMGFORMATBACKDROP } from '../utilities/constants';
import { filterByFormat } from '../utilities/miscFunc';
import MediaEntryBody from '../components/MediaEntryBody';

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
    // filterByFormat kigger på billeders "tags"
    const backdropRes = filterByFormat(IMGFORMATBACKDROP, data)
    if (backdropRes.length) backdrop = backdropRes[0].plprogram$url
  }

  return (
    <div className="container-fluid entry-container-bg" style={{ backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.5) 0%, rgba(0,0,0,1) 100%), url(${backdrop})` }}>
      <Container className="mb-5 entry-container">
        {!isLoading && data &&
          <>
            <div className="p-3 text-center">
              <h1 className="display-4">{data.title}</h1>
            </div>
            <MediaEntryHeader mediaEntry={data} />
            <MediaEntryBody mediaEntry={data} />
          </>
        }
      </Container>
    </div>
  )
}

export default MediaEntry