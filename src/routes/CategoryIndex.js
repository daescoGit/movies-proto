import React from 'react'
import { useParams } from "react-router-dom";
import { searchFilter, Search } from '../utilities/Search';
import { Row, Container } from 'react-bootstrap';
import MediaCard from '../components/MediaCard';
import { useQuery } from 'react-query';
import { REQUESTOPTIONS } from '../utilities/constants';
import { useSearchParams } from "react-router-dom";

const CategoryIndex = () => {
  // søgefunktionaliteten er sat op via react-router's "searchParams" (se utilities/search.js)
  // man kunne også have lavet det med state hooks, men searchParams giver os praktisk url integration ud af boksen

  const params = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const fetchURL = `https://feed.entertainment.tv.theplatform.eu/f/jGxigC/bb-all-pas?form=json&lang=da&byTags=genre:${params.category}&byProgramType=${params.mediaType}&fields=title,plprogram$thumbnails,tdc$urlSlug,description`;

  // hvis vi har været på forsiden vil vi allerede have kategorien cached
  const { isLoading, error, data } = useQuery(['category', params.category, params.mediaType], () =>
    fetch(fetchURL, REQUESTOPTIONS).then(res =>
      res.json()
    )
  )

  //if (isLoading) return 'Loading... something cool should probably be here in the meanwhile'
  if (error) console.log('An error has occurred: ' + error.message)
  //if (data) console.log(data)

  return (
    <Container className="mb-5">
      <div className="p-4 text-center">
        <h1>{params.category}</h1>
        <h5>
          {!isLoading && data && data.entryCount !== 0 &&
            data.entryCount + ' Available'
          }
        </h5>
      </div>
      <Row style={{ maxWidth: '30rem', margin: '0 auto 2rem auto' }}>
        <Search />
      </Row>
      <Row xs={1} md={2} lg={3} className="g-4">
        {!isLoading && data && data.entryCount !== 0 &&
          searchFilter(data.entries, searchParams).map((mediaEntry, index) => (
            <MediaCard key={index} mediaEntry={mediaEntry} cat={params.category} type={params.mediaType} />
          ))}
      </Row>
    </Container>
  )
}

export default CategoryIndex