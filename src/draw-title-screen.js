import { Texture, Sprite, Text } from 'pixi.js'

import levels       from '../levels.json'
import drawTutorial from './draw-tutorial'
import drawLevels   from './draw-levels'
import drawOptions  from './draw-options'
import button       from './button'

export default function drawTitleScreen(app, state) {

  app.stage.removeChildren()

  // Logo
  const logo = Sprite.fromImage('assets/logo.png')

  logo.width  = app.view.width * 0.5
  logo.height = logo._width / 950 * 161
  logo.x = app.view.width  / 2 - logo.width / 2
  logo.y = app.view.height / 8

  app.stage.addChild(logo)

  // Buttons
  const buttons = [
    'continue',
    'new game',
    'tutorial',
    'options'
  ]
  
  buttons.reverse()
  buttons.forEach((name, i) => {

    const width  = app.view.width * 0.25
    const height = width / 394 * 84
    const x = app.view.width / 2 - width / 2
    const y = app.view.height - i * height - height - height - i * 30

    const btn = button({ wide: true, name, width, height, x, y })

    if (name == 'continue' && state.currentProgress <= 0) {
      btn.visible = false
    }

    btn.on('click',     () => {
      switch (name) {
        case 'tutorial':
          drawTutorial(app, state)
          break

        case 'continue':
          drawLevels(app, state)
          break

        case 'new game':
          const reset = state.currentProgress > 0 ? confirm('Your current progress will be deleted') : true
          if (!reset) return

          state.currentLevel = 0
          state.currentProgress = 0
          state.solution = levels[0]
          state.grid     = levels[0].map(row => row.map(() => 0))
          
          localStorage.currentLevel    = state.currentLevel
          localStorage.currentProgress = state.currentProgress

          drawLevels(app, state)
          break

        case 'options':
          drawOptions(app, state)
          break
      }
    })

    app.stage.addChild(btn)

  })

  // Copyright
  const copyright = new Text(
    'v1.2.0-beta\nCOPYRIGHT © 2018 SNURR GAMES', 
    { fontFamily : 'Roboto', fontWeight: '400', fontSize: 10, fill: 0x23C1B2, align: 'right' }
  )

  copyright.x = app.view.width  - copyright.width  - 20
  copyright.y = app.view.height - copyright.height - 20

  app.stage.addChild(copyright)

}