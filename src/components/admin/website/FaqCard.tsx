import { Formdata } from "./InputFaq";
import { CardProps } from "./InputMultiItem";

export default function FaqCard(props: CardProps<Formdata>) {
  return (
    <div>
      <h6 className="text-slate-300 leading-tight">{props.item.question}</h6>
      <p className="mb-3 text-sm text-slate-300 leading-6">
        {props.item.answer}
      </p>
    </div>
  );
}
