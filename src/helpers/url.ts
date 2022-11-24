export const getUrlHostname = (url: string = '') => {
  try {
    const u = new URL(url);

    return u.hostname.startsWith('www.')
      ? u.hostname.slice(4, u.hostname.length)
      : u.hostname;
  } catch (e) {
    return url;
  }
};
