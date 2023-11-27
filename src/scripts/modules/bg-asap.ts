import RANDOM_MODULE from '@yama-dev/js-random-module'

const spotlight: null | HTMLDivElement = document.querySelector('[data-spotlight]');

// spotlight
const useSpotlight = () => {
  const NJText = document.querySelector('[data-random-text="wrapper"]');

  const setMousePositionAsCssVar = (event: PointerEvent) => {
    if (!spotlight) return
    spotlight.style.setProperty('--spotlight-x', `${Math.floor(event.clientX)}px`)
    spotlight.style.setProperty('--spotlight-y', `${Math.floor(event.clientY)}px`)
  }

  const set = () => {
    window.addEventListener('pointermove', setMousePositionAsCssVar)

    // 最初にNewJeansのテキストにスポットライトを当てる
    if (!spotlight) return
    spotlight.style.setProperty('--spotlight-x', `${Math.floor(window.innerWidth / 2)}px`)
    spotlight.style.setProperty('--spotlight-y', `${Math.floor(window.innerHeight * 0.05)}px`)
    const mouseEnterEvent = new Event('mouseenter')
    NJText?.dispatchEvent(mouseEnterEvent)
  }

  const remove = () => {
    window.removeEventListener('pointermove', setMousePositionAsCssVar)
  }

  return {
    set,
    remove
  }
}

// NewJeans kidnap選出
const useKidnapTextAnimation = () => {
  const NJText = document.querySelector('[data-random-text="wrapper"]');
  if (!NJText) return;

  const initKidNapTextAnimation = () => {
    return new RANDOM_MODULE('[data-random-text="item"]',{
      elemWrap: '[data-random-text="wrapper"]',
      durationX2: 410,
      interval: 150,
      intervalDeflection: 50,
      addClassName: ['is-active-1', 'is-active-2', 'is-active-3', 'is-active-4'],
      autoStart: true,
      preStartCount: 2,
      positionRandom: false,
      repeat: true
    });
  }

  let kidnapTextAnime: any;
  const onMouseEnter = () => {
    spotlight?.classList.add('is-nj-in')

    if (kidnapTextAnime) {
      // 一度stopしてから再度startする
      kidnapTextAnime.StopAction()
      kidnapTextAnime.StartAction()
      return
    }

    kidnapTextAnime = initKidNapTextAnimation()
  }

  const onMouseLeave = () => {
    spotlight?.classList.remove('is-nj-in')
    if (kidnapTextAnime) kidnapTextAnime.StopAction()
  }

  const set = () => {
    NJText.addEventListener('mouseenter', onMouseEnter)
    NJText.addEventListener('mouseleave', onMouseLeave)
  }

  const remove = () => {
    NJText.removeEventListener('mouseenter', onMouseEnter)
    NJText.removeEventListener('mouseleave', onMouseLeave)
  }

  return {
    set,
    remove
  }
}

// star
const useStartAnimation = () => {
  let starRandomInstance: any;
  const init = () => {
    return new RANDOM_MODULE('[data-random-asap-star="item"]',{
      elemWrap: '[data-random-asap-star="wrapper"]',
      durationX2: 2000,
      interval: 110,
      intervalDeflection: 40,
      addClassName: ['is-active'],
      autoStart: true,
      preStartCount: 14,
      positionRandom: true,
      repeat: true
    });
  }

  const set = () => {
    if (starRandomInstance) {
      starRandomInstance.StartAction()
    } else {
      starRandomInstance = init()
    }
  }

  const stop = () => {
    if (starRandomInstance) starRandomInstance.StopAction()
  }

  return {
    set,
    stop
  }
}

export const createClassToggler = (element: HTMLElement | null, duration: number) => {
  let addTimer: undefined | number
  let removeTimer: undefined | number
  if (!element) return

  const active = () => {
    element.classList.add('is-active')
    setRandomPosition()
    removeTimer = window.setTimeout(inActive, duration)
  }

  const inActive = () => {
    element.classList.remove('is-active')
    addTimer = window.setTimeout(active, getRandomTime())
  }

  const setRandomPosition = () => {
    element.style.inset = `${getRandomPos()} auto auto ${Math.floor(Math.random() * 98)}%`
    element.style.rotate = `${Math.floor(Math.random() * 360)}deg`
  }

  const getRandomPos = () => {
    if (Math.random() < 0.5) {
      // 0~12%の間でランダムな値
      return `${Math.floor(Math.random() * 12)}%`
    } else {
      // 85~90%の間でランダムな値
      return `${Math.floor(Math.random() * 5 + 85)}%`
    }
  }

  const getRandomTime = () => {
    return Math.random() * 1500 + 1200 // 1200ms~2700ms
  }

  const stop = () => {
    clearTimeout(addTimer)
    clearTimeout(removeTimer)
  }

  const start = () => {
    active()
  }

  return {
    start,
    stop
  }
}

export const useAsapBg = () => {
  const spotlightAnime = useSpotlight()
  const kidnapText = useKidnapTextAnimation()
  const starAnime = useStartAnimation()
  const togglerLine = createClassToggler(document.querySelector('[data-asap-line]'), 1150)
  const togglerAsapSticker = createClassToggler(document.querySelector('[data-asap-sticker]'), 1600)

  const set = () => {
    kidnapText?.set()
    spotlightAnime.set()
    starAnime.set()
    togglerLine?.start()
    togglerAsapSticker?.start()
  }

  const stop = () => {
    kidnapText?.remove()
    starAnime.stop()
    spotlightAnime.remove()
    togglerLine?.stop()
    togglerAsapSticker?.stop()
  }

  return {
    set,
    stop
  }
}