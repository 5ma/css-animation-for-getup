/// <reference types="youtube" />

type YouTubePlayerOptions = {
  elementId: string;
  videoId: string;
};

const YouTube = {
  createPlayer(args: YouTubePlayerOptions) {
    const { elementId, videoId } = args;
    return new YT.Player(elementId, {
      height: "390",
      width: "640",
      videoId,
    });
  },
  async loadIframeAPI(): Promise<void> {
    if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      await new Promise<void>((resolve) => window.onYouTubeIframeAPIReady = () => resolve());
    }
  },
  async setYouTubePlayer(args: YouTubePlayerOptions): Promise<YT.Player> {
    await this.loadIframeAPI();
    return this.createPlayer(args)
  },
};

export const setYouTubePlayer = async (args: YouTubePlayerOptions) => {
  const player = await YouTube.setYouTubePlayer(args)
  return player
}