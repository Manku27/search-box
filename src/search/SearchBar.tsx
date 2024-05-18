import { useEffect } from "react";

interface Props {
  query: string;
  setQuery: (value: string) => void;
}

export const SearchBar = ({ query, setQuery }: Props) => {
  const handleChange = (value: string) => {
    setQuery(value);
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        // so that cursor does not move when navigating list
        e.preventDefault();
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, []);

  return (
    <input
      placeholder="Type to search..."
      value={query}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
};
