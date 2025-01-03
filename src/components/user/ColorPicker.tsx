import { Pipette } from "lucide-react";
import { ChangeEvent, useRef } from "react";
import ColorPickerItem from "./ColorPickerItem";
import useColorStore from "../../stores/colorStore";
import { useShallow } from "zustand/shallow";

const colors = [
  "#000000",
  "#64748B",
  "#78716C",
  "#FFFFFF",
  "#EF4444",
  "#F97316",
  "#EAB308",
  "#84CC16",
  "#22C55E",
  "#14B8A6",
  "#06B6D4",
  "#0EA5E9",
  "#3B82F6",
  "#6366F1",
  "#8B5CF6",
  "#A855F7",
  "#D946EF",
  "#EC4899",
  "#F43F5E",
];

export default function ColorPicker() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [palette, color, replaceColor, togglePalette, getContext, replaceTool] =
    useColorStore(
      useShallow((state) => [
        state.palette,
        state.color,
        state.replaceColor,
        state.togglePalette,
        state.getContext,
        state.replaceTool,
      ])
    );

  const isCustomColor = !colors.includes(color);

  const handleColorClick = (color: string) => {
    replaceColor(color);
    togglePalette();
    replaceTool("brush");
    const context = getContext();
    context.globalCompositeOperation = "source-over";
  };

  const handlePickerClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleColorInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    replaceColor(event.target.value);
    replaceTool("brush");
    const context = getContext();
    context.globalCompositeOperation = "source-over";
  };

  return (
    palette && (
      <div className="bg-slate-700 px-4 md:px-7 py-4 flex gap-3 items-center rounded-2xl flex-wrap w-[280px] sm:w-[364px] relative">
        <input
          ref={inputRef}
          type="color"
          value={color}
          onChange={handleColorInputChange}
          className="absolute top-4 left-7 outline-none invisible"
        />
        {colors.map((baseColor) => (
          <ColorPickerItem
            color={baseColor}
            active={color === baseColor}
            onClick={handleColorClick}
            key={baseColor}
          />
        ))}
        {isCustomColor ? (
          <ColorPickerItem
            active={true}
            color={color}
            onClick={handlePickerClick}
          />
        ) : (
          <Pipette
            size={20}
            className="text-slate-300 cursor-pointer"
            onClick={handlePickerClick}
          />
        )}
      </div>
    )
  );
}
