import { useEffect, useRef, useState } from "react";
import { FilteredResult } from "../types";
import { ListItem } from "./ListItem";

interface Props {
  results: FilteredResult[];
  query: string;
}

export const List = ({ results, query }: Props) => {
  const [selected, setSelected] = useState<number>(0);
  const [isMouseHover, setIsMouseHover] = useState(false);
  const listRef: any = useRef([]);

  useEffect(() => {
    // restore pointer visibility
    document.body.style.cursor = "";
    // restore scroll to top
    listRef.current[0].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    // selected to top
    setSelected(0);
  }, [results]);

  useEffect(() => {
    const handler = (e) => {
      if (isMouseHover) {
        // hide cursor when hover and navigating via keyboard
        document.body.style.cursor = "none";
      }

      let newIndex = selected;
      if (e.key === "ArrowDown") {
        newIndex =
          selected < results.length - 1 ? selected + 1 : results.length - 1;
      } else if (e.key === "ArrowUp") {
        newIndex = selected > 0 ? selected - 1 : 0;
      }
      setSelected(newIndex);

      const selectedItem = listRef.current[newIndex];
      if (selectedItem) {
        selectedItem.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [isMouseHover, results.length, selected]);

  return (
    <div
      className="results-list"
      onMouseOver={() => {
        setIsMouseHover(true);
      }}
      onMouseOut={() => {
        setIsMouseHover(false);
        document.body.style.cursor = "";
      }}
    >
      {results.map((result, index) => {
        return (
          <ListItem
            refCall={(el) => (listRef.current[index] = el)}
            result={result}
            selected={selected == index}
            selectionCallBack={() => setSelected(index)}
            query={query}
            key={result.id}
          />
        );
      })}
    </div>
  );
};
