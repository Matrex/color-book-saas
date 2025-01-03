import { CSSProperties, Suspense } from "react";

interface Props {
  name: string;
  size?: number;
  color?: string;
}

const fallback = <div style={{ background: "#ddd", width: 24, height: 24 }} />;

export default function Icon(props: Props) {
  const size = props.size || 24;
  const style: CSSProperties = { fontSize: `${size}px` };

  return (
    <Suspense fallback={fallback}>
      <i
        style={style}
        className={`${props.color} ri-${props.name} aspect-auto`}
      ></i>
    </Suspense>
  );
}
