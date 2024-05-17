import { FilteredResult } from "../types";

interface Props {
  result: FilteredResult;
}

export const ListItem = ({ result }: Props) => {
  return (
    <div>
      <div>{result.id}</div>
      <div>{result.name}</div>
      {result.queryInItems ? (
        <div>{result.queryInItems} found in items</div>
      ) : null}
      <div>{result.address + " " + result.pincode}</div>
    </div>
  );
};
