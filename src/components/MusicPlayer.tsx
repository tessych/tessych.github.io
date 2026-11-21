import { useEffect, useId, useRef, useState } from 'react';
import { ListMusic, Pause, Play, SkipBack, SkipForward, Volume2, VolumeX } from 'lucide-react';
import type { Copy } from '../types';
import { tracks } from '../data/tracks';
import cover from '../assets/hanekawa-playlist.jpg';

interface MusicPlayerProps {
  labels: Copy['player'];
}

const waveWidth = 480;
const waveHeight = 32;

function drawWave(samples: number[]) {
  const center = waveHeight / 2;
  const step = waveWidth / Math.ceil(samples.length / 2);
  let previousX = 0;
  let previousY = center;
  let path = `M 0 ${center}`;

  function connect(x: number, y: number) {
    const midpoint = (previousX + x) / 2;
    path += ` C ${midpoint} ${previousY}, ${midpoint} ${y}, ${x} ${y}`;
    previousX = x;
    previousY = y;
  }

  for (let index = 0; index < samples.length; index += 2) {
    const amplitude = (samples[index] + (samples[index + 1] ?? samples[index])) / 4;
    const direction = index % 4 === 0 ? -1 : 1;
    connect((index / 2 + 0.5) * step, center + amplitude * direction);
  }
  connect(waveWidth, center);

  return path;
}

const wavePaths = tracks.map((track) => drawWave(track.waveform));

function formatTime(seconds: number) {
  const wholeSeconds = Math.floor(seconds);
  return `${Math.floor(wholeSeconds / 60)}:${String(wholeSeconds % 60).padStart(2, '0')}`;
}

