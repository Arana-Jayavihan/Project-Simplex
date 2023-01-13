export const api = "http://localhost:8082/api"


export const generatePublicUrl = (fileName) => {
  return `${api}/public/${fileName}`;
};
