import { Formdata } from "./InputMetric";
import { CardProps } from "./InputMultiItem";

export default function MetricCard(props: CardProps<Formdata>) {
  return (
    <div>
      <h6 className="text-slate-300 leading-tight font-medium">
        {props.item.key}
      </h6>
      <p className="mb-3 text-sm text-slate-300 leading-6">
        {props.item.value}
      </p>
    </div>
  );
}
