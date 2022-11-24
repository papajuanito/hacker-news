export const getUrlHostname = (url: string) => {
  const u = new URL(url);
  return u.hostname;
};
