import React, { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');

    const createNewRoom = (e) => {
        e.preventDefault();
        const id = uuidV4();
        setRoomId(id);
        toast.success('A new room created')
    }

    const joinRoom = () => {
        if (!roomId || !userName) {
            toast.error('Room ID and Username is required');
            return;
        }
        navigate(`/editor/${roomId}`, {
            state: {
                roomId,
                userName,
            }
        })
    }

    const keyHandler = (e) => {
        if (e.code === "Enter") {
            joinRoom();
        }
    }

    return (
        <div className='homePageWrapper'>
            <div className="formWrapper">
                <div className="formHead">
                    <img src="Assets\CodeFlux_transparent.png" alt="Code Flux Logo" className='logoImg' />
                    <img src="Assets\CodeFluxName_transparent.png" alt="Code Flux Name" className='logoImgName' />
                </div>
                <h4 className='mainLabel'>Paste invitation room ID</h4>
                <div className="inputGroup">
                    <input
                        type="text"
                        className="inputBox"
                        placeholder='Room ID'
                        onChange={(e) => setRoomId(e.target.value)}
                        value={roomId}
                        onKeyDown={keyHandler}
                    />
                    <input
                        type="text"
                        className="inputBox"
                        placeholder='User Name'
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                        onKeyDown={keyHandler}
                    />
                    <button className='btn joinBtn' onClick={joinRoom}>Join</button>
                </div>
                <span className='createInfo'>
                    If you don't have any invite then &nbsp;
                    <a onClick={createNewRoom} href="/" className='createNewBtn'><i>create new Room</i></a>
                </span>
            </div>
            <footer>
                <h4>Built with 💛 by <a href="https://github.com/Devansh3067">Devansh Bajpai</a></h4>
            </footer>
        </div>
    );
}

export default Home;
