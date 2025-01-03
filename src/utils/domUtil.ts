import { forEach, map } from "lodash-es";

interface FileResult {
  file: File;
  dataUri: string;
}

const domUtil = {
  loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = url;
    });
  },

  async combinePngs(urls: string[]): Promise<FileResult> {
    const loadImages = map(urls, (url) => this.loadImage(url));
    const images = await Promise.all(loadImages);
    const canvas = document.createElement("canvas");
    const { width, height } = images[0];
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Context not found");
    forEach(images, (image) => {
      context.drawImage(image, 0, 0);
    });
    return this.canvasToPng(canvas);
  },

  async canvasToPng(canvas: HTMLCanvasElement): Promise<FileResult> {
    const rawUri = canvas.toDataURL("image/png");
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.onload = function () {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) return reject("No temporary canvas context");
        context.globalAlpha = 0.5;
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
        const dataUri = canvas.toDataURL();
        canvas.toBlob((blob) => {
          if (!blob) {
            const error = new Error("No blob got from the canvas");
            return reject(error);
          }
          const file = new File([blob], "image.png", { type: "image/png" });
          resolve({ file, dataUri });
        });
      };
      image.src = rawUri;
    });
  },
};

export default domUtil;
