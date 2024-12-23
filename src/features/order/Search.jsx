import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if(query) {
      navigate(`/order/${query}`);
      setQuery("");
    }
    else return;
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder='search' value={query} onChange={(e) => setQuery(e.target.value)}/>
    </form>
  )
}
