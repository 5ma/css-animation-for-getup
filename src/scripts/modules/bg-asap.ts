const spotlight: null | HTMLDivElement = document.querySelector('[data-spotlight]');

const setMousePositionAsCssVar = (event: PointerEvent) => {
  if (!spotlight) return
  spotlight.style.setProperty('--spotlight-x', `${Math.floor(event.clientX)}px`)
  spotlight.style.setProperty('--spotlight-y', `${Math.floor(event.clientY)}px`)
  console.log('event.clientX', event.clientX)
  console.log('event.clientY', event.clientY)
}

export const setSpotLightAnimation = () => {
  window.addEventListener('pointermove', setMousePositionAsCssVar)
}

export const removeSpotLightAnimation = () => {
  window.removeEventListener('pointermove', setMousePositionAsCssVar)
}