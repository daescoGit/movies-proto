import React from 'react'
import { Row, Col, Container } from 'react-bootstrap';

const MediaEntryBody = ({ mediaEntry }) => {
  const {
    plprogram$descriptionLocalized,
    description,
    plprogram$year,
    plprogram$tags,
    plprogram$credits
  } = mediaEntry;

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
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <p className="goldtext-dark">Year:</p>
            {plprogram$year}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
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

          <div style={{ display: 'flex', gap: '0.5rem' }}>
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

          <div style={{ display: 'flex', gap: '0.5rem' }}>
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