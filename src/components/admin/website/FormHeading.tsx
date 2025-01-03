import stringUtil from "../../../utils/stringUtil";

interface Props {
  children: string;
}

export default function FormHeading(props: Props) {
  return (
    <h5 className="font-medium text-lg mt-2 leading-tight">
      {stringUtil.uppercaseFirst(props.children)}
    </h5>
  );
}
