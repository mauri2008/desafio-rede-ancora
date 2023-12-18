import { PauseCircleOutlined, PlayCircleOutlined, StopCircleOutlined } from '@mui/icons-material';
import { CircularProgress, IconButton, Stack } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

function AudioPlayer({ src }: { src: string }) {
    const [audio, setAudio] = useState(new Audio(src));
    const [progress, setProgress] = useState(0);
    const audioRef = useRef(audio);

    useEffect(() => {
        setAudio(new Audio(src));
    }, [src]);

    useEffect(() => {
        audioRef.current = audio;

        const interval = setInterval(() => {
            setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
        }, 100);
        
        
        const handleAudioEnd = () => {
            audioRef.current.currentTime = 0;
            setProgress(0);
        };
    
        audioRef.current.addEventListener('ended', handleAudioEnd);
    
        return () => {
            clearInterval(interval);
            audioRef.current.removeEventListener('ended', handleAudioEnd);
        };
        

    }, [audio]);

    const playAudio = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    const pauseAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    };
    

    const stopAudio = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
    };

    return (
        <Stack direction='row'>
            <div style={{ position: 'relative' }}>
                    <IconButton size='small' onClick={playAudio} color='success'>
                        {
                            progress === 0?
                                <PlayCircleOutlined />
                                :
                                <CircularProgress variant='determinate' value={progress} size={20} sx={{mt:0.25}} />
                        }
                    </IconButton>
            </div>
            <IconButton size='small' onClick={pauseAudio} color='success'><PauseCircleOutlined /></IconButton>
            <IconButton size='small' onClick={stopAudio} color='success'><StopCircleOutlined /></IconButton>
        </Stack>
    );
}

export default AudioPlayer;