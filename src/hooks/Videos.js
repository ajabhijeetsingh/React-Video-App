import VideoContext from "../context/VideoContext";
const { useContext } = require("react");

function useVideos(){
    return useContext(VideoContext);
}

export default useVideos;