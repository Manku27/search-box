export const NoResults = ({ text }: { text: string }) => {
  return (
    <div className="results-list">
      <div className="no-result">{text}</div>
    </div>
  );
};
