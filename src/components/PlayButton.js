import { memo, useContext, useState } from 'react';
import './PlayButton.css';
import ThemeContext from '../context/ThemeContext';


// we can even pass functions as a prop
const PlayButton = memo( function PlayButton({message,children,onPlay,onPause}){
    console.log("render PlayButton");
    const theme=useContext(ThemeContext)


    //let playing = false;    // this approach is not generally used because while the video is paused but still the symbol will be of play
    const [playing, setPlaying]=useState(false);
    function handleClick(e){
        console.log(e);
        e.stopPropagation();           // to stop event bobbling   alternative is e.preventdefault e.g. to stop submit in forms

        // console.log(message);   
        if(playing) onPause();
        else onPlay();
        setPlaying(!playing);
    }
    return (
        // here console log is being called everytime the server is deployed instead define it as a function
        // <button onClick={console.log("play")}> Play</button>


        // event handler functions

        <button className={theme} onClick={handleClick}> {children} : {playing ? '⏸️': '⏯️'} </button>

    )
}
)
export default PlayButton;