import { useEffect, useRef, useState } from "react";
import "./addVideo.css"
// import VideoDispatchContext from "../context/VideoDispatchContext";
import useVideoDispatch from "../hooks/VideoDispatch";

const initialState = {
    time: '1 month ago',
    channel: 'Coder Dost',
    verified: true,
    title: '',
    views: ''
}
function AddVideo({ editableVideo }) {

    const [video, setVideo] = useState(initialState);
    // const dispatch = useVideoDispatch();
    const dispatch = useVideoDispatch();
    const inputRef = useRef(null);

    function handleSubmit(e) {
        e.preventDefault();
        if (editableVideo) {
            dispatch({ type: "UPDATE", payload: video })
        }
        else {
            dispatch({ type: "ADD", payload: video })
        }

        setVideo(initialState);
    }
    function handleChange(e) {
        setVideo({
            ...video,
            [e.target.name]: e.target.value
        })
    }

    
    useEffect(() => {
        if (editableVideo) { setVideo(editableVideo); }
        inputRef.current.focus();
        // inputRef.current.placeholder=""
        // "type here".split('').forEach((char,i)=>{
        //     setTimeout(()=>{
        //         inputRef.current.placeholder=inputRef.current.placeholder+char;
        //     },200*i)
        // })
    }, [editableVideo])

    return (
        <div className="con">
        <form>
            {/* look for controlled forms */}
            <input
                ref={inputRef}      //inbuilt ref prop
                type="text"
                name="title"
                onChange={handleChange}
                placeholder="title"
                value={video.title}
            >
            </input>
            <input
                type="text"
                name="views"
                onChange={handleChange}
                placeholder="views"
                value={video.views}
            >
            </input>

            <button
                onClick={handleSubmit}

            >
                {editableVideo ? 'Edit' : 'Add'} Video
            </button>
        </form>
        </div>
    )
}
export default AddVideo;