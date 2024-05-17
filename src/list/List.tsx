import { useState } from "react";
import { FilteredResult } from "../types";
import { ListItem } from "./ListItem";

interface Props {
  results: FilteredResult[];
}

export const List = ({ results }: Props) => {
  const [selected, setSelected] = useState("");

  return (
    <div style={{ margin: 20 }}>
      {results.map((result) => {
        return (
          <ListItem
            result={result}
            selected={selected === result.id}
            setSelected={setSelected}
            key={result.id}
          />
        );
      })}
    </div>
  );
};
