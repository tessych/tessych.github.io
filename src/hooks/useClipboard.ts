import { useState, useCallback } from 'react';

/**
 * Encapsulates copying text to clipboard with legacy fallback and temporary success flag.
 */
export function useClipboard(timeoutMs = 1800) {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(
    async (textToCopy: string) => {
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          throw new Error('Clipboard API unavailable');
        }
      } catch {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        textarea.remove();
      }

      setIsCopied(true);
      const timer = setTimeout(() => setIsCopied(false), timeoutMs);
      return () => clearTimeout(timer);
    },
    [timeoutMs]
  );

  return { isCopied, copy };
}
