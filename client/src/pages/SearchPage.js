import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { fetchSearchResults, fetchForestTypes } from '../fetchers';
import {
  capitalize,
  searchStringToParamObject,
  paramObjectToSearchString
} from '../helpers';
import ForestCard from '../components/ForestCard'
import './SearchPage.css'

const SearchPage = () => {
  let history = useHistory();
  const currentSearchParams = searchStringToParamObject();
  const [results, setResults] = useState({hits: [], metadata: {count: 6, total_results: 0}});
  const [forestTypes, setForestTypes] = useState([]);
  const [searchParams, setSearchParams] = useState(currentSearchParams);

  const updateSearchParams = (newParams) => {
    setSearchParams({...searchParams, ...newParams});
  }

  const submitSearch = async (searchParams) => {
    history.push(`/${paramObjectToSearchString(searchParams)}`);
    const searchResults = await fetchSearchResults();
    setResults(searchResults);
  }

  const forestSelection = (e) => {
    updateSearchParams({forest_type: e.target.value});
    submitSearch({ ...searchParams, ...({forest_type: e.target.value})})
  }

  const onSearchBoxUpdate = (e) => {
    updateSearchParams({keywords: e.target.value.toLowerCase()});
    if (e.keyCode === 13) {
      submitSearch({...searchParams, ...({keywords: e.target.value.toLowerCase()})})
    }
  }

  const onSearchButtonClick = () => {
    submitSearch(searchParams);
  }

  const onPaginationButtonClick = (params) => {
    return () => {
      updateSearchParams(params)
      submitSearch(params);
    }
  }

  const generatePagination = () => {
    const {count, total_results, page} = results.metadata;
    const numPages = Math.ceil(total_results / count)
    let pages = new Array(numPages).fill();
    pages = pages.map((el, idx) => { 
      return {
        pageNumber: idx + 1,
        params: {...searchParams, ...({page: idx, count: 6})},
      } 
    })
    if (page > 0) {
      pages.unshift({pageNumber: "<< Prev", params: {...searchParams, ...({page: (searchParams.page || numPages) - 1, count: 6})}})
    }
    if (page < numPages - 1) {
      pages.push({pageNumber: "Next >>", params: {...searchParams, ...({page:  (searchParams.page || 0) + 1, count: 6})}})
    }
    return pages;
  }

  useEffect(() => {
    (async () => {
      const searchResults = await fetchSearchResults();
      setResults(searchResults);

      const forestTypes = await fetchForestTypes();
      setForestTypes(forestTypes.hits);
    })();
  }, []);

  return (
    <div className="search-page">

      <div className="search-page__controls">
        <div className="search-page__controls__search-box">
          <input type="text" id="keywords" name="keywords" placeholder="Search for Projects" onKeyUp={onSearchBoxUpdate} />
          <button  onClick={onSearchButtonClick}>Search</button>
        </div>

        <div className="search-page__controls__type-select">
          <select  name="forest-type" id="forest-type" onChange={forestSelection}>
            <option value="all" selected disabled hidden>Forest Type</option>
            {forestTypes.map((forestType) => <option key={forestType} value={forestType}>{capitalize(forestType)}</option>)}
          </select>
        </div>
      </div>

      <div className="search-page__search-details">
        <div>Searching by: {results.metadata.keywords}</div>
        <div>Filtering by Forest Type: {results.metadata.forest_type}</div>
        <div>Result count: {results.metadata.total_results}</div>
      </div>
      
      <div className="search-page__results-list">
        {results.hits.map((hit) => <ForestCard
          thumbnail_image={hit.thumbnail_image}
          name={hit.name}
          forest_type={hit.forest_type}
          description_brief={hit.description_brief}
        />)}
      </div>
      
      <div className="search-page__pagination">
        {generatePagination().map(({pageNumber, params}) => <button className="search-page__pagination__button"  key={pageNumber} onClick={onPaginationButtonClick(params)}>{pageNumber}</button>)}
      </div>
      
    </div>
  );
};

export default SearchPage;
