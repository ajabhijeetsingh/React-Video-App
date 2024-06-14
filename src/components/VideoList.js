import Video from "./video";
import PlayButton from "./PlayButton";
import axios from "axios";
// import { useContext } from "react";
// import VideoContext from "../context/VideoContext";
import useVideos from "../hooks/Videos";
import { useCallback, useEffect, useMemo, useState } from "react";
import useVideoDispatch from "../hooks/VideoDispatch";

function VideoList({/*videos,*/  editVideo }) {
  // const videos=useContext(VideoContext);
  const url="https://my.api.mockaroo.com/videos.json?key=9950d270";

  const videos = useVideos();
  const dispatch = useVideoDispatch();
  // const [videos,setVideos]= useState([]);
  async function handleClick(){
    
    const res = await axios.get(url);
    console.log(res.data);
    dispatch({type: 'LOAD',payload: res.data})
  }

  useEffect(()=>{
    async function getVideos(){
    
      const res = await axios.get(url);
      console.log(res.data);
      dispatch({type: 'LOAD',payload: res.data})
    }
    getVideos();
  },[dispatch])

  const play = useCallback(()=> console.log('Playing..'),[]);
  const pause = useCallback(()=> console.log('Pause..'),[]);

  const memoButton =useMemo(()=>(
        <PlayButton
          onPlay={play}
          onPause={pause}
        >
          play
        </PlayButton>
  ),[pause,play]

  )

  return (
    <>
      {videos.map((video) => (
        <Video
        key={video.id}
        id={video.id}
        title={video.title}
        views={video.views}
        time={video.time}
        channel={video.channel}
        verified={video.verified}
        // dispatch={dispatch}
        editVideo={editVideo}
      >

        
        
      </Video>
      ))}
      <div>
        <button onClick={handleClick}>Get Videos</button>
      </div>
      
    </>
  )
}

export default VideoList;