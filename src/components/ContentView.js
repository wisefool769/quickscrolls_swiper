/*
Encapsulates one specific piece of content, either a video or an image
along with the UX for interacting with it
*/

import React, {useRef, useState, useEffect} from 'react';

const ContentView = ({ id, url, isActive }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if(isActive) {
      if(!isPlaying) {
        videoRef.current.play();
        setIsPlaying(true);
      }
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [isActive, isPlaying]);

  return (
    <video height="100%" id={id} ref={videoRef} loop muted playsinline >
      <source src={url} type="video/mp4"/>
    </video>
  );
}

export default ContentView;
