import { FilteredResult } from "../types";

interface Props {
  result: FilteredResult;
  selected: boolean;
  setSelected: (id: string) => void;
}

export const ListItem = ({ result, selected, setSelected }: Props) => {
  return (
    <div
      style={{
        marginTop: 10,
        padding: 10,
        backgroundColor: selected ? "#fff3e0" : "",
        color: selected ? "#424242" : "",
        borderBottom: "1px solid #ccc",
      }}
      onClick={() => setSelected(result.id)}
      onMouseEnter={() => setSelected(result.id)}
    >
      <div>{result.id}</div>
      <div>{result.name}</div>
      {result.queryInItems ? (
        <div>{result.queryInItems} found in items</div>
      ) : null}
      <div>{result.address + " " + result.pincode}</div>
    </div>
  );
};
