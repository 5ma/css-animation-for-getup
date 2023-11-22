import RANDOM_MODULE from '@yama-dev/js-random-module'

export const setStarAnimation = () => {
  const RAM = new RANDOM_MODULE('[data-random-star="item"]',{
    elemWrap: '[data-random-star="wrapper"]',
    durationX2: 2400,
    interval: 150,
    intervalDeflection: 50,
    addClassName: ['is-active', 'is-rotate'],
    autoStart: true,
    preStartCount: 10,
    positionRandom: true,
    repeat: true
  });
}