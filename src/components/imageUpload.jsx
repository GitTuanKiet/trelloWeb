import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CancelIcon from '@mui/icons-material/Cancel'
import { Grid } from '@mui/material'

const FileUploader = (props) => {
  const maxImagesUpload = 1
  const inputId = Math.random().toString(32).substring(2)

  let avatarSx = {}
  avatarSx = props.type === 'avatar' && {
    width: '100px',
    height: '100px',
    borderRadius: '50%'
  }

  const handleOnAddImage = async (e) => {
    if (!e.target.files) return
    const files = []

    for (const file of e.target.files) {
      files.push(file)
    }

    props.setImages([...props.images, ...files])
    e.target.value = ''
  }

  const handleOnRemoveImage = (index) => {
    const newImages = [...props.images]
    newImages.splice(index, 1)
    props.setImages(newImages)
  }

  return (
    <>
      <Grid container justifyContent="center" alignItems="center">
        {props.images.map((image, i) => (
          <Grid
            item
            key={i}
            sx={{
              display: 'flex',
              justifyContent: 'start',
              alignItems: 'center',
              position: 'relative'
            }}
          >
            <IconButton
              aria-label='delete image'
              style={{
                position: 'absolute',
                top: 0,
                right:0,
                color: '#aaa'
              }}
              onClick={() => handleOnRemoveImage(i)}
            >
              <CancelIcon />
            </IconButton>
            <img
              src={image !== props.src ? URL.createObjectURL(image) : props.src ? props.src : ''}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                ...avatarSx
              }}
              alt=''
            />
          </Grid>
        ))}
      </Grid>
      <label htmlFor={inputId} style={{ display:'flex', width:'100%', justifyContent:'center' }}>
        <Button
          variant='contained'
          disabled={props.images.length >= maxImagesUpload}
          component='span'
          sx={{
            mt: 4,
            display: props.images.length >= maxImagesUpload ? 'none' : ''
          }}
        >
          Upload Image
        </Button>
        <input
          id={inputId}
          name={props.name}
          type='file'
          multiple
          accept='image/*,.png,.jpg,.jpeg,.gif'
          onChange={(e) => handleOnAddImage(e)}
          style={{ display: 'none' }}
        />
      </label>
    </>
  )
}

export default FileUploader