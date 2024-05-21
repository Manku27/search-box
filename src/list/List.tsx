import { useEffect, useRef, useState } from "react";
import { FilteredResult } from "../types";
import { ListItem } from "./ListItem";

interface Props {
  results: FilteredResult[];
  query: string;
}

function removePointer() {
  document.body.style.cursor = "none";
  const list: HTMLElement | null = document.querySelector(".results-list");
  if (list) {
    list.style.pointerEvents = "none";
  }
}

function restorePointer() {
  document.body.style.cursor = "";
  const list: HTMLElement | null = document.querySelector(".results-list");
  if (list) {
    list.style.pointerEvents = "";
  }
}

export const List = ({ results, query }: Props) => {
  const [selected, setSelected] = useState<number>(0);
  const [isMouseHover, setIsMouseHover] = useState(false);
  const listRef: any = useRef(null);

  useEffect(() => {
    // restore pointer visibility
    restorePointer();
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
      removePointer();

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
      onMouseOver={() => {
        setIsMouseHover(true);
      }}
      onMouseLeave={() => {
        setIsMouseHover(false);
        restorePointer();
      }}
    >
      <div className="results-list" ref={listRef}>
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
    </div>
  );
};
