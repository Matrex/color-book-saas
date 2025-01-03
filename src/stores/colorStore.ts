import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { BrushSize } from "../components/user/BrushSizePicker";
import { includes } from "lodash-es";
import refUtil from "../utils/refUtil";
import { devtools } from "zustand/middleware";

type Tool = "brush" | "eraser";

interface Point {
  x: number;
  y: number;
}

interface Data {
  zoom: number;
  isDrawing: boolean;
  isSaved: boolean;
  brushSize: BrushSize;
  color: string;
  brush: boolean;
  palette: boolean;
  eraser: boolean;
  scale: boolean;
  lastPoint: Point | null;
  snapCursor: number;
  snaps: string[];
  tool: Tool;
  isExporting: boolean;
}

interface Actions {
  toggleBrush: () => void;
  replaceBrush(brush: boolean): void;
  togglePalette: () => void;
  replacePalette(brush: boolean): void;
  toggleEraser: () => void;
  toggleScale: () => void;
  replaceBrushSize: (brushSize: BrushSize) => void;
  replaceColor: (color: string) => void;
  replaceIsDrawing(isDrawing: boolean): void;
  replaceLastPoint(lastPoint: Point | null): void;
  replaceSnapCursor(snapCursor: number): void;
  pushSnap(): void;
  getContainer(): HTMLDivElement;
  getWrapper(): HTMLDivElement;
  getCanvas(): HTMLCanvasElement;
  getContext(): CanvasRenderingContext2D;
  restoreSnap(snap: string): Promise<void>;
  replaceTool(tool: Tool): void;
  resetState(): void;
  replaceIsSaved(isSaved: boolean): void;
  fullZoom(): void;
  fitZoom(): void;
}

type State = Data & Actions;

const initialData: Data = {
  zoom: 1,
  isDrawing: false,
  isSaved: true,
  brushSize: 20,
  color: "#000000",
  brush: false,
  palette: false,
  eraser: false,
  scale: false,
  lastPoint: null,
  snapCursor: -1,
  snaps: [],
  tool: "brush",
  isExporting: false,
};

const useColorStore = create<State>()(
  devtools(
    immer((set, get) => ({
      ...initialData,

      toggleBrush: () =>
        set((state) => {
          state.brush = !state.brush;
        }),

      replaceBrush(brush) {
        set((state) => {
          state.brush = brush;
        });
      },

      togglePalette: () =>
        set((state) => {
          state.palette = !state.palette;
        }),

      replacePalette(palette) {
        set((state) => {
          state.palette = palette;
        });
      },

      toggleEraser: () =>
        set((state) => {
          state.eraser = !state.eraser;
        }),

      toggleScale: () =>
        set((state) => {
          state.scale = !state.scale;
        }),

      replaceBrushSize: (brushSize) =>
        set((state) => {
          state.brushSize = brushSize;
        }),

      replaceColor: (color) =>
        set((state) => {
          state.color = color;
        }),

      replaceIsDrawing(isDrawing) {
        set((state) => {
          state.isDrawing = isDrawing;
        });
      },

      replaceLastPoint(lastPoint) {
        set((state) => {
          state.lastPoint = lastPoint;
        });
      },

      replaceSnapCursor(snapCursor) {
        set((state) => {
          state.snapCursor = snapCursor;
        });
      },

      pushSnap() {
        set((state) => {
          const canvas = state.getCanvas();
          const snap = canvas.toDataURL();
          const existSnap = includes(state.snaps, snap);
          if (existSnap) return;
          const nextSnapCursor = state.snapCursor + 1;
          state.snaps = state.snaps.slice(0, nextSnapCursor);
          state.snaps.push(snap);
          state.snapCursor = nextSnapCursor;
        });
      },

      getContainer() {
        const containerRef = refUtil.cached<HTMLDivElement>("colorContainer");
        const container = containerRef.current;
        if (!container) throw new Error("Container not found");
        return container;
      },

      getWrapper() {
        const wrapperRef = refUtil.cached<HTMLDivElement>("colorWrapper");
        const wrapper = wrapperRef.current;
        if (!wrapper) throw new Error("Wrapper not found");
        return wrapper;
      },

      getCanvas() {
        const canvasRef = refUtil.cached<HTMLCanvasElement>("colorCanvas");
        const canvas = canvasRef.current;
        if (!canvas) throw new Error("Canvas not found");
        return canvas;
      },

      getContext() {
        const state = get();
        const canvas = state.getCanvas();
        const context = canvas.getContext("2d");
        if (!context) throw new Error("Context not found");
        return context;
      },

      restoreSnap(snap) {
        return new Promise((resolve, reject) => {
          const state = get();
          const canvas = state.getCanvas();
          const context = state.getContext();
          context.clearRect(0, 0, canvas.width, canvas.height);
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = function () {
            context.drawImage(img, 0, 0);
            resolve();
          };
          img.onerror = reject;
          img.src = snap;
        });
      },

      replaceTool(tool) {
        set((state) => {
          state.tool = tool;
        });
      },

      resetState() {
        set((state) => {
          state.isDrawing = initialData.isDrawing;
          state.brushSize = initialData.brushSize;
          state.color = initialData.color;
          state.brush = initialData.brush;
          state.palette = initialData.palette;
          state.eraser = initialData.eraser;
          state.scale = initialData.scale;
          state.lastPoint = initialData.lastPoint;
          state.snapCursor = initialData.snapCursor;
          state.snaps = initialData.snaps;
          state.tool = initialData.tool;
        });
      },

      replaceIsSaved(isSaved) {
        set((state) => {
          state.isSaved = isSaved;
        });
      },

      fullZoom() {
        set((state) => {
          state.isExporting = true;
          state.zoom = 1;
        });
      },

      fitZoom() {
        set((state) => {
          const container = state.getContainer();
          const { width } = container.getBoundingClientRect();
          state.zoom = width / 1024;
          state.isExporting = false;
        });
      },
    }))
  )
);

export default useColorStore;
