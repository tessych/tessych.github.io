// Audio files placed in src/assets/music/ are picked up at build time.
const sources = import.meta.glob<string>('../assets/music/*.mp3', {
  eager: true,
  import: 'default',
  query: '?url',
});

// Duration and waveform come from offline PCM analysis, so the controls need no audio preload.
export const tracks = [
  {
    id: 'so-perfect',
    title: 'So Perfect',
    duration: 146.701,
    waveform: [
      12, 15, 19, 22, 23, 22, 22, 15, 15, 16, 16, 22, 23, 22, 22, 23, 23, 23, 22, 16, 12, 11, 14, 14,
      14, 16, 22, 22, 22, 21, 15, 15, 14, 14, 22, 22, 22, 19, 21, 23, 22, 21, 22, 24, 22, 23, 18, 3,
    ],
  },
  {
    id: 'whos-ready-for-tomorrow',
    title: 'Who’s Ready for Tomorrow',
    duration: 116.161,
    waveform: [
      5, 5, 4, 5, 6, 13, 23, 24, 23, 24, 24, 19, 8, 7, 8, 8, 9, 21, 22, 22, 24, 23, 23, 24,
      22, 24, 22, 24, 22, 9, 8, 8, 8, 11, 13, 12, 11, 13, 13, 13, 21, 22, 22, 23, 22, 23, 7, 3,
    ],
  },
  {
    id: 'h4unt',
    title: 'H4UNT',
    duration: 148.669,
    waveform: [
      3, 5, 7, 8, 7, 8, 10, 12, 9, 9, 9, 10, 15, 16, 17, 12, 16, 18, 20, 20, 19, 20, 19, 16,
      11, 10, 10, 10, 16, 16, 13, 16, 18, 11, 16, 19, 20, 19, 20, 21, 23, 23, 24, 23, 22, 4, 3, 3,
    ],
  },
  {
    id: 'i-wanna-go-to-china',
    title: 'I Wanna Go To China',
    duration: 139.038,
    waveform: [
      10, 10, 9, 12, 15, 15, 16, 17, 20, 20, 19, 16, 16, 19, 18, 20, 19, 20, 19, 19, 16, 17, 19, 19,
      20, 16, 16, 17, 16, 18, 20, 19, 18, 20, 19, 20, 16, 16, 17, 15, 23, 24, 22, 19, 24, 23, 22, 5,
    ],
  },
  {
    id: 'i-really-want-to-stay-at-your-house',
    title: 'I Really Want to Stay at Your House',
    duration: 246.675,
    waveform: [
      6, 5, 5, 6, 6, 5, 14, 14, 15, 16, 17, 17, 23, 23, 23, 22, 23, 22, 6, 9, 10, 11, 12, 11,
      13, 19, 24, 23, 23, 23, 24, 15, 6, 13, 13, 13, 15, 16, 15, 16, 10, 22, 23, 23, 22, 23, 22, 7,
    ],
  },
].map((track) => ({
  ...track,
  source: sources[`../assets/music/${track.id}.mp3`],
}));
