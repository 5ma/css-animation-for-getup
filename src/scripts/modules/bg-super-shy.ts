import RANDOM_MODULE from '@yama-dev/js-random-module'

const useStarAnimation = () => {
  let starRandomInstance: any;

  const init = () => {
    return new RANDOM_MODULE('[data-random-star="item"]',{
      elemWrap: '[data-random-star="wrapper"]',
      durationX2: 2400,
      interval: 150,
      intervalDeflection: 50,
      addClassName: ['is-active', 'is-rotate'],
      autoStart: true,
      preStartCount: 10,
      positionRandom: true,
      repeat: true
    })
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

export const useSuperShyBg = () => {
  const starAnime = useStarAnimation()

  const set = () => {
    starAnime.set()
  }

  const stop = () => {
    starAnime.stop()
  }

  return {
    set,
    stop
  }
}