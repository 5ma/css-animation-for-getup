import RANDOM_MODULE from '@yama-dev/js-random-module'

const spotlight: null | HTMLDivElement = document.querySelector('[data-spotlight]');

// spotlight
const useSpotlight = () => {
  const setMousePositionAsCssVar = (event: PointerEvent) => {
    if (!spotlight) return
    spotlight.style.setProperty('--spotlight-x', `${Math.floor(event.clientX)}px`)
    spotlight.style.setProperty('--spotlight-y', `${Math.floor(event.clientY)}px`)
  }

  const set = () => {
    window.addEventListener('pointermove', setMousePositionAsCssVar)
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
const setKidnapTextAnimation = () => {
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

  const setRandom = () => {
    const NJText = document.querySelector('[data-random-text="wrapper"]');
    let kidnapTextAnime: any;
    NJText?.addEventListener('mouseenter', () => {
      spotlight?.classList.add('is-nj-in')
      if (kidnapTextAnime) {
        kidnapTextAnime.StartAction()
      } else {
        kidnapTextAnime = initKidNapTextAnimation();
      }
    })
    NJText?.addEventListener('mouseleave', () => {
      spotlight?.classList.remove('is-nj-in')
      if (kidnapTextAnime) kidnapTextAnime.StopAction();
    })
  }

  setRandom()
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
  const starAnime = useStartAnimation()
  const togglerLine = createClassToggler(document.querySelector('[data-asap-line]'), 1150)
  const togglerAsapSticker = createClassToggler(document.querySelector('[data-asap-sticker]'), 1600)

  const set = () => {
    spotlightAnime.set()
    setKidnapTextAnimation()
    starAnime.set()
    togglerLine?.start()
    togglerAsapSticker?.start()
  }

  const stop = () => {
    spotlightAnime.remove()
    starAnime.stop()
    togglerLine?.stop()
    togglerAsapSticker?.stop()
  }

  return {
    set,
    stop
  }
}