import { Link } from "react-router-dom";
import { Formdata } from "./InputSocial";
import Icon from "../../Icon";
import { CardProps } from "./InputMultiItem";

export default function SocialCard(props: CardProps<Formdata>) {
  return (
    <div>
      <Link to={props.item.url}>
        <Icon name={props.item.icon} />
      </Link>
    </div>
  );
}
