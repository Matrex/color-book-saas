import { CardProps } from "./InputMultiItem";
import { Formdata } from "./InputTestimonial";

export default function TestimonialCard(props: CardProps<Formdata>) {
  return (
    <div>
      <div className="w-10 h-10 mb-2">
        <img
          src={props.item.photo}
          alt=""
          className="h-full w-full object-cover rounded-full"
        />
      </div>
      <div>
        <p className="mb-2 text-sm text-slate-300 leading-6">
          {props.item.feedback}
        </p>
        <h5 className="text-slate-300 leading-tight mb-0.5">
          {props.item.name}
        </h5>
        <h6 className="text-slate-300 leading-tight text-sm">
          {props.item.location}
        </h6>
      </div>
    </div>
  );
}
