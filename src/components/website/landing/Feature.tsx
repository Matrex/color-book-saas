import Icon from "../../Icon";

interface Props {
  icon: string;
  title: string;
  description: string;
}

export default function Feature(props: Props) {
  return (
    <div className="flex gap-3">
      <div className="flex items-center justify-center bg-slate-800 p-4 rounded-xl text-yellow-400 w-14 h-14">
        <Icon name={props.icon} size={24} color="text-yellow-400" />
      </div>
      <div>
        <h5 className="font-semibold text-lg leading-tight mb-1 text-slate-100">
          {props.title}
        </h5>
        <p className="text-lg">{props.description}</p>
      </div>
    </div>
  );
}
