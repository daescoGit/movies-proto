import React, { useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import { addToStorage, getFromStorage, removeFromStorage } from '../utilities/miscFunc';
import { useParams } from "react-router-dom";

const MediaEntryBody = ({ mediaEntry }) => {
  const params = useParams();
  const [inWishList, setInWishList] = useState(getFromStorage(params.mediaId) || null);

  const {
    plprogram$descriptionLocalized,
    description,
    plprogram$year,
    plprogram$tags,
    plprogram$credits
  } = mediaEntry;

  const handleWish = () => {
    if (inWishList === null) {
      addToStorage(params.mediaId, `${params.mediaType}:${params.category}:`)
      setInWishList(params.mediaId)
    } else {
      removeFromStorage(params.mediaId)
      setInWishList(null)
    }
  }

  return (
    <Row className="mt-2" xs={1} md={2}>
      <Col className="mb-3 p-2">
        <div className="p-4 m-0 gray-backdrop">
          <p className="entry-text">
            {plprogram$descriptionLocalized.da && plprogram$descriptionLocalized.da.length
              ? plprogram$descriptionLocalized.da
              : description
            }
          </p>
        </div>
      </Col>
      <Col className="mb-3 p-2">
        <div className="p-4 m-0 gray-backdrop">
          <Row>
            <div className="entry-info col">
              <p className="goldtext-dark">Year:</p>
              {plprogram$year}
            </div>

            <div className="col addwish-col">
              <p className="goldtext-dark">{inWishList ? 'Remove from ' : 'Add to '}wishlist: </p>
              <div className="entry-wish"
                style={{ background: inWishList === null ? '#e2cf69' : '#ab3715' }}
                onClick={handleWish}
              >
                {inWishList === null ? '+' : '−'}
              </div>
            </div>
          </Row>

          <div className="text-seperator-left" />

          <div className="entry-info">
            <p className="goldtext-dark">Genres:</p>
            {plprogram$tags
              .filter((tag) => tag.plprogram$scheme === 'genre')
              .map((genre, index, filteredArray) => {
                if (index + 1 === filteredArray.length) {
                  // Last one.
                  return genre.plprogram$title
                } else {
                  return genre.plprogram$title + ' · '
                }
              })}
          </div>

          <div className="text-seperator-left" />

          <div className="entry-info">
            <p className="goldtext-dark">Directors:</p>
            {plprogram$credits
              .filter((role) => role.plprogram$creditType === 'director')
              .map((actor, index, filteredArray) => {
                if (index + 1 === filteredArray.length) {
                  // Last one.
                  return actor.plprogram$personName
                } else {
                  return actor.plprogram$personName + ' · '
                }
              })}
          </div>

          <div className="text-seperator-left" />

          <div className="entry-info">
            <p className="goldtext-dark">Actors:</p>
            {plprogram$credits
              .filter((role) => role.plprogram$creditType === 'actor')
              .map((actor, index, filteredArray) => {
                if (index + 1 === filteredArray.length) {
                  // Last one.
                  return actor.plprogram$personName
                } else {
                  return actor.plprogram$personName + ' · '
                }
              })}
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default MediaEntryBody