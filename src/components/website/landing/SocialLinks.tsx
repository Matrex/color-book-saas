import { Link } from "react-router-dom";
import Icon from "../../Icon";
import { Social } from "../../../stores/appStore";

interface Props {
  links: Social[];
}

export default function SocialLinks(props: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {props.links.map((socialLink) => (
        <Link
          to={socialLink.url}
          target="_blank"
          key={socialLink.id}
          className="flex items-center justify-center bg-slate-800 transition-colors duration-300 rounded-xl hover:bg-yellow-400 hover:text-slate-900 w-14 h-14"
        >
          <Icon name={socialLink.icon} size={24} />
        </Link>
      ))}
    </div>
  );
}
