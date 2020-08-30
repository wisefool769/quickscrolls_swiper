/*
Encapsulates one specific piece of content, either a video or an image
along with the UX for interacting with it
*/

import { TOGGLE_MUTE } from "../actions";
import React, {useRef, useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";

import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';


const ContentView = ({ id, url, isActive, thumbnailUrl }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const muted = useSelector(state => state.muted);
  const dispatch = useDispatch();

  useEffect(() => {
    if(isActive) {
      if(!isPlaying) {
        var promise = videoRef.current.play();
        if(promise !== undefined) {
          promise.catch(error => {

          })
        }
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

  const VolumeButtonClass = muted ? VolumeOffIcon : VolumeUpIcon;
  // const PlayButtonClass = isPlaying ? PauseIcon : PlayArrowIcon;

  // "https://medium.com/@BoltAssaults/autoplay-muted-html5-video-safari-ios-10-in-react-673ae50ba1f5"
  return (
    <React.Fragment>
      <video height="100%" width="100%" id={id} ref={videoRef} loop playsInline >
        <source src={url} type="video/mp4"/>
      </video>
      <div id="overlay">
        <VolumeButtonClass onClick={() => dispatch({ type: TOGGLE_MUTE})} fontSize="large"/>
        {/* <PlayButtonClass onClick={onPlayPause} fontSize="large"/> */}
      </div>
    </React.Fragment>
  );
}

export default ContentView;