import { FilteredResult } from "../types";
import { HighlightedSubstring } from "./HighlightedSubstring";

interface Props {
  result: FilteredResult;
  selected: boolean;
  selectionCallBack: () => void;
  query: string;
}

export const ListItem = ({
  result,
  selected,
  selectionCallBack,
  query,
}: Props) => {
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
      <HighlightedSubstring text={result.id} highlight={query} />
      <HighlightedSubstring text={result.name} highlight={query} />
      {result.queryInItems ? (
        <HighlightedSubstring
          text={`${result.queryInItems} found in items`}
          highlight={result.queryInItems}
        />
      ) : null}
      <HighlightedSubstring
        text={result.address + " " + result.pincode}
        highlight={query}
      />
    </div>
  );
};
