import PropTypes from 'prop-types'
import { forwardRef } from 'react'

// material-ui
import { useTheme } from '@mui/material/styles'
import { Chip, Tooltip, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'

// project imports
import { capitalizeFirstLetter } from '~/utils/formatters'

// constant
const styled = {
}

// ==============================|| CUSTOM MAIN CHIP ||============================== //

const MainChip = forwardRef(
  (
    {
      border = true,
      boxShadow,
      shadow,
      sx = {
        ...styled
      },
      title,
      tooltip,
      handleClick,
      handleDelete,
      ...others
    },
    ref
  ) => {
    const theme = useTheme()

    return (
      <>
        <>
          <Tooltip title={<Typography variant="h3">{capitalizeFirstLetter(tooltip) || capitalizeFirstLetter(title)}</Typography>} placement="bottom-start">
            <Chip
              ref={ref}
              {...others}
              sx={{
                border: border ? '1px solid' : 'none',
                borderColor: theme.palette.primary[200] + 25,
                ':hover': {
                  boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit'
                },
                ...sx
              }}
              label={<Typography variant="h3">{capitalizeFirstLetter(title)}</Typography>}
              variant="outlined"
              onClick={handleClick}
              clickable
            />
          </Tooltip>
          <IconButton
            size="small"
            sx={{
              color: theme.palette.error.main
            }}
            onClick={handleDelete}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </>
      </>
    )
  }
)


MainChip.propTypes = {
  border: PropTypes.bool,
  boxShadow: PropTypes.bool,
  shadow: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.string,
  tooltip: PropTypes.string
}

export default MainChip