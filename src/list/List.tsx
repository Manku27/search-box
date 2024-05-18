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
  const listRef: any = useRef(null);

  useEffect(() => {
    // restore pointer visibility
    document.body.style.cursor = "";
    // restore scroll to top
    listRef.current?.children[0]?.scrollIntoView({
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

      const list = listRef.current;
      const selectedItem = list?.children[newIndex];

      setSelected(() => {
        if (selectedItem) {
          selectedItem.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
        return newIndex;
      });
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [isMouseHover, results.length, selected]);

  return (
    <div
      className="results-list"
      ref={listRef}
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
