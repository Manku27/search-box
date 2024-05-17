import { FilteredResult } from "../types";
import { ListItem } from "./ListItem";

interface Props {
  results: FilteredResult[];
}

export const List = ({ results }: Props) => {
  return (
    <div>
      {results.map((result) => {
        return <ListItem result={result} key={result.id} />;
      })}
    </div>
  );
};
