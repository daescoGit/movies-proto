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
    <Container className="mt-3 px-4">
      <Row xs={1} md={2} className="gx-5">
        <Col className="p-4 gray-backdrop">
          <p className="entry-text">
            {plprogram$descriptionLocalized.da && plprogram$descriptionLocalized.da.length
              ? plprogram$descriptionLocalized.da
              : description
            }
          </p>
        </Col>
        <Col className="p-4 gray-backdrop">
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
                  return genre.plprogram$title + ', '
                }
              })}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <p className="goldtext-dark">Director(s):</p>
            {plprogram$credits
              .filter((role) => role.plprogram$creditType === 'director')
              .map((actor, index, filteredArray) => {
                if (index + 1 === filteredArray.length) {
                  // Last one.
                  return actor.plprogram$personName
                } else {
                  return actor.plprogram$personName + ', '
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
                  return actor.plprogram$personName + ', '
                }
              })}
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default MediaEntryBody