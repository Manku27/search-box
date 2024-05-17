import { Result, FilteredResult } from "../types";

export const getFilteredResult = (
  results: Result[],
  query: string
): FilteredResult[] => {
  if (!query) return results;

  return results
    .map((result) => {
      const queryLower = query.toLowerCase();
      const { id, name, items, address, pincode } = result;

      const foundInItems = items.find((item) =>
        item.toLowerCase().includes(queryLower)
      );
      const foundInOtherFields =
        id.toLowerCase().includes(queryLower) ||
        name.toLowerCase().includes(queryLower) ||
        address.toLowerCase().includes(queryLower) ||
        pincode.toLowerCase().includes(queryLower);

      if (foundInItems || foundInOtherFields) {
        return { ...result, queryInItems: foundInItems ? foundInItems : "" };
      }
      return null;
    })
    .filter((result) => !!result);
};
