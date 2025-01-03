import { DateTime } from "luxon";

const dateUtil = {
  fromIso(date: string) {
    const datetime = DateTime.fromISO(date);
    return {
      toRelative() {
        return datetime.toRelative();
      },
      toLocal() {
        return datetime.toFormat("MMMM d, yyyy h:mm a");
      },
    };
  },

  currentYear() {
    return DateTime.now().year;
  },

  fileDatetime() {
    return DateTime.now().toFormat("yyyy-MM-dd_HH-mm-ss");
  },
};

export default dateUtil;
