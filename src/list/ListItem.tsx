import { FilteredResult } from "../types";

interface Props {
  result: FilteredResult;
  selected: boolean;
  selectionCallBack: () => void;
}

export const ListItem = ({ result, selected, selectionCallBack }: Props) => {
  return (
    <div
      style={{
        marginTop: 10,
        padding: 10,
        backgroundColor: selected ? "#fff3e0" : "",
        color: selected ? "#424242" : "",
        borderBottom: "1px solid #ccc",
      }}
      onClick={selectionCallBack}
      onMouseEnter={selectionCallBack}
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
