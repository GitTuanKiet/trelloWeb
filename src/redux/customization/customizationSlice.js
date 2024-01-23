import { createSlice } from '@reduxjs/toolkit'

// project imports
import config from '~/config'

export const initialState = {
  isOpen: [],
  defaultId: 'default',
  mode: config.mode,
  fontFamily: config.fontFamily,
  borderRadius: config.borderRadius,
  opened: true
}

// ==============================|| CUSTOMIZATION SLICE ||============================== //

const customizationSlice = createSlice({
  name: 'customization',
  initialState: initialState,
  reducers: {
    MENU_OPEN: (state, action) => {
      state.isOpen = [action.payload]
    },
    SET_MENU: (state, action) => {
      state.opened = action.payload
    },
    SET_FONT_FAMILY: (state, action) => {
      state.fontFamily = action.payload
    },
    SET_BORDER_RADIUS: (state, action) => {
      state.borderRadius = action.payload
    },
    SET_MODE: (state, action) => {
      state.mode = action.payload
    },
    RESET_CUSTOMIZATION: (state) => {
      Object.keys(state).map(key => (state[key] = initialState[key]))
    }
  }
})

export default customizationSlice.reducer
export const {
  MENU_OPEN,
  SET_MENU,
  SET_FONT_FAMILY,
  SET_BORDER_RADIUS,
  SET_MODE,
  RESET_CUSTOMIZATION
} = customizationSlice.actions