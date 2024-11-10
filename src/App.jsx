import React, { useState, useEffect } from 'react'
import { Container, Grid, Typography, Slider, IconButton } from '@mui/material'
import { VolumeUp, VolumeOff } from '@mui/icons-material'
import { Howl } from 'howler'

const sounds = [
  { name: 'Birds', url: 'https://media.surrealismtoday.com/ambience/birds.mp3' },
  { name: 'Cafe', url: 'https://media.surrealismtoday.com/ambience/cafe.mp3' },
  { name: 'Campfire', url: 'https://media.surrealismtoday.com/ambience/campfire.mp3' },
  { name: 'Forest', url: 'https://media.surrealismtoday.com/ambience/forest.mp3' },
  { name: 'Keyboard', url: 'https://media.surrealismtoday.com/ambience/keyboard.mp3' },
  { name: 'Night', url: 'https://media.surrealismtoday.com/ambience/night.mp3' },
  { name: 'Ocean', url: 'https://media.surrealismtoday.com/ambience/ocean.mp3' },
  { name: 'Rain', url: 'https://media.surrealismtoday.com/ambience/rain.mp3' },
  { name: 'River', url: 'https://media.surrealismtoday.com/ambience/river.mp3' },
  { name: 'Train', url: 'https://media.surrealismtoday.com/ambience/train.mp3' },
  { name: 'White Noise', url: 'https://media.surrealismtoday.com/ambience/whitenoise.mp3' },
  { name: 'Wind', url: 'https://media.surrealismtoday.com/ambience/wind.mp3' },
]

function App() {
  const [soundObjects, setSoundObjects] = useState({})

  useEffect(() => {
    const newSoundObjects = {}
    sounds.forEach(sound => {
      newSoundObjects[sound.name] = new Howl({
        src: [sound.url],
        loop: true,
        volume: 0,
      })
    })
    setSoundObjects(newSoundObjects)

    return () => {
      Object.values(newSoundObjects).forEach(sound => sound.unload())
    }
  }, [])

  const handleVolumeChange = (name, newValue) => {
    if (soundObjects[name]) {
      soundObjects[name].volume(newValue / 100)
      if (newValue > 0 && !soundObjects[name].playing()) {
        soundObjects[name].play()
      } else if (newValue === 0 && soundObjects[name].playing()) {
        soundObjects[name].pause()
      }
    }
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        Ambient Soundscape
      </Typography>
      <Grid container spacing={3}>
        {sounds.map(sound => (
          <Grid item xs={12} sm={6} md={4} key={sound.name}>
            <Typography variant="h6" gutterBottom>
              {sound.name}
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <IconButton
                  onClick={() => handleVolumeChange(sound.name, soundObjects[sound.name]?.volume() === 0 ? 50 : 0)}
                >
                  {soundObjects[sound.name]?.volume() === 0 ? <VolumeOff /> : <VolumeUp />}
                </IconButton>
              </Grid>
              <Grid item xs>
                <Slider
                  value={soundObjects[sound.name]?.volume() * 100 || 0}
                  onChange={(_, newValue) => handleVolumeChange(sound.name, newValue)}
                  aria-labelledby="continuous-slider"
                />
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default App
