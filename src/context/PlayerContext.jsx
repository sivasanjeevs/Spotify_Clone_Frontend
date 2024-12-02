import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

//This Context will allow you to share data globally in your React app without passing props.
export const PlayerContext = createContext();

const PlayerContextProvider = (props) =>{

    const audioRef = useRef();
    const seekBg = useRef();
    const seekBar = useRef(); 

    const [track, setTrack] = useState(songsData[0]);
    const [playStatus, setPlayStatus] = useState(false);
    const [time, setTime] = useState({
        currentTime: {
            second: 0,
            minute: 0
        },
        totalTime: {
            second: 0,
            minute: 0
        }
    });

    const play = () => {
        audioRef.current.play();
        setPlayStatus(true);
    }

    const pause = () => {
        audioRef.current.pause();
        setPlayStatus(false);
    }
//wait for the song to play
    const playWithId = async (id) => {
        await setTrack(songsData[id]);
        await audioRef.current.play();
        setPlayStatus(true);
    }

    const previous = async () => {
        if (track.id > 0) {
            const newTrackId = track.id - 1; // Decrement the track id
            await setTrack(songsData[newTrackId]); // Set the new track
            await audioRef.current.play(); // Play the new track
            setPlayStatus(true); // Update play status
        }
    };
    

    const next = async () => {
        if (track.id < songsData.length - 1) {
            const newTrackId = track.id + 1; // Increment the track id
            await setTrack(songsData[newTrackId]); // Set the new track
            await audioRef.current.play(); // Play the new track
            setPlayStatus(true); // Update play status
        }
    };
    

    const seekSong = async (e) => {
        console.log(e);
        audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration);
    }

    useEffect(() => {
        setTimeout(() => {
            audioRef.current.ontimeupdate =() => {
                seekBar.current.style.width = (Math.floor(audioRef.current.currentTime / audioRef.current.duration*100))+"%";
                setTime({
                    currentTime: {
                        second: Math.floor(audioRef.current.currentTime % 60),
                        minute: Math.floor(audioRef.current.currentTime / 60),
                    },
                    totalTime: {
                        second: Math.floor(audioRef.current.duration % 60),
                        minute: Math.floor(audioRef.current.duration / 60),
                    },
                });
            }
        },1000)
    },[audioRef])

    /*
    useEffect(() => {
    const updateSeekBar = () => {
        if (audioRef.current && seekBar.current) {
            seekBar.current.style.width = 
                (Math.floor((audioRef.current.currentTime / audioRef.current.duration) * 100)) + "%";
            setTime({
                currentTime: {
                    second: Math.floor(audioRef.current.currentTime % 60),
                    minute: Math.floor(audioRef.current.currentTime / 60),
                },
                totalTime: {
                    second: Math.floor(audioRef.current.duration % 60),
                    minute: Math.floor(audioRef.current.duration / 60),
                },
            });
        }
    };

    // Set the ontimeupdate listener
    audioRef.current.ontimeupdate = updateSeekBar;

    // Cleanup when component unmounts
    return () => {
        if (audioRef.current) {
            audioRef.current.ontimeupdate = null;
        }
    };
}, [audioRef, seekBar]);
*/



//This is an object that holds the data or functions you want to share with other components.
    const contextValue = {
        audioRef,
        seekBg,
        seekBar,
        track, setTrack,
        playStatus, setPlayStatus,
        time, setTime,
        play, pause,
        playWithId,
        previous, next,
        seekSong,
    }

//The provider component is where you define the shared data and make it available to the app.
    return (
        <PlayerContext.Provider value={contextValue}>
            {props.children}
        </PlayerContext.Provider>
    )}

export default PlayerContextProvider;