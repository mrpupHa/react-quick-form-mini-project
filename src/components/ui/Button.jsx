export function Button(props) {
  return (
    <button
      type={props.type}
      className={props.className}
      onClick={props.onClick}
    >
      {props.imgSrc}
      {props.text}
    </button>
  );
}
