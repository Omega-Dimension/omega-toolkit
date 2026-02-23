function buildPath(base: string, path?: string){
  if (!path) return "";
  return `${base}/${path}`.replace(/\/\/+/g, "/");
};

export {
    buildPath
}