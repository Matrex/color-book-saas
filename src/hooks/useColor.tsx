import { useShallow } from "zustand/shallow";
import useColorStore from "../stores/colorStore";
import domUtil from "../utils/domUtil";
import storageApi from "../apis/storageApi";
import coloredApi, { UpsertPayload } from "../apis/coloredApi";

export default function useColor() {
  const [getCanvas, fullZoom, fitZoom, replaceIsSaved] = useColorStore(
    useShallow((state) => [
      state.getCanvas,
      state.fullZoom,
      state.fitZoom,
      state.replaceIsSaved,
    ])
  );

  const createColoredPhoto = async () => {
    fullZoom();
    const canvas = getCanvas();
    const file = await domUtil.canvasToPng(canvas);
    fitZoom();
    return file;
  };

  const saveColored = async (pageId: number, done?: VoidFunction) => {
    const photoResult = await createColoredPhoto();
    const photo = await storageApi.upload({ file: photoResult.file });
    if (!photo) {
      if (done) done();
      return null;
    }
    const payload: UpsertPayload = {
      pageId,
      photo: photo.url,
    };
    const result = await coloredApi.upsert(payload);
    if (!result) {
      if (done) done();
      return null;
    }
    replaceIsSaved(true);
    return result;
  };

  return { saveColored };
}
