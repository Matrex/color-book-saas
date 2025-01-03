type Align = "left" | "center";

interface Props {
  heading: string;
  description: string;
  align: Align;
}

const alignClasses: Record<Align, string> = {
  left: "text-left",
  center: "text-center",
};

export default function Heading(props: Props) {
  return (
    <div className={`${alignClasses[props.align]}`}>
      <h3 className="leading-snug mb-0.5 text-yellow-400 font-semibold text-[32px]">
        {props.heading}
      </h3>
      <p className="text-xl text-slate-300">{props.description}</p>
    </div>
  );
}
