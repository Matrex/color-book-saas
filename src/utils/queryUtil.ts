const queryUtil = {
  hasParam: (param: string, url?: string): boolean => {
    const searchParams = url ? new URL(url).search : window.location.search;
    const currentParams = new URLSearchParams(searchParams);
    return currentParams.has(param);
  },

  followParams(path: string) {
    const currentParams = new URLSearchParams(
      window.location.search
    ).toString();
    return currentParams ? `${path}?${currentParams}` : path;
  },
};

export default queryUtil;
