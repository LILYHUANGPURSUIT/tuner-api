import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_API_URL;

function SongEditForm () {
    const [song, setSong] = useState({
        name:"",
        artist:"",
        album: "",
        time: "",
        is_favorite: false,
    });
    let {id} = useParams();
    let navigate = useNavigate();

    const updateSong = (updatedSong) => {
        axios.put(`${API}/songs/${id}`, updatedSong)
            .then(
                ()=> {
                    navigate(`/songs/${id}`);
                },
                (error) => console.error(error)
            )
            .catch((c) => console.warn("catch", c));
    }

    const handleTextChange = (event) => {
        setSong ({...song, [event.target.id]:event.target.value});
    }

    const handleCheckboxChange = () => {
        setSong ({...song, is_favorite:!song.is_favorite });
    }

    useEffect(()=> {
        axios.get(`${API}/songs/${id}`)
            .then((res) => setSong(res.data),
            (error) => navigate(`/not-found`));
    },[id, navigate])

    const handleSubmit = (event) => {
        event.preventDefault();
        updateSong(song, id);
    }


    return (
        <div className="Edit">
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name: </label>
                <input 
                    id="name"
                    value={song.name}
                    type="text"
                    onChange={handleTextChange}
                    required
                />
                <label htmlFor="artist">Artist: </label>
                <input 
                    id="artist"
                    value={song.artist}
                    type="text"
                    onChange={handleTextChange}
                    required
                />
                <label htmlFor="album">Album: </label>
                <input 
                    id="album"
                    value={song.album}
                    type="text"
                    onChange={handleTextChange}
                    required
                />
                <label htmlFor="time">Duration: </label>
                <input 
                    id="time"
                    value={song.time}
                    type="text"
                    onChange={handleTextChange}
                    required
                />
                <label htmlFor="is_favorite">Favorite: </label>
                <input 
                    id="is_favorite"
                    value={song.is_favorite}
                    type="checkbox"
                    onChange={handleCheckboxChange}
                    checked={song.is_favorite}
                />
                <br />

                <input type="submit" />

                <Link to={`/songs/${id}`}>Nevermind! Back to Show Page 🎵🎵🎵</Link>
            </form>
        </div>
    )
}

export default SongEditForm;