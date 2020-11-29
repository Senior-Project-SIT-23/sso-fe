import React, { useCallback, useContext, useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Chip } from '@material-ui/core'
import { applicationDetailStoresContext } from '.././context'
import { getCreateApplicationFormData, getPagesFormData } from '../../../form/applicationHelper'
import CommonCard from '../../Common/Card'
import Loading from '../../Common/Loading'
import ColorPicker from '../../Common/ColorPicker'
import ColorLensIcon from '@material-ui/icons/ColorLens'
import IconButton from '@material-ui/core/IconButton'
import Preview from './Preview'
import { apiUpdateApplicationPage } from '../../../service/applicationService'
import defaultBGIMAGE from '../../../asset/bg_login.jpg'

export default function ApplicationPage(props) {
  const { applicationDetail } = useContext(applicationDetailStoresContext)
  const [application, setApplication] = useState({})
  const [isFetch, setIsFetch] = useState(true)
  const [customPage, setCustomPage] = useState({
    openBtnColorText: false,
    openRightBGColor: false,
    openIconColor: false,
    openBtnColor: false,
    openBtnHover: false,
    openBtnHoverColorText: false,
    rightBGColor: '#FFFFFF',
    backgroundImage: `${defaultBGIMAGE}`,
    iconColor: '#3f51b5',
    btnColor: '#3f51b5',
    btnHover: '#3f51b5d9',
    btnHoverColorText: '#FFFFFF',
    btnColorText: '#FFFFFF',
  })
  const [customText, setCustomText] = useState({
    open: false,
    label: '',
    singIn: 'Sign in',
    color: '#000000',
  })
  const defaultCustomPage = {
    openBtnColorText: false,
    openRightBGColor: false,
    openIconColor: false,
    openBtnColor: false,
    openBtnHover: false,
    openBtnHoverColorText: false,
    rightBGColor: '#FFFFFF',
    backgroundImage: `${defaultBGIMAGE}`,
    iconColor: '#3f51b5',
    btnColor: '#3f51b5',
    btnHover: '#3f51b5d9',
    btnHoverColorText: '#FFFFFF',
    btnColorText: '#FFFFFF',
  }
  const defaultCustomText = {
    open: false,
    label: '',
    singIn: 'Sign in',
    color: '#000000',
  }

  const fetchApplication = useCallback(async () => {
    await applicationDetail.fetchAllApplication(props.app_id)
    setApplication(applicationDetail.application)
    setCustomPage({
      ...customPage,
      rightBGColor: applicationDetail.application.app_pages.BACKGROUND_COLOR,
      backgroundImage: applicationDetail.application.app_pages.IMAGE_URL,
      iconColor: applicationDetail.application.app_pages.ICON_COLOR,
      btnColor: applicationDetail.application.app_pages.BUTTON_COLOR,
      btnHover: applicationDetail.application.app_pages.BUTTON_HOVER_COLOR,
      btnHoverColorText: applicationDetail.application.app_pages.BUTTON_HOVER_TEXT_COLOR,
      btnColorText: applicationDetail.application.app_pages.BUTTON_TEXT_COLOR,
    })
    setCustomText({
      open: false,
      label: applicationDetail.application.app_pages.LABEL_WORD,
      singIn: applicationDetail.application.app_pages.SIGN_IN_WORD,
      color: applicationDetail.application.app_pages.TEXT_COLOR,
    })
    setIsFetch(false)
  }, [applicationDetail, props.app_id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const fromData = getPagesFormData({ ...customPage, ...customText })
    const response = await apiUpdateApplicationPage(props.app_id, fromData)
    if (response.status === 200) {
      props.setSnackBar({ open: true, message: 'Update Pages', status: 'success' })
    }
  }

  useEffect(() => {
    fetchApplication()
  }, [fetchApplication])

  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(4),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 0),
    },
  }))
  const classes = useStyles()
  const color = { approve: 'primary', reject: 'secondary', pending: 'default' }
  return (
    <CommonCard>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        {isFetch ? (
          <Loading className="text-center my-auto"></Loading>
        ) : (
          <div className={classes.paper}>
            <Typography component="h1" variant="h3">
              {application.name}
            </Typography>
            <Chip className="my-3" color={color[application.status]} variant="outlined" label={application.status} />
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item lg={6} md={6} xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="A text show in login page"
                    onChange={(e) => setCustomText({ ...customText, singIn: e.target.value })}
                    value={customText.singIn}
                    autoFocus
                  />
                </Grid>
                <Grid item lg={6} md={6} xs={12} sm={6}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="A text under 'sign in'"
                    onChange={(e) => setCustomText({ ...customText, label: e.target.value })}
                    value={customText.label}
                    autoFocus
                  />
                </Grid>
                <Grid item lg={12} md={12} xs={12} sm={12}>
                  <TextField
                    variant="outlined"
                    fullWidth
                    label="Image URL"
                    onChange={(e) => setCustomPage({ ...customPage, backgroundImage: e.target.value })}
                    value={customPage.backgroundImage}
                    autoFocus
                  />
                  <label className="text-gray-700 opacity-25">Match Suggest Pixels width and hight 1155 x 1080 </label>
                </Grid>
                {/* color section */}

                <Grid item lg={3} md={4} xs={12} sm={12}>
                  <IconButton onClick={() => setCustomText({ ...customText, open: true })}>
                    <label>Text Color</label>
                    <ColorLensIcon style={{ color: `${customText.color}`, fontSize: 'xx-large' }}></ColorLensIcon>
                  </IconButton>
                  {customText.open && (
                    <ColorPicker
                      color={customText.color}
                      handleChange={(hex) => {
                        setCustomText({ ...customText, color: hex })
                      }}
                      handleClose={() => setCustomText({ ...customText, open: false })}
                    ></ColorPicker>
                  )}
                </Grid>
                <Grid item lg={3} md={4} xs={12} sm={12}>
                  <IconButton onClick={() => setCustomPage({ ...customPage, openIconColor: true })}>
                    <label>Icon Color</label>
                    <ColorLensIcon style={{ color: `${customPage.iconColor}`, fontSize: 'xx-large' }}></ColorLensIcon>
                  </IconButton>
                  {customPage.openIconColor && (
                    <ColorPicker
                      color={customPage.iconColor}
                      handleChange={(hex) => {
                        setCustomPage({ ...customPage, iconColor: hex })
                      }}
                      handleClose={() => setCustomPage({ ...customPage, openIconColor: false })}
                    ></ColorPicker>
                  )}
                </Grid>
                <Grid item lg={3} md={4} xs={12} sm={12}>
                  <IconButton onClick={() => setCustomPage({ ...customPage, openBtnColor: true })}>
                    <label>Button Color</label>
                    <ColorLensIcon style={{ color: `${customPage.btnColor}`, fontSize: 'xx-large' }}></ColorLensIcon>
                  </IconButton>
                  {customPage.openBtnColor && (
                    <ColorPicker
                      color={customPage.btnColor}
                      handleChange={(hex) => {
                        setCustomPage({ ...customPage, btnColor: hex })
                      }}
                      handleClose={() => setCustomPage({ ...customPage, openBtnColor: false })}
                    ></ColorPicker>
                  )}

                  <IconButton onClick={() => setCustomPage({ ...customPage, openBtnColorText: true })}>
                    <label> Button Text</label>
                    <ColorLensIcon style={{ color: `${customPage.btnColorText}`, fontSize: 'xx-large' }}></ColorLensIcon>
                  </IconButton>
                  {customPage.openBtnColorText && (
                    <ColorPicker
                      color={customPage.btnColorText}
                      handleChange={(hex) => {
                        setCustomPage({ ...customPage, btnColorText: hex })
                      }}
                      handleClose={() => setCustomPage({ ...customPage, openBtnColorText: false })}
                    ></ColorPicker>
                  )}

                  <IconButton onClick={() => setCustomPage({ ...customPage, openBtnHover: true })}>
                    <label> Hover Color</label>
                    <ColorLensIcon style={{ color: `${customPage.btnHover}`, fontSize: 'xx-large' }}></ColorLensIcon>
                  </IconButton>
                  {customPage.openBtnHover && (
                    <ColorPicker
                      color={customPage.btnHover}
                      handleChange={(hex) => {
                        setCustomPage({ ...customPage, btnHover: hex })
                      }}
                      handleClose={() => setCustomPage({ ...customPage, openBtnHover: false })}
                    ></ColorPicker>
                  )}

                  <IconButton onClick={() => setCustomPage({ ...customPage, openBtnHoverColorText: true })}>
                    <label> Hover Text</label>
                    <ColorLensIcon style={{ color: `${customPage.btnHoverColorText}`, fontSize: 'xx-large' }}></ColorLensIcon>
                  </IconButton>
                  {customPage.openBtnHoverColorText && (
                    <ColorPicker
                      color={customPage.btnHoverColorText}
                      handleChange={(hex) => {
                        setCustomPage({ ...customPage, btnHoverColorText: hex })
                      }}
                      handleClose={() => setCustomPage({ ...customPage, openBtnHoverColorText: false })}
                    ></ColorPicker>
                  )}
                </Grid>

                <Grid item lg={3} md={4} xs={12} sm={12}>
                  <IconButton onClick={() => setCustomPage({ ...customPage, openRightBGColor: true })}>
                    <label>BG Color</label>
                    <ColorLensIcon style={{ color: `${customPage.rightBGColor}`, fontSize: 'xx-large' }}></ColorLensIcon>
                  </IconButton>
                  {customPage.openRightBGColor && (
                    <ColorPicker
                      color={customPage.rightBGColor}
                      handleChange={(hex) => {
                        setCustomPage({ ...customPage, rightBGColor: hex })
                      }}
                      handleClose={() => setCustomPage({ ...customPage, openRightBGColor: false })}
                    ></ColorPicker>
                  )}
                </Grid>
              </Grid>
              <div className="my-8">
                <Preview customPage={customPage} customText={customText}></Preview>
              </div>
              <>
                <Button
                  fullWidth
                  onClick={() => {
                    setCustomPage(defaultCustomPage)
                    setCustomText(defaultCustomText)
                  }}
                  variant="contained"
                  color="default"
                  className={classes.submit}
                >
                  default
                </Button>

                <Button fullWidth type="submit" variant="contained" color="primary" className={classes.submit}>
                  save
                </Button>
              </>
            </form>
          </div>
        )}
      </Container>
    </CommonCard>
  )
}
