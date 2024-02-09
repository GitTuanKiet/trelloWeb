// export const API_HOST = 'http://localhost:3000/v1'
let API_HOST = 'http://localhost:3000/v1'

if (import.meta.env.MODE === 'production') {
  API_HOST = 'https://trello-api-xgk3.onrender.com/v1'
}

export { API_HOST }

// theme constant
export const gridSpacing = 3
export const drawerWidth = 260
export const appDrawerWidth = 320
export const fontFamilies = {
  roboto: 'Roboto',
  robotoMono: '"Roboto Mono"',
  monospace: 'monospace',
  inter: 'Inter',
  poppins: 'Poppins'
}
