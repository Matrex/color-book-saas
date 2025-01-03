import { v4 as uuidv4 } from "uuid";

const uuidUtil = {
  create() {
    return uuidv4();
  },
};

export default uuidUtil;
