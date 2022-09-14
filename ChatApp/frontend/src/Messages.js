import React, { useState, useEffect } from "react";
import io from 'socket.io-client'
import './App.css';
import Picker from 'emoji-picker-react';
import Emoji from "./Emoji";
import { useSelector } from "react-redux";
import { selectUser } from "./features/userSlice";
import Linkarea from "./Linkarea";





const socket = io('http://localhost:7171')

function Messages({name}) {

  
    
    const [message, setMessage] = useState('')
    const [chat, setChat] = useState([])
    const [pickerOpen, togglePicker] = React.useReducer(state => !state, false);

    const [chosenEmoji, setChosenEmoji] = useState(null);
  
    const [cursor, setCursor]= useState(false) ;

   
    


    useEffect(() => {
        socket.emit('clientready', {status: "ready"})
        socket.on('previous', (result)=>{
            // let previousmessage=[];
            // result.map((data)=>{

            //     previousmessage.push(data.payload)
            // })
           
            setChat(result)
       })   
    },[setChat,socket]);

    function validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
      }


    useEffect(() => {
        socket.on('message', payload => {
            setChat([...chat, payload])
        })
    })




  
    const onenter = () =>{

        chat.map((prevdata)=>{
            if(prevdata.name!==name && cursor===false)
            {
                socket.emit("read-data", {time: prevdata.time})
            }
        })
      var len=chat.length;
      if(len>0)
      {if(((chat[len-1]).name)!==name)
       {
         console.log("refresh");
         socket.emit('clientready', {status: "ready"})
       }
    }
    }

    const onleave = () => {

    var len=chat.length;
      if(len>0)
      {if(((chat[len-1]).name)!==name)
       {
         console.log("refresh1");
         socket.emit('clientready', {status: "ready"})
       }
    }
    }


    const sendMessage = (e) => {
        e.preventDefault();
        const time = new Date().toLocaleTimeString();
        socket.emit('message', { name, message, time, cursor})
        setMessage('')
    };

    const getdisplaymessage= (payload) => {

       if( validURL(payload.message)){
       return <a className="link" href={payload.message} target="_blank">{payload.message}</a>
       }
       else{
           return payload.message;
       }
    }

    const handleinputchange= (e)=>{
        // if(validURL(e.target.value)){
        //     setMessage((<a className="typedlink">{e.target.value}</a>).props.children)
        //     // setMessage((<link rel="image_src" href={e.target.value} />).props.children)
        // }
        // else{
        //     setMessage(e.target.value)
        // }
    
            setMessage(e.target.value)
        
      
         
    }

    const totalmessage=chat.length;
    var [visiblemessage, setVisiblemessage] = useState(5);
    
    const handlelength= ()=>{
      if(visiblemessage<totalmessage-5)
       { setVisiblemessage(visiblemessage+5);}
      else{
          setVisiblemessage(totalmessage)
      }
    }

    const showmore = () => {
        if(visiblemessage<totalmessage){
             return "....";
        }
        else{
             return "";
        }
    }

    return (
        <div className="chatPage" onMouseLeave={onleave} onMouseEnter={onenter}  >                             
            <div className="chatContainer">
                <div className="header">Chat</div>
                <div className="chatBox">
                <div className="loadmoremessage" onMouseEnter={handlelength}>{showmore()}</div>
                    {chat.slice(totalmessage-visiblemessage,totalmessage).map((payload) => {
                    if(payload.name===name && payload.cursor===true)
                      { return (<><div className="name left">
                                <div>You:{" "}{getdisplaymessage(payload)}</div>
                                <span className="tick">&#10004;</span>
                            </div>
                            <div className="time1">{payload.time}</div>
                            </>
                        )}
                    else if(payload.name===name && payload.cursor===false)
                      { return (<><div className="name left">
                                <div>You:{" "}{getdisplaymessage(payload)}</div>
                            </div>
                            <div className="time1">{payload.time}</div>
                            </>
                        )}
                    else{
                        return (<><div>
                                <div className="name right">{payload.name}:{" "}{getdisplaymessage(payload)}</div>
                            </div>
                            
                            <div className="time2">{payload.time}</div></>
                        )
                    }
                    })}
                </div>
                <form className="inputBox" onSubmit={sendMessage}>
                     <Emoji onClick={togglePicker} />
                    <input type="text" placeholder="type your message..." id="chatInput" name="message" value={message}  onChange={handleinputchange}></input>
                    <button type='submit' className="sendBtn">Send</button>
                </form>
                <Linkarea message={message}></Linkarea>
                {pickerOpen && <Picker  onEmojiClick={(event, emojiObject) => {setMessage(message+emojiObject.emoji)}} pickerStyle={{ width: '40%'}} />} 
            </div>
        </div>
    )


};

export default Messages;

