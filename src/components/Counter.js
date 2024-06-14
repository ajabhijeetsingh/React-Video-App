// states are used when we need to change UI too

import { useCallback, useMemo, useRef, useState } from "react";



function Counter(){
    
    const [number,setNumber]=useState(30);
    // useRef doesn't render again and again like the useState hook
    let num=useRef(0);   //  here useRef is an object    it has a property named as .current
    function handleClick(e){
        e.stopPropagation();
        //setNumber(number+1);  //if we increment setNumber multiple times but still after one click its value will be 1 because after the function runs then the value changes for rendering
        // setNumber(number+1);      //usually works as a snapshot
        // setNumber(number+1);
        // setNumber(number+1);
        //setTimeout(()=>{
        //   setNumber(number+1);  // 
        //},2000
        //)

        setNumber(number=> number+1);    // using updater function i.e.    => 
        setNumber(number=> number+1);    //puts elements in queue
        num.current++;
        console.log(num.current);
    }

    const fibfx=useCallback( function fib(n){
        if(n===1 || n===2){
            return 1
        }
        return fib(n-1) + fib(n-2);
        
    },[]) 
    
    const fibmemo=useMemo(()=>fibfx(number),[number,fibfx])


    return (
        <>
        <h1 style={{color: 'black',margin: '0'}}>{number} | {fibmemo}</h1>
        <button onClick={handleClick}>Add</button>
        </>
    )
}
export default Counter;