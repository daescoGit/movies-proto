import React from 'react'
import { filterByFormat } from '../utilities/miscFunc';
import { IMGFORMATCOVER } from '../utilities/constants';
import { Row } from 'react-bootstrap';

const MediaEntryHeader = ({ mediaEntry }) => {
  const images = filterByFormat(IMGFORMATCOVER, mediaEntry);
  // handle no image

  return (
    <Row>
      <img src={images[0].plprogram$url} className="img-fluid entry-image" alt="cover" />
    </Row>
  )
}

export default MediaEntryHeader