import {
  ArrowLeftFromLine,
  Brush,
  CircleX,
  Download,
  Eraser,
  Maximize,
  Minimize,
  Palette,
  Printer,
  Redo2,
  Save,
  Undo2,
} from "lucide-react";
import ColorAction from "./ColorAction";
import { useNavigate } from "react-router-dom";
import useColorStore from "../../stores/colorStore";
import { useShallow } from "zustand/shallow";
import useColor from "../../hooks/useColor";
import printUtil from "../../utils/printUtil";
import downloadUtil from "../../utils/downloadUtil";
import useAlertStore from "../../stores/alertStore";
import dateUtil from "../../utils/dateUtil";
import useAuthStore from "../../stores/authStore";

interface Props {
  pageId: number;
}

export default function ColorActions(props: Props) {
  const navigate = useNavigate();
  const [replaceAlert] = useAlertStore(useShallow((state) => [state.replace]));
  const user = useAuthStore((state) => state.user);

  const [
    brush,
    palette,
    scale,
    toggleBrush,
    togglePalette,
    toggleEraser,
    toggleScale,
    getCanvas,
    getContext,
    pushSnap,
    snapCursor,
    snaps,
    replaceSnapCursor,
    restoreSnap,
    tool,
    replaceTool,
    isSaved,
    replaceIsSaved,
  ] = useColorStore(
    useShallow((state) => [
      state.brush,
      state.palette,
      state.scale,
      state.toggleBrush,
      state.togglePalette,
      state.toggleEraser,
      state.toggleScale,
      state.getCanvas,
      state.getContext,
      state.pushSnap,
      state.snapCursor,
      state.snaps,
      state.replaceSnapCursor,
      state.restoreSnap,
      state.tool,
      state.replaceTool,
      state.isSaved,
      state.replaceIsSaved,
    ])
  );

  const { saveColored } = useColor();

  const handleBrushClick = () => {
    if (palette) togglePalette();
    toggleBrush();
    replaceTool("brush");
    const context = getContext();
    context.globalCompositeOperation = "source-over";
  };

  const handlePaletteClick = () => {
    if (brush) toggleBrush();
    togglePalette();
  };

  const handleEraserClick = () => {
    toggleEraser();
    replaceTool("eraser");
    const context = getContext();
    context.globalCompositeOperation = "destination-out";
  };

  const handleUndoClick = async () => {
    const prevSnapCursor = snapCursor - 1;
    const prevSnap = snaps[prevSnapCursor];
    if (!prevSnap) return;
    replaceTool("brush");
    const context = getContext();
    context.globalCompositeOperation = "source-over";
    replaceSnapCursor(prevSnapCursor);
    await restoreSnap(prevSnap);
  };

  const handleRedoClick = async () => {
    const nextSnapCursor = snapCursor + 1;
    const nextSnap = snaps[nextSnapCursor];
    if (!nextSnap) return;
    replaceTool("brush");
    const context = getContext();
    context.globalCompositeOperation = "source-over";
    replaceSnapCursor(nextSnapCursor);
    await restoreSnap(nextSnap);
  };

  const handleScaleClick = () => toggleScale();

  const handleSaveClick = async (done: VoidFunction) => {
    await saveColored(props.pageId, done);
    replaceAlert("success", "Page has been saved");
    done();
  };

  const handlePrintClick = async (done: VoidFunction) => {
    if (user && !user.plan.paid) {
      replaceAlert("danger", "Print is only available on the paid plan.", true);
      navigate("/checkout");
      return;
    }
    const colored = await saveColored(props.pageId);
    if (!colored) return;
    await printUtil.image(colored.preview);
    done();
  };

  const handleDownloadClick = async (done: VoidFunction) => {
    if (user && !user.plan.paid) {
      replaceAlert(
        "danger",
        "Download is only available on the paid plan.",
        true
      );
      navigate("/checkout");
      return;
    }
    const colored = await saveColored(props.pageId);
    if (!colored) return;
    const datetime = dateUtil.fileDatetime();
    const filename = `colored-page-${props.pageId}-${datetime}.png`;
    await downloadUtil.pngUrl(colored.preview, filename);
    done();
  };

  const handleClearClick = () => {
    const canvas = getCanvas();
    const context = getContext();
    context.clearRect(0, 0, canvas.width, canvas.height);
    pushSnap();
    replaceIsSaved(false);
  };
  const handleExitClick = () => navigate(-1);

  return (
    <div className="bg-slate-800 rounded-2xl flex justify-center flex-wrap gap-4 lg:gap-8 px-4 lg:px-7 py-4 items-center w-fit">
      <div className="flex flex-wrap gap-4">
        <ColorAction
          icon={Brush}
          active={tool === "brush"}
          onClick={handleBrushClick}
        />
        <ColorAction
          icon={Palette}
          active={palette}
          onClick={handlePaletteClick}
        />
        <ColorAction
          icon={Eraser}
          active={tool === "eraser"}
          onClick={handleEraserClick}
        />
      </div>
      <div className="flex flex-wrap gap-4">
        <ColorAction
          icon={Undo2}
          active={false}
          onClick={handleUndoClick}
          disabled={snapCursor === 0}
        />
        <ColorAction
          icon={Redo2}
          active={false}
          onClick={handleRedoClick}
          disabled={snapCursor === snaps.length - 1}
        />
      </div>
      <div className="flex flex-wrap gap-4">
        {scale ? (
          <ColorAction
            icon={Minimize}
            active={false}
            onClick={handleScaleClick}
          />
        ) : (
          <ColorAction
            icon={Maximize}
            active={false}
            onClick={handleScaleClick}
          />
        )}
        <ColorAction
          icon={Save}
          active={false}
          onClick={handleSaveClick}
          disabled={isSaved}
        />
        <ColorAction icon={Printer} active={false} onClick={handlePrintClick} />
        <ColorAction
          icon={Download}
          active={false}
          onClick={handleDownloadClick}
        />
      </div>
      <div className="flex flex-wrap gap-4">
        <ColorAction icon={CircleX} active={false} onClick={handleClearClick} />
        <ColorAction
          icon={ArrowLeftFromLine}
          active={false}
          onClick={handleExitClick}
        />
      </div>
    </div>
  );
}
