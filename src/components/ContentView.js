/*
Encapsulates one specific piece of content, either a video or an image
along with the UX for interacting with it
*/

import { TOGGLE_MUTE } from "../actions";
import React, {useRef, useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";

import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';

// const isSafari = () => {
//   const ua = navigator.userAgent.toLowerCase();
//   return ua.indexOf("safari") > -1 && ua.indexOf("chrome") < 0;
// };

const ContentView = ({ id, url, isActive, thumbnailUrl }) => {
  const videoContainerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const muted = useSelector(state => state.muted);
  const dispatch = useDispatch();

  const startPlayBack = () => {
    const video= videoContainerRef.current.children[0];
    var promise = video.play();
    if(promise !== undefined) {
      promise.catch(error => {
      }).then(() => {
        setIsPlaying(true);
      });
    } else {
      setIsPlaying(true);
    }
  }

  useEffect(() => {
    const video= videoContainerRef.current.children[0];

    
    if(isActive) {
      if(!isPlaying && video) {
        video.addEventListener('keydown', startPlayBack);
        video.addEventListener('touchend', startPlayBack);
        startPlayBack();
      }
      if(muted) {
        video.muted = true;
      } else {
        video.muted = false;
      }
    } else {
      video.pause();
      video.currentTime = 0;
      setIsPlaying(false);
    }
  }, [isActive, isPlaying, muted]);

  const VolumeButtonClass = muted ? VolumeOffIcon : VolumeUpIcon;
  // const PlayButtonClass = isPlaying ? PauseIcon : PlayArrowIcon;

  // "https://medium.com/@BoltAssaults/autoplay-muted-html5-video-safari-ios-10-in-react-673ae50ba1f5"
  const videoHtml = `
    <video 
      autoplay 
      muted 
      loop 
      playsinline 
      height="100%"
      width="100%"
    >
      <source src="${url}" type="video/mp4"/>
    </video>
  `;

  return (
    <React.Fragment>
      <div id={id} ref={videoContainerRef} className="video-container" dangerouslySetInnerHTML={{__html: videoHtml}}/>
      <div id="overlay">
        <VolumeButtonClass onClick={() => dispatch({ type: TOGGLE_MUTE})} fontSize="large"/>
        {/* <PlayButtonClass onClick={onPlayPause} fontSize="large"/> */}
      </div>
    </React.Fragment>
  );
}

export default ContentView;