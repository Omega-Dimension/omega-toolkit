function buildPath(base: string, path?: string){
  if (!path) return base;
  return `${base}/${path}`.replace(/\/\/+/g, "/");
};
export {
    buildPath
}