/*
Encapsulates one specific piece of content, either a video or an image
along with the UX for interacting with it
*/

import React, {useRef, useState, useEffect} from 'react';
import { MuteContext } from "../context";

import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';


const ContentView = ({ id, url, isActive }) => {
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

  const MuteClass = muted ? VolumeOffIcon : VolumeUpIcon;

  // "https://medium.com/@BoltAssaults/autoplay-muted-html5-video-safari-ios-10-in-react-673ae50ba1f5"
  return (
    <React.Fragment>
      <video height="100%" id={id} ref={videoRef} loop playsInline >
        <source src={url} type="video/mp4"/>
      </video>
      <div id="overlay">
        <MuteClass onClick={onToggleMuted} fontSize="large"/>
      </div>
    </React.Fragment>
  );
}

export default ContentView;
