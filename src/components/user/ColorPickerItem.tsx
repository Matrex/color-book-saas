interface Props {
  color: string;
  active: boolean;
  onClick: (color: string) => void;
}

export default function ColorPickerItem(props: Props) {
  const handleColorClick = () => props.onClick(props.color);

  return (
    <div
      className={`${
        props.active ? "ring" : ""
      } rounded-full cursor-pointer ring-white w-5 h-5 `}
      style={{ backgroundColor: props.color }}
      onClick={handleColorClick}
    ></div>
  );
}
