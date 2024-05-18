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
  const itemRefs: any = useRef([]);

  useEffect(() => {
    document.body.style.cursor = "";
  }, [results]);

  useEffect(() => {
    const handler = (e) => {
      if (isMouseHover) {
        // hide cursor when hover and navigating via keyboard
        document.body.style.cursor = "none";
      }
      if (e.key === "ArrowDown") {
        setSelected((curr) => {
          if (curr >= 0 && curr !== results.length - 1) {
            itemRefs.current[curr + 1]?.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
            });
            return curr + 1;
          }
          return results.length - 1;
        });
      } else if (e.key === "ArrowUp") {
        setSelected((curr) => {
          if (curr && curr !== 0) {
            itemRefs.current[curr - 1]?.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
            });
            return curr - 1;
          }
          return 0;
        });
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
  }, [isMouseHover, results.length]);

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
            refCall={(el) => (itemRefs.current[index] = el)}
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
