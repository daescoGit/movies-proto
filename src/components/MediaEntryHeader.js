import React from 'react'
import { filterByFormat, filterByFormatPrio } from '../utilities/miscFunc';
import { IMGFORMATCOVER } from '../utilities/constants';
import { Row } from 'react-bootstrap';

const MediaEntryHeader = ({ mediaEntry }) => {
  const image = filterByFormatPrio(IMGFORMATCOVER, mediaEntry);
  // handle no image

  return (
    <Row>
      {image ?
        <img src={image} className="img-fluid entry-image" alt="cover" />
        : null}
    </Row>
  )
}

export default MediaEntryHeader