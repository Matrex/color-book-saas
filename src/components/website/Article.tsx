import Heading from "./Heading";

interface Props {
  title: string;
  subtitle: string;
  content: string;
}

export default function Article(props: Props) {
  return (
    <div className="mt-24 max-w-[768px] mx-auto">
      <Heading
        heading={props.title}
        description={props.subtitle}
        align="center"
      />
      <div
        dangerouslySetInnerHTML={{ __html: props.content }}
        className="article mt-11"
      ></div>
    </div>
  );
}
