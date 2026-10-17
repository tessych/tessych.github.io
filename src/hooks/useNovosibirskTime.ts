import { useEffect, useState } from 'react';

/**
 * Returns the formatted real-time clock for Novosibirsk (UTC+7).
 * Updates once per second with tabular-num format.
 */
export function useNovosibirskTime(): string {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      try {
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Novosibirsk',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        });
        setTime(formatter.format(new Date()));
      } catch {
        setTime('');
      }
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return time;
}
