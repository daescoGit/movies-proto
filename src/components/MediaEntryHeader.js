import React from 'react'
import { filterByFormat } from '../utilities/miscFunc';
import { IMGFORMATCOVER } from '../utilities/constants';

const MediaEntryHeader = ({ mediaEntry }) => {
  const images = filterByFormat(IMGFORMATCOVER, mediaEntry);
  // handle no image

  return (
    <img src={images[0].plprogram$url} className="img-fluid" alt="cover" />
  )
}

export default MediaEntryHeader