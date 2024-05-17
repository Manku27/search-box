import { Result } from "../types";

interface Props {
  result: Result;
}

export const ListItem = ({ result }: Props) => {
  return (
    <div>
      <div>{result.id}</div>
      <div>{result.name}</div>
      <div>{result.address + " " + result.pincode}</div>
    </div>
  );
};
