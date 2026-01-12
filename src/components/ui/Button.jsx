export function Button({ text, imgSrc, onClick, type = "button", className }) {
  return (
    <button type={type} className={className} onClick={onClick}>
      {imgSrc}
      {text}
    </button>
  );
}
