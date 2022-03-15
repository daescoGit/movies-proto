import React from 'react'
import { useParams } from "react-router-dom";

const MediaEntry = () => {
  const params = useParams();

  return (
    <h2>MediaEntry: {params.movieId}</h2>
  )
}

export default MediaEntry