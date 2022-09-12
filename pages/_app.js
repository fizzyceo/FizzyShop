import '../styles/globals.css';
import { StoreProvider } from '../Context/Store';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { useEffect, useState } from 'react';
const clientSideEmotionCache = createCache({ key: 'css' });

function MyApp({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div>
      {mounted && (
        <StoreProvider>
          <Component {...pageProps} />
        </StoreProvider>
      )}
    </div>
  );
}

export default MyApp;
