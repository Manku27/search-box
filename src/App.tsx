import { useEffect, useState } from "react";
import "./App.css";
import { SearchBar } from "./search/SearchBar";
import { NoResults } from "./list/NoResults";
import { Result } from "./types";
import { List } from "./list/List";
import { getFilteredResult } from "./search/getFilteredResult";

function App() {
  const [results, setResults] = useState<null | Result[]>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(
      "https://fe-take-home-assignment.s3.us-east-2.amazonaws.com/Data.json"
    )
      .then((response) => response.json())
      .then((json) => {
        setResults(json);
      });
  }, []);

  const filteredResult = results ? getFilteredResult(results, query) : [];

  return (
    <>
      <h1>Search Box</h1>
      <div>
        <SearchBar setQuery={setQuery} query={query} />
        {filteredResult && filteredResult.length == 0 ? <NoResults /> : null}
        {filteredResult && filteredResult.length > 0 ? (
          <List results={filteredResult} />
        ) : null}
      </div>
    </>
  );
}

export default App;
