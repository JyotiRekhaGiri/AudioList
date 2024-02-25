// import React, { useState, useEffect, useRef } from 'react';
// import './Home.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faArrowLeft, faArrowRight, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

// function Home() {
//     const [mp3Files, setMp3Files] = useState([]);
//     const [playlist, setPlaylist] = useState([]);
//     const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
//     const [isPlaying, setIsPlaying] = useState(false);
//     const audioRef = useRef(null);

//     // Load playlist and current track index from local storage on component mount
// useEffect(() => {
//     const storedPlaylist = localStorage.getItem('playlist');
//     if (storedPlaylist) {
//         setPlaylist(JSON.parse(storedPlaylist));
//     }

//     const storedTrackIndex = localStorage.getItem('currentTrackIndex');
//     if (storedTrackIndex !== null) {
//         setCurrentTrackIndex(parseInt(storedTrackIndex));
//     }

//     // Check if there are items in the playlist and if the audioRef is initialized
//     if (playlist.length > 0 && audioRef.current) {
//         // Set the src of the audioRef to the first track in the playlist
//         audioRef.current.src = playlist[currentTrackIndex].url;
//         if (isPlaying) {
//             audioRef.current.play();
//         }
//     }
// }, [currentTrackIndex, isPlaying]);


//     // Update playlist in local storage whenever it changes
// useEffect(() => {
//     localStorage.setItem('playlist', JSON.stringify(playlist));
// }, [playlist]);

// // Function to handle file upload
// const handleFileUpload = (event) => {
//     const files = event.target.files;
//     const newMp3Files = [];
//     const newPlaylist = [];

//     for (let i = 0; i < files.length; i++) {
//         const audioBlob = URL.createObjectURL(files[i]);
//         newMp3Files.push(audioBlob);
//         newPlaylist.push({ name: files[i].name, url: audioBlob });
//     }

//     setMp3Files([...mp3Files, ...newMp3Files]);

//     // Use a callback function to update the playlist state
//     setPlaylist(prevPlaylist => [...prevPlaylist, ...newPlaylist]);
// };


//     // Function to handle track selection from playlist
//     const playTrack = (index) => {
//         setCurrentTrackIndex(index);
//         if (audioRef.current) {
//             // Check if the audio element is paused or if the current track is different from the selected track
//             if (audioRef.current.paused || audioRef.current.src !== playlist[index].url) {
//                 audioRef.current.src = playlist[index].url;
//                 audioRef.current.load();
//                 audioRef.current.play(); // Play the selected track immediately
//                 setIsPlaying(true);
//             }
//         }
//     };    

//     // Function to handle playback completion and play the next track
//     const handlePlaybackComplete = () => {
//         if (currentTrackIndex < playlist.length - 1) {
//             playTrack(currentTrackIndex + 1);
//         } else {
//             setCurrentTrackIndex(0); // Loop back to the first track
//             playTrack(0); // Start playing the first track automatically
//         }
//     };

//     // Function to play or pause the current track
//     const togglePlayPause = () => {
//         if (audioRef.current.paused) {
//             audioRef.current.play();
//             setIsPlaying(true);
//         } else {
//             audioRef.current.pause();
//             setIsPlaying(false);
//         }
//     };

//     // Function to play the previous track
//     const playPreviousTrack = () => {
//         const newIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
//         playTrack(newIndex);
//     };

//     // Function to play the next track
//     const playNextTrack = () => {
//         const newIndex = (currentTrackIndex + 1) % playlist.length;
//         playTrack(newIndex);
//     };

//     return (
//         <div id='container'>
//             <h1>Upload MP3 Files</h1>
//             <div className='inputFile'>
//                 <input type="file" accept="audio/mp3" multiple onChange={handleFileUpload} />
//             </div>
//             <hr />
//             <h2>Uploaded MP3 Files</h2>
//             <ul className={`card ${playlist.length > 4 ? 'scrollable' : ''}`} style={{ margin: "5px" }}>
//                 {mp3Files.map((file, index) => (
//                     <li key={index}>
//                         <audio controls>
//                             <source src={file} type="audio/mp3" />
//                             Your browser does not support the audio element.
//                         </audio>
//                     </li>
//                 ))}
//             </ul>
//             <hr />
//             <h2>Playlist</h2>
//             <ul className='card' id='box' style={{ margin: "3px" }}>
//                 {playlist.map((track, index) => (
//                     <li key={index}>
//                         <button className="btn btn-primary" onClick={() => playTrack(index)}>{track.name}</button>
//                     </li>
//                 ))}
//             </ul>
//             {playlist.length >= 2 && (
//                 <div className='audioButton'>
//                     <button className="btn btn-success" onClick={playPreviousTrack}>
//                         <FontAwesomeIcon icon={faArrowLeft} />
//                     </button>
//                     <button className="btn btn-success" onClick={togglePlayPause}>
//                         {isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
//                     </button>
//                     <button className="btn btn-success" onClick={playNextTrack}>
//                         <FontAwesomeIcon icon={faArrowRight} />
//                     </button>
//                 </div>
//             )}

