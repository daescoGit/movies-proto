import React from 'react'
import { useParams } from "react-router-dom";
import { getMovieID } from '../data';

const MediaEntry = () => {
  const params = useParams();
  const movieID = getMovieID(parseInt(params.movieId, 10));
  // 10 = radix/number system (binary, hex, decimal etc.)

  return (
    <h2>MediaEntry: {params.movieId}</h2>
  )
}

export default MediaEntry