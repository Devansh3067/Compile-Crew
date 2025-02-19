//*imports..
import React, { useEffect, useState, useRef } from 'react';
import Client from '../components/Client';
import Editor from '../components/Editor';
import { initSocket } from '../socket';
import ACTIONS from '../Action';
import { useLocation, useNavigate, Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const EditorPage = () => {
    const socketRef = useRef(null);
    const codeRef = useRef (null); 
    const location = useLocation();
    const {roomId} = useParams();
    const reactNavigator = useNavigate();

    const [clients, setClients] = useState([]);

    useEffect(() => {
        const init = async () => {
            socketRef.current = await initSocket();
            socketRef.current.on('connection_error', (err) => handleErrors(err));
            socketRef.current.on('connection_failed', (err) => handleErrors(err));

            function handleErrors(e) {
                console.log('socket error', e);
                toast.error('Socket connection failed, try again later');
                reactNavigator('/');
            }

            socketRef.current.emit(ACTIONS.JOIN, {
                roomId,
                userName: location.state?.userName,
            });

            //* Listening for joined event.
            socketRef.current.on(ACTIONS.JOINED, ({ allClients, userName, socketId }) => {
                if (userName !== location.state?.userName) {
                    toast.success(`${userName} joined the room.`);
                }
                // console.log(`${userName} joined`); 
                setClients(allClients); 
                if (codeRef.current !== null) {
                    socketRef.current.emit(ACTIONS.SYNC_CODE, {
                        code: codeRef.current,
                        socketId,
                    });
                }
            });

            //*Listening for disconnect event..
            socketRef.current.on(ACTIONS.DISCONNECTED, ({ socketId, userName }) => {
                toast.error(`${userName} left the room.`);
                setClients((prev) => {
                    return prev.filter(
                        (client) => client.socketId !== socketId
                    );
                })
            });
        }
        init();
        return () => {
            socketRef.current.disconnect();
            socketRef.current.off(ACTIONS.JOINED);
            socketRef.current.off(ACTIONS.DISCONNECTED);
        }
    }, []);

    if (!location.state) {
        return <Navigate to="/" />;
    }

    const leaveRoom = () => {
        //todo socketRef.current.emit(ACTIONS.LEAVE, {
        //todo     roomId: location.state?.roomId,
        //todo     userName: location.state?.userName,
        //todo });
        //todo socketRef.current.disconnect();
        reactNavigator('/');
    }

    async function copyRoomId() {
        try {
            // console.log(roomId);
            await navigator.clipboard.writeText(roomId);
            toast.success("Room Id copied to clipboard.");
        }catch(err){
            toast.error("Could not copy roomId");
        }
    }

    return (
        <div className='editorPageWrap'>
            <div className="aside">
                <div className="asideInner">
                    <div className="logo">
                        <img src="/Assets/CodeFlux_transparent.png" alt="CodeFluxLogo" className="logoImg" />
                    </div>
                    <h3>Connected</h3>
                    <div className="clientList">
                        {clients.map((client) => (
                            <Client key={client.socketId} username={client.userName} />
                        ))}
                    </div>
                </div>
                <button className='btn copyBtn' onClick={copyRoomId}>Copy Room ID</button>
                <button className='btn leaveBtn' onClick={leaveRoom}>Leave</button>
            </div>
            <div className="editorWrap">
                <Editor socketRef={socketRef} roomId={roomId} onCodeChange = {(code)=>{codeRef.current = code}}/>
            </div>
        </div>
    );
}

export default EditorPage;
