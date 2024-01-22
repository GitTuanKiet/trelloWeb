import PropTypes from 'prop-types'
import { forwardRef } from 'react'

// material-ui
import { useTheme } from '@mui/material/styles'
import { Divider, Typography, Stack } from '@mui/material'

// ==============================|| CUSTOM SUB CARD ||============================== //

const SubCard = forwardRef(({ children, content, darkTitle, direction, directionContent, sx = {}, contentSX, title, ...others }, ref) => {
  const theme = useTheme()

  return (
    <>
      <Stack
        ref={ref}
        direction={direction}
        alignItems={direction === 'column' ? 'flex-start' : 'center'}
        justifyContent={direction === 'column' ? 'flex-start' : 'space-between'}
        sx={{
          p: 2,
          ...sx
        }}
        {...others}
      >
        {/* card header and action */}
        {!darkTitle && title && <Typography variant="h5">{title}</Typography>}
        {darkTitle && title && <Typography variant="h4">{title}</Typography>}

        {/* card content */}
        {content && (
          <Stack
            direction={directionContent}
            alignItems={directionContent === 'column' ? 'flex-start' : 'center'}
            sx={{
              gap: 1,
              ...contentSX
            }}
          >
            {children}
          </Stack>
        )}

        {!content && children}
      </Stack>

      {/* content & header divider */}
      {title && (
        <Divider
          sx={{
            p: 0,
            m: 0,
            opacity: 1,
            borderColor: theme.palette.primary.light
          }}
        />
      )}
    </>
  )
})

SubCard.propTypes = {
  children: PropTypes.node,
  direction: PropTypes.string,
  directionContent: PropTypes.string,
  content: PropTypes.bool,
  contentSX: PropTypes.object,
  darkTitle: PropTypes.bool,
  sx: PropTypes.object,
  title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object])
}

SubCard.defaultProps = {
  content: true
}

export default SubCard
