interface Window {
  onYouTubeIframeAPIReady: (() => void) | undefined;
  YT: {
    Player: new (
      elementId: string,
      config: {
        videoId: string;
        events: {
          onReady?: (event: { target: any }) => void;
        };
      }
    ) => any;
  };
}