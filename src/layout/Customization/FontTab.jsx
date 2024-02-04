import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// material-ui
import { useTheme } from '@mui/material/styles'
import {
  FormControl,
  Grid,
  Slider,
  Select,
  MenuItem,
  Typography
} from '@mui/material'

// project imports
import SubCard from '~/ui-component/cards/SubCard'
import { SET_BORDER_RADIUS, SET_FONT_FAMILY } from '~/redux/Customization/customizationSlice'
import { fontFamilies } from '~/utils/constants'

// concat 'px'
function valueText(value) {
  return `${value}px`
}

// ==============================|| FONT TAB ||============================== //

const FontTab = () => {
  // const theme = useTheme()
  const dispatch = useDispatch()
  const customization = useSelector((state) => state.customization)

  // state - border radius
  const [borderRadius, setBorderRadius] = useState(customization.borderRadius)
  const handleBorderRadius = (event, newValue) => {
    setBorderRadius(newValue)
  }

  useEffect(() => {
    setBorderRadius(customization.borderRadius)
  }, [customization.borderRadius])

  // state - font family
  const [fontFamily, setFontFamily] = useState(customization.fontFamily)
  const handleFontFamily = (event) => {
    setFontFamily(event.target.value)
  }

  useEffect(() => {
    setFontFamily(customization.fontFamily)
  }, [customization.fontFamily])

  // dispatch
  useEffect(() => {
    dispatch(SET_BORDER_RADIUS( borderRadius ))
  }, [dispatch, borderRadius])


  useEffect(() => {
    dispatch(SET_FONT_FAMILY( fontFamily ))
  }, [dispatch, fontFamily])

  return (
    <>
      {/* font family */}
      <SubCard
        title="Font Family"
        direction="row"
        contentSX={{ minWidth: 120 }}
      >
        <FormControl fullWidth>
          <Select
            aria-label="font-family"
            value={fontFamily}
            onChange={(e) => handleFontFamily(e)}
            name="select-font-family"
            sx={{
              '& .MuiSelect-select': {
                '&:focus': {
                  borderRadius: customization.borderRadius + 'px'
                },
                '& .MuiTypography-root': {
                  color: 'black'
                }
              }
            }}
          >
            {Object.keys(fontFamilies).map((key) => (
              <MenuItem value={fontFamilies[key]} key={key}>
                <Typography variant="body2">{key}</Typography>
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </SubCard>

      <Grid item xs={12}>
        {/* border radius */}
        <SubCard
          title="Border Radius"
          direction="column"
          content={false}
        >
          <Grid item xs={12} container spacing={1.25} alignItems="center" sx={{ mt: 2.5 }}>
            <Grid item>
              <Typography variant="h6" color="secondary">
                      4px
              </Typography>
            </Grid>
            <Grid item xs>
              <Slider
                size="small"
                value={borderRadius}
                onChange={handleBorderRadius}
                getAriaValueText={valueText}
                valueLabelDisplay="on"
                aria-labelledby="discrete-slider-small-steps"
                marks
                step={2}
                min={4}
                max={24}
                color="secondary"
                sx={{
                  '& .MuiSlider-valueLabel': {
                    color: 'secondary.light'
                  }
                }}
              />
            </Grid>
            <Grid item>
              <Typography variant="h6" color="secondary">
                      24px
              </Typography>
            </Grid>
          </Grid>
        </SubCard>
      </Grid>
    </>
  )
}

export default FontTab