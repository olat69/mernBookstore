function getImgUrl(name) {
  if (!getImgUrl.cache) {
    getImgUrl.cache = new Map();
  }
  if (!getImgUrl.cache.has(name)) {
    getImgUrl.cache.set(name, new URL(`../assets/${name}`, import.meta.url));
  }
  return getImgUrl.cache.get(name);
}

export { getImgUrl };
