/*
Encapsulates one specific piece of content, either a video or an image
along with the UX for interacting with it
*/

import React, {useRef, useState, useEffect} from 'react';
import { MuteContext } from "../context";

import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
// import PauseIcon from '@material-ui/icons/Pause';
// import PlayArrowIcon from '@material-ui/icons/PlayArrow';


const ContentView = ({ id, url, isActive, thumbnailUrl }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const { muted, onToggleMuted } = React.useContext(MuteContext);


  useEffect(() => {
    if(isActive) {
      if(!isPlaying) {
        videoRef.current.play();
        setIsPlaying(true);
      }
      if(muted) {
        videoRef.current.muted = true;
      } else {
        videoRef.current.muted = false;
      }
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, [isActive, isPlaying, muted]);

  // const onPlayPause = () => {
  //   if(isPlaying) {
  //     videoRef.current.pause();
  //     setIsPlaying(false);
  //   } else {
  //     setIsPlaying(true);
  //     videoRef.current.play();
  //   }
  // }

  const VolumeButtonClass = muted ? VolumeOffIcon : VolumeUpIcon;
  // const PlayButtonClass = isPlaying ? PauseIcon : PlayArrowIcon;

  // "https://medium.com/@BoltAssaults/autoplay-muted-html5-video-safari-ios-10-in-react-673ae50ba1f5"
  return (
    <React.Fragment>
      <video height="100%" width="100%" poster={thumbnailUrl} id={id} ref={videoRef} loop playsInline >
        <source src={url} type="video/mp4"/>
      </video>
      <div id="overlay">
        <VolumeButtonClass onClick={onToggleMuted} fontSize="large"/>
        {/* <PlayButtonClass onClick={onPlayPause} fontSize="large"/> */}
      </div>
    </React.Fragment>
  );
}

export default ContentView;
