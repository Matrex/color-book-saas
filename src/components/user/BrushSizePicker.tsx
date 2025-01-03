import { useShallow } from "zustand/shallow";
import useColorStore from "../../stores/colorStore";

const sizes = [30, 25, 20, 15, 10, 5] as const;

export type BrushSize = (typeof sizes)[number];

export default function BrushSizePicker() {
  const [brush, brushSize, replaceBrushSize, toggleBrush] = useColorStore(
    useShallow((state) => [
      state.brush,
      state.brushSize,
      state.replaceBrushSize,
      state.toggleBrush,
    ])
  );

  const handleSizeClick = (size: BrushSize) => {
    replaceBrushSize(size);
    toggleBrush();
  };

  return (
    brush && (
      <div className="bg-slate-700 px-7 py-2.5 flex gap-2 items-center rounded-2xl w-fit">
        {sizes.map((size) => (
          <div
            className={`
            ${brushSize === size ? "ring" : ""}
           bg-red-400 rounded-full cursor-pointer ring-white
          `}
            style={{ width: `${size}px`, height: `${size}px` }}
            onClick={() => handleSizeClick(size)}
            key={size}
          ></div>
        ))}
      </div>
    )
  );
}
