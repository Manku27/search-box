interface Props {
  query: string;
  setQuery: (value: string) => void;
}

export const SearchBar = ({ query, setQuery }: Props) => {
  const handleChange = (value: string) => {
    setQuery(value);
  };

  return (
    <input
      placeholder="Type to search..."
      value={query}
      onChange={(e) => handleChange(e.target.value)}
    />
  );
};
