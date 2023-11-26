import { setYouTubePlayer } from "@/scripts/modules/youtube-player";
import { START, STOP } from "@/scripts/modules/switch-bg-animation";
import { mvListData } from "@/constants/mv-list-data";

const container = document.querySelector('#container')
const movieSwitchTriggers = document.querySelectorAll('[data-movie-trigger]')
const keywordsToggle = document.querySelector('[data-keywords-trigger]')
const keywordsLists = document.querySelectorAll('[data-keywords-list]')

// 最初に表示しておく動画ID
const defaultVideoId = mvListData[0].id

const state = {
  currentVideoId: '' // 現在再生中の動画IDを格納
}

const updateStateVideoId = (videoId: string) => {
  state.currentVideoId = videoId
}

const initYouTubePlayer = async () => {
  return await setYouTubePlayer({
    elementId: 'player',
    videoId: defaultVideoId
  });
}

const player = await initYouTubePlayer()
updateStateVideoId(defaultVideoId)
container?.setAttribute('data-current-movie', defaultVideoId)
if (START[defaultVideoId]) {
  START[defaultVideoId]()
}

const switchVideo = (videoId: string | null) => {
  if (!videoId || !player) return

  player.loadVideoById(videoId)
  container?.setAttribute('data-current-movie', videoId)

  // 前の背景アニメーションをSTOP
  if (STOP[state.currentVideoId]) {
    STOP[state.currentVideoId]()
  }
  // 次の背景アニメーションをSTART
  if (START[videoId]) {
    START[videoId]()
  }
  // update state
  updateStateVideoId(videoId)
}

// サムネイルクリックで動画切り替え
movieSwitchTriggers.forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    const target = event.currentTarget as HTMLButtonElement
    const movieId = target.getAttribute('data-movie-id')

    // 現在再生中の動画と同じサムネイルをクリックした場合はreturnする
    if (movieId === state.currentVideoId) return
    switchVideo(movieId)
  })
})

// keywordsボタンにホバーしたら背景アニメーションのkeywordとなるものを表示する
keywordsToggle?.addEventListener('mouseenter', () => {
  keywordsLists.forEach((list) => {
    const listId = list.getAttribute('data-id')
    if (listId === state.currentVideoId) {
      list.setAttribute('aria-hidden', 'false')
    }
  })
})

keywordsToggle?.addEventListener('mouseleave', () => {
  keywordsLists.forEach((list) => {
    list.setAttribute('aria-hidden', 'true')
  })
})