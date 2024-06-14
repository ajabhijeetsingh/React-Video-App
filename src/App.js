import videoDB from "./data/data"
import "./App.css"
import {  useCallback, useReducer, useState } from "react";
import AddVideo from "./components/addvideo";
import VideoList from "./components/VideoList";
import ThemeContext from "./context/ThemeContext";
import VideoContext from "./context/VideoContext";
import VideoDispatchContext from "./context/VideoDispatchContext";
import Counter from "./components/Counter";

//make sure to take care of event bobling

function App() {
  console.log("render app");

  const [editableVideo, seteditableVideo] = useState(null);

  const [mode, setMode] = useState('darkmode');

  

  function videosReducer(videos, action) {
    switch (action.type) {
      case 'ADD':
        return [
          ...videos,
          { ...action.payload, id: videos.length + 1 }
        ]
      case 'LOAD':
        return action.payload;
      case 'DELETE':
        return videos.filter(video => video.id !== action.payload);
      case 'UPDATE':
        const index = videos.findIndex(v => v.id === action.payload.id);
        const newVideos = [...videos];
        newVideos.splice(index, 1, action.payload);
        seteditableVideo(null);
        return newVideos;


      default: return videos
    }
  }

  const [videos, dispatch] = useReducer(videosReducer, []);             // reducer is function that returns a state



  // const themeContext = useContext(ThemeContext);

  // console.log(themeContext);

  const editVideo= useCallback(function editVideo(id) {
    seteditableVideo(videos.find(video => video.id === id));
  },[videos]

  )

  

  // const [videos,setVideos]=useState(videoDB);
  // const [editableVideo,seteditableVideo]=useState(null);

  // function addVideos(video){
  //   dispatch({type: 'ADD', payload: video});
  //   //action: {type: 'ADD', payload: video}
  //   // setVideos([
  //   //   ...videos,
  //   //   {...video,id: videos.length+1}
  //   // ])
  // }

  // function deleteVideo(id){
  //   dispatch({type: 'DELETE', payload: id});
  //   // setVideos(videos.filter(video=>video.id!==id));
  // }



  // function updateVideo(video){
  //   dispatch({type: 'UPDATE', payload: video})
  // //const index= videos.findIndex(v=>v.id===video.id);
  // //const newVideos=[...videos];
  // //newVideos.splice(index,1,video);
  // //setVideos(newVideos);
  // //seteditableVideo(null);
  // }

  console.log(videos);
  return (
    <ThemeContext.Provider value={mode}>

      <VideoContext.Provider value={videos}>
        <VideoDispatchContext.Provider value={dispatch}>
          <div className={`App ${mode}`} onClick={() => console.log("app")}>
            <Counter></Counter>
            <button onClick={() => setMode(mode === 'darkmode' ? 'lightmode' : 'darkmode')}> Mode</button>

            {/* <AddVideo addVideos={addVideos} updateVideo={updateVideo} editableVideo={editableVideo}></AddVideo>
      <VideoList deleteVideo={deleteVideo} editVideo={editVideo} videos={videos}></VideoList>   */}


            <AddVideo
              // dispatch={dispatch}
              editableVideo={editableVideo}
            >
            </AddVideo>
            <VideoList
              // dispatch={dispatch} 
              editVideo={editVideo}
            //videos={videos}
            >
            </VideoList>
          </div>
        </VideoDispatchContext.Provider>
      </VideoContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App;