import { useEffect, useState } from "react";
import "./App.css";
import { SearchBar } from "./search/SearchBar";
import { NoResults } from "./list/NoResults";
import { Result } from "./types";
import { List } from "./list/List";
import { getFilteredResult } from "./search/getFilteredResult";

function App() {
  const [results, setResults] = useState<null | Result[]>(null);
  const [apiState, setApiState] = useState<
    "NotLoaded" | "Loading" | "Loaded" | "error"
  >("NotLoaded");
  const [query, setQuery] = useState("");

  useEffect(() => {
    setApiState("Loading");
    fetch(
      "https://fe-take-home-assignment.s3.us-east-2.amazonaws.com/Data.json"
    )
      .then((response) => response.json())
      .then((json) => {
        setApiState("Loaded");
        setResults(json);
      })
      .catch(() => setApiState("error"));
  }, []);

  const filteredResult = results ? getFilteredResult(results, query) : [];

  let queryResult = null;
  if (filteredResult.length === 0) {
    let message = "Will load shortly";
    if (apiState === "Loading") {
      message = "Loading...";
    } else if (apiState === "error") {
      message = "Sorry! Please check back later.";
    } else if (apiState === "Loaded") {
      message = "No results found.";
    }
    queryResult = <NoResults text={message} />;
  } else {
    queryResult = <List results={filteredResult} query={query} />;
  }
  return (
    <>
      <h1>Search Box</h1>
      <div>
        <SearchBar setQuery={setQuery} query={query} />
        {query ? queryResult : null}
      </div>
    </>
  );
}

export default App;