//             <div className='lastPlayer'>
//                 {playlist.length > 0 && (
//                     <audio
//                         ref={audioRef}
//                         controls
//                         onEnded={handlePlaybackComplete}
//                     >
//                         Browser does not support the audio element.
//                     </audio>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Home;




import React, { useState, useEffect, useRef } from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';

function Home() {
    const [mp3Files, setMp3Files] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    // Load playlist and current track index from local storage on component mount
    useEffect(() => {
        const storedPlaylist = localStorage.getItem('playlist');
        if (storedPlaylist) {
            setPlaylist(JSON.parse(storedPlaylist));
        }

        const storedTrackIndex = localStorage.getItem('currentTrackIndex');
        if (storedTrackIndex !== null) {
            setCurrentTrackIndex(parseInt(storedTrackIndex));
            if (audioRef.current) { // Add this conditional check
                audioRef.current.src = JSON.parse(storedPlaylist)[parseInt(storedTrackIndex)].url;
                audioRef.current.play();
                setIsPlaying(true);
            }
        }

         // Check if there are items in the playlist and if the audioRef is initialized
    if (playlist.length > 0 && audioRef.current) {
        // Set the src of the audioRef to the first track in the playlist
        audioRef.current.src = playlist[0].url;
        audioRef.current.play();
        setIsPlaying(true);
    }
    }, []);


    // Update playlist in local storage whenever it changes
    useEffect(() => {
        localStorage.setItem('playlist', JSON.stringify(playlist));
    }, [playlist]);

    // Function to handle file upload
    const handleFileUpload = (event) => {
        const files = event.target.files;
        const newMp3Files = [];
        const newPlaylist = [];

        //     // Check if the current playlist length plus the new files exceeds 3
        //   if (playlist.length + files.length > 3) {
        //     alert("Only 3 audio files are allowed initially.");
        //     return;
        //   }

        for (let i = 0; i < files.length; i++) {
            const audioBlob = URL.createObjectURL(files[i]);
            newMp3Files.push(audioBlob);
            newPlaylist.push({ name: files[i].name, url: audioBlob });
        }

        setMp3Files([...mp3Files, ...newMp3Files]);
        setPlaylist([...playlist, ...newPlaylist]);
    };

    // Function to handle track selection from playlist
const playTrack = (index) => {
    setCurrentTrackIndex(index);
    if (audioRef.current) {
        audioRef.current.src = playlist[index].url;
        audioRef.current.load(); // Load the new source
        audioRef.current.addEventListener('canplaythrough', () => {
            audioRef.current.play(); // Play the audio once it's fully loaded
            setIsPlaying(true);
        });
    }
};


    // Function to handle playback completion and play the next track
    const handlePlaybackComplete = () => {
        if (currentTrackIndex < playlist.length - 1) {
            playTrack(currentTrackIndex + 1);
        } else {
            setCurrentTrackIndex(0); // Loop back to the first track
            playTrack(0); // Start playing the first track automatically
        }
    };

    // Function to play or pause the current track
    const togglePlayPause = () => {
        if (audioRef.current.paused) {
            audioRef.current.play();
            setIsPlaying(true);
        } else {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    // Function to play the previous track
    const playPreviousTrack = () => {
        const newIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
        playTrack(newIndex);
    };

    // Function to play the next track
    const playNextTrack = () => {
        const newIndex = (currentTrackIndex + 1) % playlist.length;
        playTrack(newIndex);
    };

    return (
        <div id='container'>
            <h1>Upload MP3 Files</h1>
            <div className='inputFile'>
                <input type="file" accept="audio/mp3" multiple onChange={handleFileUpload} />
            </div>
            <hr />
            <h2>Uploaded MP3 Files</h2>
            <ul className={`card ${playlist.length > 4 ? 'scrollable' : ''}`} style={{ margin: "5px" }}>
                {mp3Files.map((file, index) => (
                    <li key={index}>
                        <audio controls>
                            <source src={file} type="audio/mp3" />
                            Your browser does not support the audio element.
                        </audio>
                    </li>
                ))}
            </ul>
            <hr />
            <h2>Playlist</h2>
            <ul className='card' id="box" style={{margin: "3px"}}>
        {playlist.map((track, index) => (
          <li key={index}>
            <button className="btn btn-primary" onClick={() => playTrack(index)}>{track.name}</button>
          </li>
        ))}
      </ul>
            {playlist.length >= 2 && (
                <div className='audioButton'>
                    <button className="btn btn-success" onClick={playPreviousTrack}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </button>
                    <button className="btn btn-success" onClick={togglePlayPause}>
                        {isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                    </button>
                    <button className="btn btn-success" onClick={playNextTrack}>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </button>
                </div>
            )}

            <div className='lastPlayer'>
                {playlist.length > 0 && (
                    <audio
                        ref={audioRef}
                        controls
                        onEnded={handlePlaybackComplete}
                    >
                        Browser does not support the audio element.
                    </audio>
                )}
            </div>
        </div>
    );
}

export default Home;

// {/* <h2>Uploaded MP3 Files</h2>
//       <ul>
//         {mp3Files.map((file, index) => (
//           <li key={index}>
//             <audio controls>
//               <source src={file} type="audio/mp3" />
//               Your browser does not support the audio element.
//             </audio>
//           </li>
//         ))}
//       </ul> */}