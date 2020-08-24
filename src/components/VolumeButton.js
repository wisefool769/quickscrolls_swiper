import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import { TOGGLE_MUTE } from "../actions";

const VolumeButton = () => {
    const muted = useSelector(state => state.muted);
    const dispatch = useDispatch();
    const VolumeButtonClass = muted ? VolumeOffIcon : VolumeUpIcon;
    return (
        <VolumeButtonClass onClick={() => dispatch({type: TOGGLE_MUTE})} fontSize="large"/>
    );
}

export default VolumeButton;