/// <reference types="youtube" />

type YouTubePlayerOptions = {
  elementId: string;
  videoId: string;
};

export const useYouTUbe = () => {
  const create = (args: YouTubePlayerOptions) => {
    const { elementId, videoId } = args;
    return new YT.Player(elementId, {
      height: "390",
      width: "640",
      videoId,
    });
  }

  const loadIframeAPI = async (): Promise<void> => {
    if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      await new Promise<void>((resolve) => window.onYouTubeIframeAPIReady = () => resolve());
    }
  }

  const set = async (args: YouTubePlayerOptions): Promise<YT.Player> => {
    await loadIframeAPI();
    return create(args)
  }

  return {
    set
  }
}