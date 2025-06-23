// This file is copied from kevsframeplayer/src/hooks/useFrameDecoder.ts
// Placeholder content for useFrameDecoder hook
import { useState } from 'react';

const useFrameDecoder = () => {
  const [frame, setFrame] = useState(null);

  const decodeFrame = (data: any) => {
    // Placeholder logic for decoding a frame
    setFrame(data);
  };

  return { frame, decodeFrame };
};

export default useFrameDecoder;
