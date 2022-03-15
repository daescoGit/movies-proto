import React from 'react'
import { useSearchParams } from "react-router-dom";


export const Search = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="input-group rounded">
      <input
        type="search"
        className="form-control rounded"
        placeholder="Search" aria-label="Search"
        value={searchParams.get("filter") || ""}
        onChange={(event) => {
          const filter = event.target.value;
          if (filter) {
            setSearchParams({ filter: filter }); // query param key/value par
          } else {
            setSearchParams({});
          }
        }}
      />
    </div>
  )
}

// funktion til dynamisk søgefunktionalitet
export const searchFilter = (entryArray, searchParams) => {

  return (
    entryArray.filter((entry) => {
      const filter = searchParams.get("filter");
      // filter callback'en returnere en bool, vi sætter true her for at returnere alt hvis filter ikke er et aktivt param
      if (!filter) return true;
      const name = entry.title.toLowerCase();
      return name.includes(filter.toLowerCase()); // her tester vi condition'en
    })
  )
}