export function MusicPlayer({ labels }: MusicPlayerProps) {
  const audio = useRef<HTMLAudioElement>(null);
  const waveClipId = useId();
  const volumeFallback = useRef<{ context: AudioContext; level: AudioParam } | null>(null);
  const [selected, setSelected] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [queueOpen, setQueueOpen] = useState(false);
  const [failed, setFailed] = useState(false);
  const [position, setPosition] = useState(0);
  const [volume, setVolume] = useState(100);
  const track = tracks[selected];
  const playedWidth = Math.min(position / track.duration, 1) * waveWidth;
  const message = failed ? labels.error : !track.source ? labels.unavailable : '';

  useEffect(() => () => {
    const context = volumeFallback.current?.context;
    volumeFallback.current = null;
    if (context) void context.close();
  }, []);

  async function startPlayback(media: HTMLAudioElement, source: string, startAt: number) {
    setFailed(false);
    if (media.getAttribute('src') !== source || media.error) {
      media.src = source;
      media.currentTime = startAt;
    }

    try {
      const context = volumeFallback.current?.context;
      if (context && context.state !== 'running') void context.resume().catch(() => {});
      await media.play();
    } catch (error) {
      if (!(error instanceof DOMException && error.name === 'AbortError')) {
        setFailed(true);
      }
    }
  }

  function togglePlayback() {
    const media = audio.current;
    if (!media || !track.source) return;

    if (media.paused) void startPlayback(media, track.source, position);
    else media.pause();
  }

  function seek(seconds: number) {
    const media = audio.current;
    if (!media) return;

    const duration = Number.isFinite(media.duration) ? media.duration : track.duration;
    const nextPosition = Math.min(seconds, duration);
    if (media.hasAttribute('src')) media.currentTime = nextPosition;
    setPosition(nextPosition);
  }

  function changeVolume(percent: number) {
    const media = audio.current;
    if (!media) return;

    const level = percent / 100;
    if (!volumeFallback.current) {
      media.volume = level;
      // Some mobile browsers leave HTML media volume fixed at 1.
      if (media.volume !== level && typeof AudioContext !== 'undefined') {
        const context = new AudioContext();
        const gain = context.createGain();
        context.createMediaElementSource(media).connect(gain).connect(context.destination);
        volumeFallback.current = { context, level: gain.gain };
        void context.resume().catch(() => {});
      }
    }
    if (volumeFallback.current) volumeFallback.current.level.value = level;
    setVolume(volumeFallback.current ? percent : Math.round(media.volume * 100));
  }

  function selectTrack(index: number, continuePlayback = false) {
    const media = audio.current;
    const nextTrack = tracks[index];
    if (index === selected || !media || !nextTrack) return;

    const shouldPlay = continuePlayback || !media.paused;
    setPosition(0);
    setSelected(index);
    setPlaying(false);
    setFailed(false);

    if (shouldPlay && nextTrack.source) {
      void startPlayback(media, nextTrack.source, 0);
    } else {
      media.pause();
      media.removeAttribute('src');
      media.load();
    }
  }

  return (
    <section className="music-player" aria-label={labels.label}>
      <audio
        ref={audio}
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          selectTrack(selected + 1, true);
        }}
        onTimeUpdate={(event) => setPosition(event.currentTarget.currentTime)}
        onError={() => {
          setPlaying(false);
          setFailed(true);
        }}
      />
      <div className="music-player-bar">
        <div className="music-transport">
          <button
            type="button"
            className="music-skip"
            aria-label={labels.previous}
            disabled={selected === 0}
            onClick={() => selectTrack(selected - 1)}
          >
            <SkipBack aria-hidden="true" size={17} />
          </button>
          <button
            type="button"
            className="music-play"
            aria-label={playing ? labels.pause : labels.play}
            disabled={!track.source}
            onClick={togglePlayback}
          >
            {playing ? <Pause aria-hidden="true" size={18} /> : <Play aria-hidden="true" size={18} />}
          </button>
          <button
            type="button"
            className="music-skip"
            aria-label={labels.next}
            disabled={selected === tracks.length - 1}
            onClick={() => selectTrack(selected + 1)}
          >
            <SkipForward aria-hidden="true" size={17} />
          </button>
        </div>
        <span className="music-track" aria-live="polite" lang="en">{track.title}</span>
        <button
          type="button"
          className="music-queue-toggle"
          aria-expanded={queueOpen}
          aria-controls="music-queue"
          onClick={() => setQueueOpen(!queueOpen)}
        >
          <ListMusic aria-hidden="true" size={16} />
          {labels.queue}
        </button>
      </div>
      <div className="music-wave">
        <svg
          className="music-wave-curve"
          viewBox={`0 0 ${waveWidth} ${waveHeight}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <clipPath id={waveClipId}>
              <rect width={playedWidth} height={waveHeight} />
            </clipPath>
          </defs>
          <path d={wavePaths[selected]} vectorEffect="non-scaling-stroke" />
          <path
            className="music-wave-played"
            d={wavePaths[selected]}
            clipPath={`url(#${waveClipId})`}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <input
          type="range"
          className="music-seek"
          aria-label={labels.seek}
          aria-valuetext={`${formatTime(position)} / ${formatTime(track.duration)}`}
          min={0}
          max={Math.ceil(track.duration)}
          step={1}
          value={Math.round(position)}
          disabled={!track.source}
          onChange={(event) => seek(event.currentTarget.valueAsNumber)}
        />
      </div>
      <div className="music-player-details">
        <span className="music-time" aria-hidden="true">
          {formatTime(position)} / {formatTime(track.duration)}
        </span>
        <label className="music-volume">
          {volume === 0 ? <VolumeX aria-hidden="true" size={16} /> : <Volume2 aria-hidden="true" size={16} />}
          <input
            type="range"
            aria-label={labels.volume}
            aria-valuetext={`${volume}%`}
            min={0}
            max={100}
            value={volume}
            onChange={(event) => changeVolume(event.currentTarget.valueAsNumber)}
          />
          <span aria-hidden="true">{volume}%</span>
        </label>
      </div>
      <p className="music-status" role="status">{message}</p>
      <div className="music-queue" id="music-queue" hidden={!queueOpen}>
        {queueOpen && <img className="music-cover" src={cover} alt="" width={1200} height={1200} />}
        <ol>
          {tracks.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                lang="en"
                aria-pressed={index === selected}
                onClick={() => selectTrack(index)}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
