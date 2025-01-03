const imageUtil = {
  urlToDataUri(url: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject("Could not create canvas context");
          return;
        }
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const dataUri = canvas.toDataURL("image/png");
        resolve(dataUri);
      };
      img.onerror = () => {
        reject("Could not load image");
      };
      img.src = url;
    });
  },
};

export default imageUtil;
