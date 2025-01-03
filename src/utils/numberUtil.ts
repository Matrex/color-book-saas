const numberUtil = {
  toCompact(number: number) {
    return new Intl.NumberFormat("en", {
      notation: "compact",
      maximumFractionDigits: 1,
    }).format(number);
  },

  splitToParts(number: number) {
    const [whole, fraction = "00"] = number.toFixed(2).split(".");
    return [parseInt(whole, 10), fraction];
  },
};

export default numberUtil;
