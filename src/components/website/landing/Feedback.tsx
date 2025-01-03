interface Props {
  photo: string;
  feedback: string;
  name: string;
  location: string;
}

export default function Feedback(props: Props) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 rounded-3xl bg-slate-800 p-6">
      <div className="w-16 h-16 flex-shrink-0">
        <img
          src={props.photo}
          alt={props.name}
          className="rounded-full w-full h-full object-cover"
        />
      </div>
      <div className="text-slate-300">
        <p className="text-lg leading-[25px] mb-5">{props.feedback}</p>
        <h5 className="text-lg font-semibold">{props.name}</h5>
        <h6>{props.location}</h6>
      </div>
    </div>
  );
}
