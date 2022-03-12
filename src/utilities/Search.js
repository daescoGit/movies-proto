import React from 'react'
import { useSearchParams } from "react-router-dom";


export const Search = () => {
  let [searchParams, setSearchParams] = useSearchParams();

  return (
    <input
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
  )
}

// her laver jeg en "custom hook" så vi har en dynamisk søgefunktionalitet tilgængelig
export const useSearchFilter = (itemArray) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    itemArray.filter((item) => {
      const filter = searchParams.get("filter");
      // filter callback'en returnere en bool, vi sætter true her for at returnere alt hvis filter ikke er et aktivt param
      if (!filter) return true;
      const name = item.name.toLowerCase();
      return name.includes(filter.toLowerCase()); // her tester vi condition'en
    })
  )
}