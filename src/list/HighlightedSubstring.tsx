interface Props {
  text: string;
  highlight: string;
}

export const HighlightedSubstring = ({ text, highlight }: Props) => {
  const index = text.toLowerCase().indexOf(highlight.toLowerCase());

  if (index === -1) {
    return <span>{text}</span>;
  }

  const beforeHighlight = text.slice(0, index);
  const highlightedText = text.slice(index, index + highlight.length);
  const afterHighlight = text.slice(index + highlight.length);

  return (
    <div>
      {beforeHighlight}
      <span className="highlighted">{highlightedText}</span>
      {afterHighlight}
    </div>
  );
};
