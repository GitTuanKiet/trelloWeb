// export const API_HOST = 'http://localhost:3000/v1'
let API_HOST = 'http://localhost:3000/v1'
if (import.meta.env.NODE_ENV === 'production') {
  API_HOST = 'https://trello-api-xgk3.onrender.com/v1'
}

export { API_HOST }