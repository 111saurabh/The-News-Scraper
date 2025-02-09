



import { useState } from "react";
import "./hero.css";

function Card({ title, url, image }) {
    const [readmore, setReadmore] = useState(false);
    const [showIframe, setShowIframe] = useState(false);

    const description = readmore ? title : `${title.substring(0, 50)}....`;

    function readmoreHandler(event) {
        event.stopPropagation();
        setReadmore(!readmore);
    }

    function pageOpen(event) {
        event.stopPropagation();
        setShowIframe(true);
    }

    function closeIframe(event) {
        event.stopPropagation();
        setShowIframe(false);
    }

    return (
        <div className="card">

            
            <img src={image} alt="this is new" className=" h-60 w-70   rounded-xl"  />
            <div className="tour-info">
                <div className="description text-3xl font-semibold ">
                    {description}
                    <span className="read-more" onClick={readmoreHandler}>
                        {readmore ? `Show Less` : `Read More`}
                    </span>
                </div>
            </div>
            <button className="  bg-cyan-500 shadow-lg shadow-cyan-500/50 mt-[10] px-2 py-2  text-black bg-cyan-100 rounded-lg hover:bg-sky-300" onClick={pageOpen}>
                Open Page


                {/* margin-top: 10px;
    padding: 10px 20px;
    background-color: #000307;
    color: rgb(6, 6, 6);
    text-shadow: #1faa59;
    border: none;
    cursor: pointer; */}
            </button>
            {showIframe && (
                <div className="iframe-container">
                    <button className="close-button rounded-2xl" onClick={closeIframe}>
                        Close
                    </button>
                    <iframe
                        id="embeddedContent"
                        src={url}
                        title="Embedded Content"
                        className="embedded-iframe"
                    />
                </div>
            )}
        </div>
    );
}

export default Card;












