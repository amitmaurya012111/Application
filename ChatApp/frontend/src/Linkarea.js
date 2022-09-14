import React from 'react';
import LinkPreview from '@ashwamegh/react-link-preview';
import './App.css';



function Linkarea({ message }) {

    function CustomComponent({ loading, preview }) {
        console.log("enter")
        return loading
            ? (<h1>Loading...</h1>)
            : (
                <div >
                    <div className='description'>
                        <p>Domain: {preview.domain}</p>
                        <p>Title: {preview.title}</p>
                        <p>Description: {preview.description}</p>
                    </div>
                    <div className='image'>
                        <img height="100px" width="100px" src={preview.img} alt={preview.title} />
                    </div>
                </div>
            )
    }

    function validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }


    if (validURL(message)) {
        return <LinkPreview url={message} render={CustomComponent} />
    }
    else {
        return "";
    }
}

export default Linkarea;