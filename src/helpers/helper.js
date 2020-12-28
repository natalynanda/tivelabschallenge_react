import React, { Component } from "react";

function useSearchGamers(gamers) {
    const[query, setQuery] = React.useState('');
  
    const[filteredResults, setFilteredResults] = React.useState(gamers);
  
    React.useMemo(() => {
      const result = gamers.filter(gamer => {
      return gamer.userId.includes(query);
    });
  
    setFilteredResults(result);
  
    }, [dataJson, query]);
  
    return {setQuery, filteredResults}
  }