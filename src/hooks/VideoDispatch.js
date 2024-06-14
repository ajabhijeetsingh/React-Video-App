import VideoDispatchContext from "../context/VideoDispatchContext";
const { useContext } = require("react");

function useVideoDispatch(){
    return useContext(VideoDispatchContext);
}

export default useVideoDispatch;