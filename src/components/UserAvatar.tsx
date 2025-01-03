type Size = "regular" | "medium";

interface Props {
  size: Size;
  name: string;
  photo: string;
}

const sizeClasses: Record<Size, string> = {
  regular: "w-10 h-10",
  medium: "w-14 h-14",
};

export default function UserAvatar(props: Props) {
  return (
    <div
      className={`${
        sizeClasses[props.size]
      } rounded-full bg-slate-700 text-slate-400 overflow-hidden flex items-center justify-center`}
    >
      {props.photo ? (
        <img src={props.photo} alt="" className="object-cover w-full h-full" />
      ) : (
        <div className="font-semibold">{props.name[0].toUpperCase()}</div>
      )}
    </div>
  );
}
