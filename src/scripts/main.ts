import { setYouTubePlayer } from "@/scripts/modules/youtube-player";
import { setSpotLightAnimation } from "@/scripts/modules/bg-asap";

const movieSwitchTriggers = document.querySelectorAll('[data-movie-trigger]')

const initYouTubePlayer = async () => {
  return await setYouTubePlayer({
    elementId: 'player',
    videoId: 'kcelgrGY1h8'
  });
}

const player = await initYouTubePlayer()
await console.log('player', player)

// サムネイルクリックで動画切り替え
movieSwitchTriggers.forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    const target = event.currentTarget as HTMLButtonElement
    const movieId = target.getAttribute('data-movie-id')
    if (movieId && player) {
      player.loadVideoById(movieId)
    }
  })
})

setSpotLightAnimation()