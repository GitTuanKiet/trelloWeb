import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

// assets
import colors from '~/assets/scss/_themes-vars.module.scss'

// project imports
import componentStyleOverrides from './compStyleOverride'
import themePalette from './palette'
import themeTypography from './typography'

/**
 * Represent theme style and structure as per Material-UI
 * @param {JsonObject} customization customization parameter object
 */

export const theme = (customization) => {
  const color = colors

  const themeOption = {
    colors: color,
    textDark: color.grey900,
    menuSelected: color.secondaryDark,
    menuSelectedBack: color.secondaryLight,
    divider: color.grey200,
    customization
  }

  const themeOptions = {
    customization,
    direction: 'ltr',
    useColorSchemes: themePalette(themeOption),
    mixins: {
      toolbar: {
        minHeight: '48px',
        padding: '16px',
        '@media (min-width: 600px)': {
          minHeight: '48px'
        }
      }
    },
    trello: {
      headerHeight: '64px',
      boardHeaderHeight: '64px',
      boardContentHeight: 'calc(100vh - 128px)',
      columns: {
        width: '333px',
        height: 'calc(100vh - 128px - 24px)',
        heightheader: '64px',
        heightfooter: '56px',
        heightcontent: 'calc(100vh - 128px - 24px - 134px)'
      }
    }
  }

  const themes = extendTheme(themeOptions)
  themes.palette = themePalette(themeOption)
  themes.components = componentStyleOverrides(themeOption)
  themes.typography = themeTypography(themeOption)

  return themes
}

export default theme
