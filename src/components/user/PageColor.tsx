import {
  useEffect,
  MouseEvent,
  MouseEventHandler,
  useCallback,
  useState,
  TouchEvent,
} from "react";
import useColorStore from "../../stores/colorStore";
import { useShallow } from "zustand/shallow";
import refUtil from "../../utils/refUtil";
import { ReadResult } from "../../apis/pageApi";
import Confetti from "./Confetti";
import useColor from "../../hooks/useColor";

type CanvasMouseHandler = MouseEventHandler<HTMLCanvasElement>;

interface Props {
  page: ReadResult;
}

export default function PageColor(props: Props) {
  const containerRef = refUtil.cached<HTMLDivElement>("colorContainer");
  const wrapperRef = refUtil.cached<HTMLDivElement>("colorWrapper");
  const canvasRef = refUtil.cached<HTMLCanvasElement>("colorCanvas");
  const [isDelayedExporting, setIsDelayedExporting] = useState(false);
  const { saveColored } = useColor();

  const [
    brushSize,
    brushColor,
    isDrawing,
    replaceIsDrawing,
    replaceLastPoint,
    lastPoint,
    pushSnap,
    getCanvas,
    getContext,
    replaceBrush,
    replacePalette,
    restoreSnap,
    resetState,
    replaceIsSaved,
    zoom,
    fitZoom,
    isExporting,
    snaps,
  ] = useColorStore(
    useShallow((state) => [
      state.brushSize,
      state.color,
      state.isDrawing,
      state.replaceIsDrawing,
      state.replaceLastPoint,
      state.lastPoint,
      state.pushSnap,
      state.getCanvas,
      state.getContext,
      state.replaceBrush,
      state.replacePalette,
      state.restoreSnap,
      state.resetState,
      state.replaceIsSaved,
      state.zoom,
      state.fitZoom,
      state.isExporting,
      state.snaps,
    ])
  );

  const setColoredPhoto = async () => {
    if (!props.page.colored) return;
    await restoreSnap(props.page.colored.photo);
    pushSnap();
  };

  const startDrawing = (clientX: number, clientY: number) => {
    const canvas = getCanvas();
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    replaceIsDrawing(true);
    replaceLastPoint({ x, y });
    replaceBrush(false);
    replacePalette(false);
  };

  const handleStartDrawing: CanvasMouseHandler = (event) => {
    startDrawing(event.clientX, event.clientY);
  };

  const handleStartDrawingTouch = (event: TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    const touch = event.touches[0];
    startDrawing(touch.clientX, touch.clientY);
  };

  const handleStopDrawing = async () => {
    if (!isDrawing) return;
    replaceIsDrawing(false);
    replaceLastPoint(null);
    replaceIsSaved(false);
    if (snaps.length === 1 && !props.page.is_colored && !props.page.is_owner) {
      await saveColored(props.page.id);
    }
    pushSnap();
  };

  const draw = (clientX: number, clientY: number) => {
    if (!isDrawing) return;
    const canvas = getCanvas();
    const context = getContext();
    context.lineWidth = brushSize / zoom;
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = brushColor;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = (clientX - rect.left) * scaleX;
    const y = (clientY - rect.top) * scaleY;
    context.beginPath();
    if (lastPoint) context.moveTo(lastPoint.x, lastPoint.y);
    context.lineTo(x, y);
    context.stroke();
    replaceLastPoint({ x, y });
  };

  const handleDraw = (event: MouseEvent<HTMLCanvasElement>) => {
    draw(event.clientX, event.clientY);
  };

  const handleDrawTouch = (event: TouchEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    const touch = event.touches[0];
    draw(touch.clientX, touch.clientY);
  };

  const handleMount = useCallback(async () => {
    pushSnap();
    await setColoredPhoto();
    fitZoom();
  }, []);

  useEffect(() => {
    handleMount();
    return () => {
      resetState();
    };
  }, []);

  useEffect(() => {
    if (isExporting) {
      setIsDelayedExporting(true);
      return;
    }
    setTimeout(() => {
      setIsDelayedExporting(false);
    }, 3000);
  }, [isExporting]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const handleTouchStart =
      handleStartDrawingTouch as unknown as EventListener;
    const handleTouchMove = handleDrawTouch as unknown as EventListener;
    const handleTouchEnd = handleStopDrawing as EventListener;

    const options = { passive: false } as AddEventListenerOptions;

    canvas.addEventListener("touchstart", handleTouchStart, options);
    canvas.addEventListener("touchmove", handleTouchMove, options);
    canvas.addEventListener("touchend", handleTouchEnd);

    return () => {
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleStartDrawingTouch, handleDrawTouch, handleStopDrawing]);

  return (
    <div className="grid grid-cols-12">
      <div
        ref={containerRef}
        className="col-span-12 md:col-span-10 md:col-start-2 2xl:col-span-8 2xl:col-start-3 aspect-square overflow-hidden bg-white"
        style={{ width: `${containerRef.current?.clientWidth}px` }}
      >
        <div className="relative">
          <div
            className="relative aspect-square select-none bg-transparent w-[1024px]"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: "top left",
            }}
            ref={wrapperRef}
          >
            <img
              id="illustration"
              className="absolute z-0"
              width={1024}
              height={1024}
              src={props.page.illustration}
            />
            <canvas
              className="absolute outline z-10 cursor-crosshair opacity-50"
              width={1024}
              height={1024}
              ref={canvasRef}
              onMouseDown={handleStartDrawing}
              onMouseUp={handleStopDrawing}
              onMouseOut={handleStopDrawing}
              onMouseMove={handleDraw}
            />
          </div>
          {isDelayedExporting && (
            <div className="absolute top-0 left-0 w-full aspect-square bg-slate-900 z-50 flex items-center justify-center">
              <Confetti width={1024} height={1024} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
