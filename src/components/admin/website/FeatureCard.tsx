import Icon from "../../Icon";
import { Formdata } from "./InputFeature";
import { CardProps } from "./InputMultiItem";

export default function FeatureCard(props: CardProps<Formdata>) {
  return (
    <div>
      <Icon name={props.item.icon} />
      <h5 className="text-slate-300 leading-tight mt-2">{props.item.title}</h5>
      <p className="text-sm text-slate-300 leading-6">
        {props.item.description}
      </p>
    </div>
  );
}
