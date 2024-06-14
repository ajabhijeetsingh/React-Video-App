import { memo, useContext, useEffect } from 'react';
import './video.css'
import ThemeContext from '../context/ThemeContext';
// import VideoDispatchContext from '../context/VideoDispatchContext';
import useVideoDispatch from '../hooks/VideoDispatch';

// props are mainly read only and cannot be changed once they are visible on screen

const Video= memo( function Video({ title, channel="Coder Dost", views, time ,verified,id,children,editVideo}) {
    console.log("render Video",id);
    const theme=useContext(ThemeContext);
    const dispatch=useVideoDispatch();
    // using if else is usually not done because it repeats statements and it can also be done using ternary operator


    //render: when a component is run agian, or when UI is changed or again a function is run
    // 1st time rendering : mounting 
    // rest : unmounting


    // useEffect has three important thing-
    // first is callback   always runs if dependency is changed
    // second is its dependency 
    // cleanup funciton 
    // useEffect(()=>{
    //     const idx= setInterval(() => {
    //         console.log("playing video",id);
    //     }, 3000);
    //     return ()=>{
    //         clearInterval(idx);
    //     }
    // },[id])





    // if(verified){
    //     channelJSX=<div className='channel'>{channel} ✅</div>
    // }
    // else
    // channelJSX=<div className='channel'>{channel} </div>
    return (
        <>
            <div className={`container ${theme}`}>
                <button className='close' onClick={()=>dispatch({type: "DELETE",payload: id})}>X</button>
                <button className='edit' onClick={()=>editVideo(id)}>edit</button>
                <div className='pic'>
                    <img src={`https://picsum.photos/id/${id}/160/90`} alt="Katherine Johnson"></img>
                </div>

                <div className="title">{title}</div>
                

                {/* {verified?<div className='channel'>{channel} ✅</div>:<div className='channel'>{channel} </div>} */}

                {/* <div className='channel'>{channel} {verified?'✅':null} </div> */}

                {/* && method is generally used with the boolean elements */}
                <div className='channel'>{channel} {verified && '✅'} </div>
                <div className='views'>
                    {views}M views <span>.</span> {time} days ago
                </div>
                <div>{children}</div>
            </div>
            
        </>
    );
}
)

export default Video;