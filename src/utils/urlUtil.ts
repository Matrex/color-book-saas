import QueryString from "qs";

const urlUtil = {
  objectToQuery(object: object) {
    return QueryString.stringify(object);
  },

  trimFilename(url: string) {
    if (!url) return "";
    const filename = url.split("/").pop() || "";
    if (filename.length <= 17) return filename;
    return `${filename.slice(0, 7)}...${filename.slice(-7)}`;
  },
};

export default urlUtil;
