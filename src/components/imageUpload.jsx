import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import CancelIcon from '@mui/icons-material/Cancel'
import { Grid } from '@mui/material'

const FileUploader = (props) => {
  const maxImagesUpload = 1
  const inputId = Math.random().toString(32).substring(2)

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
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 8, sm: 12, md: 12 }}>
        {props.images.map((image, i) => (
          <Grid
            item
            xs={4}
            sm={4}
            md={4}
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
                top: 10,
                right: 0,
                color: '#aaa'
              }}
              onClick={() => handleOnRemoveImage(i)}
            >
              <CancelIcon />
            </IconButton>
            <img
              src={URL.createObjectURL(image)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                aspectRatio: '1 / 1'
              }}
              alt=''
            />
          </Grid>
        ))}
      </Grid>
      <label htmlFor={inputId}>
        <Button variant='contained' disabled={props.images.length >= maxImagesUpload} component='span' sx={{ mt: 4 }}>
          Upload Image
        </Button>
        <input
          id={inputId}
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