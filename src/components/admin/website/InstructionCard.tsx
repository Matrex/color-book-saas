import { Formdata } from "./InputInstruction";
import { CardProps } from "./InputMultiItem";

export default function InstructionCard(props: CardProps<Formdata>) {
  return <div>{props.item.content}</div>;
}
