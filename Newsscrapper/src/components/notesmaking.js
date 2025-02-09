// import React, { useState } from "react";
// import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";
// import "./hero.css";

// function Notes() {
//     const [notes, setNotes] = useState([]);
//     const [newNote, setNewNote] = useState("");
//     const [showNotes, setShowNotes] = useState(false);

//     function handleNoteChange(event) {
//         setNewNote(event.target.value);
//     }

//     function addNote() {
//         if (newNote.trim()) {
//             setNotes([...notes, newNote]);
//             setNewNote("");
//         }
//     }

//     function toggleNotes() {
//         setShowNotes(!showNotes);
//     }

//     return (
//         <div>
//             <button className="notes-button" onClick={toggleNotes}>
//                 {showNotes ? "Hide Notes" : "Make Notes"}
//             </button>
//             {showNotes && (
//                 <div className="notes-section">
//                     <textarea
//                         value={newNote}
//                         onChange={handleNoteChange}
//                         placeholder="Write your note here..."
//                     />
//                     <button onClick={addNote}>Add Note</button>
//                     <ul>
//                         {notes.map((note, index) => (
//                             <li key={index}>{note}</li>
//                         ))}
//                     </ul>
//                     <PDFDownloadLink
//                         document={<NotesDocument notes={notes} />}
//                         fileName="notes.pdf"
//                     >
//                         {({ blob, url, loading, error }) =>
//                             loading ? "Loading document..." : "Download PDF"
//                         }
//                     </PDFDownloadLink>
//                 </div>
//             )}
//         </div>
//     );
// }

// const NotesDocument = ({ notes }) => (
//     <Document>
//         <Page>
//             <Text>Notes</Text>
//             {notes.map((note, index) => (
//                 <Text key={index}>{note}</Text>
//             ))}
//         </Page>
//     </Document>
// );

// export default Notes;


// import React, { useEffect, useState } from "react";
// import ToDo from "./ToDo";
// import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";
// import axios from "axios";
// import { baseURL } from "./constant";
// import Popup from "./Popup";
// import "./noteskecss.css";


// const Notes = () => {
//     const [toDos, setToDos] = useState([]);
//     const [input, setInput] = useState("");
//     const [updateUI, setUpdateUI] = useState(false);
//     const [showPopup, setShowPopup] = useState(false);
//     const [popupContent, setPopupContent] = useState({});
  
//     useEffect(() => {
//       axios
//         .get(`${baseURL}/get`)
//         .then((res) => setToDos(res.data))
//         .catch((err) => console.log(err));
//     }, [updateUI]);
  
//     const saveToDo = () => {
//       axios
//         .post(`${baseURL}/save`, { toDo: input })
//         .then((res) => {
//           console.log(res.data);
//           setUpdateUI((prevState) => !prevState);
//           setInput("");
//         })
//         .catch((err) => console.log(err));
//     };
  
//     return (
//       <main>
//         <div className="container">
//           <h1 className="title">ToDo App</h1>
  
//           <div className="input_holder">
//             <input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               type="text"
//               placeholder="Add a ToDo..."
//             />
//             <button onClick={saveToDo}>Add</button>
//           </div>
  
//           <div className="list">
//             {toDos.map((el) => (
//               <ToDo
//                 key={el._id}
//                 text={el.toDo}
//                 id={el._id}
//                 setUpdateUI={setUpdateUI}
//                 setShowPopup={setShowPopup}
//                 setPopupContent={setPopupContent}
//               />
//             ))}
//           </div>
//         </div>
//         {showPopup && (
//           <Popup
//             setShowPopup={setShowPopup}
//             popupContent={popupContent}
//             setUpdateUI={setUpdateUI}
//           />
//         )}


 



//       </main>
//     );
// }




// export default Notes


// import React, { useEffect, useState } from "react";
// import ToDo from "./ToDo";
// import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";
// import axios from "axios";
// import { baseURL } from "./constant";
// import Popup from "./Popup";
// import "./noteskecss.css";

// const Notes = () => {
//     const [toDos, setToDos] = useState([]);
//     const [input, setInput] = useState("");
//     const [updateUI, setUpdateUI] = useState(false);
//     const [showPopup, setShowPopup] = useState(false);
//     const [popupContent, setPopupContent] = useState({});
//     const [showNotesSection, setShowNotesSection] = useState(false);

//     useEffect(() => {
//         axios
//             .get(`${baseURL}/get`)
//             .then((res) => setToDos(res.data))
//             .catch((err) => console.log(err));
//     }, [updateUI]);

//     const saveToDo = () => {
//         axios
//             .post(`${baseURL}/save`, { toDo: input })
//             .then((res) => {
//                 console.log(res.data);
//                 setUpdateUI((prevState) => !prevState);
//                 setInput("");
//             })
//             .catch((err) => console.log(err));
//     };

//     const toggleNotesSection = () => {
//         setShowNotesSection((prevState) => !prevState);
//     };

//     const MyDocument = (
//         <Document>
//             <Page>
//                 {toDos.map((el) => (
//                     <Text key={el._id}>{el.toDo}</Text>
//                 ))}
//             </Page>
//         </Document>
//     );

//     return (
//         <main>
//             <div className="container">
//                 <h1 className="title">ToDo App</h1>
//                 <button onClick={toggleNotesSection}>
//                     {showNotesSection ? "Hide Notes" : "Make Notes"}
//                 </button>

//                 {showNotesSection && (
//                     <div>
//                         <div className="input_holder">
//                             <input
//                                 value={input}
//                                 onChange={(e) => setInput(e.target.value)}
//                                 type="text"
//                                 placeholder="Add a ToDo..."
//                             />
//                             <button onClick={saveToDo}>Add</button>
//                         </div>

//                         <div className="list">
//                             {toDos.map((el) => (
//                                 <ToDo
//                                     key={el._id}
//                                     text={el.toDo}
//                                     id={el._id}
//                                     setUpdateUI={setUpdateUI}
//                                     setShowPopup={setShowPopup}
//                                     setPopupContent={setPopupContent}
//                                 />
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 <PDFDownloadLink
//                     document={MyDocument}
//                     fileName="notes.pdf"
//                     className="download_button"
//                 >
//                     {({ loading }) =>
//                         loading ? "Loading document..." : "Download Notes"
//                     }
//                 </PDFDownloadLink>
//             </div>
//             {showPopup && (
//                 <Popup
//                     setShowPopup={setShowPopup}
//                     popupContent={popupContent}
//                     setUpdateUI={setUpdateUI}
//                 />
//             )}
//         </main>
//     );
// };

// export default Notes;






import React, { useEffect, useState } from "react";
import ToDo from "./ToDo";
import { PDFDownloadLink, Document, Page, Text } from "@react-pdf/renderer";
import axios from "axios";
import { baseURL } from "./constant";
import Popup from "./Popup";
import "./noteskecss.css";

const Notes = () => {
    const [toDos, setToDos] = useState([]);
    const [input, setInput] = useState("");
    const [updateUI, setUpdateUI] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupContent, setPopupContent] = useState({});

    useEffect(() => {
        axios
            .get(`${baseURL}/get`)
            .then((res) => setToDos(res.data))
            .catch((err) => console.log(err));
    }, [updateUI]);

    const saveToDo = () => {
        axios
            .post(`${baseURL}/save`, { toDo: input })
            .then((res) => {
                console.log(res.data);
                setUpdateUI((prevState) => !prevState);
                setInput("");
            })
            .catch((err) => console.log(err));
    };

    const MyDocument = () => (
        <Document>
            <Page>
                <Text style={{ fontSize: 20, textAlign: 'center', marginBottom: 20 }}>ToDo List</Text>
                {toDos.map((todo, index) => (
                    <Text key={todo._id} style={{ fontSize: 14, margin: 10 }}>
                        {index + 1}. {todo.toDo}
                    </Text>
                ))}
            </Page>
        </Document>
    );

    return (
        // <main>
        //     <div className="container">
        //         <h1 className="title">ToDo App</h1>

        //         <div className="flex gap-5">


        //         <div className="input_holder h-800 w-800 border-t-emerald-200">
        //             <textarea className="rounded-lg bg-red-400"
        //                 value={input}
        //                 onChange={(e) => setInput(e.target.value)}
        //                 type="text"
        //                 placeholder="Add a ToDo..."
        //                 />
        //         </div>
        //             <button className="h-20 w-20 mt-5 rounded-lg px-3 py-3" onClick={saveToDo}>Add</button>
        //                 </div>

        //         <div className="list">
        //             {toDos.map((el) => (
        //                 <ToDo
        //                     key={el._id}
        //                     text={el.toDo}
        //                     id={el._id}
        //                     setUpdateUI={setUpdateUI}
        //                     setShowPopup={setShowPopup}
        //                     setPopupContent={setPopupContent}
        //                 />
        //             ))}
        //         </div>

        //         <PDFDownloadLink
        //             document={<MyDocument />}
        //             fileName="ToDo_List.pdf"
        //             className="download_button"
        //         >
        //             {({ blob, url, loading, error }) =>
        //                 loading ? 'Loading document...' : 'Download Notes'
        //             }
        //         </PDFDownloadLink>
        //     </div>

        //     {showPopup && (
        //         <Popup
        //             setShowPopup={setShowPopup}
        //             popupContent={popupContent}
        //             setUpdateUI={setUpdateUI}
        //         />
        //     )}
        // </main>






        <main className="flex flex-col items-center py-10">
    {/* <div className="container max-w-4xl mx-auto"> */}
    <div className="container  mx-auto">
        <h1 className="title text-3xl font-bold mb-8">Notes</h1>

        <div className="flex gap-9 mb-8 relative w-60">
            <div className="input_holder h-40 w-40  ">
                <textarea
                    className="  bg-cyan-600 shadow-lg shadow-cyan-500/50 rounded-lg bg-sky-100 w-full h-full p-3 resize-none text-red-700 shadow-cyan-500/50  box-shadow"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Add Notes..."
                />
            </div>
            <div>

            <button className=" absolute right-0 top-16 ml-5  px-3 py-3    rounded-xl bg-cyan-500 shadow-lg shadow-cyan-500/50   text-black bg-cyan-300 rounded-lg hover:bg-cyan-100 " onClick={saveToDo}>
                Add
            </button>
            </div>
        </div>

        <div className=" flex flex-wrap gap-10 ml-7 mr-2  w-full ">
            {toDos.map((el) => (
                <div key={el._id} className="relative p-1 border rounded-lg h-90 w-40 bg-gray-100">
                  
                    <ToDo
                        text={el.toDo}
                        id={el._id}
                        setUpdateUI={setUpdateUI}
                        setShowPopup={setShowPopup}
                        setPopupContent={setPopupContent}
                    />
                </div>
            ))}
        </div>

        <div className="mt-8">
            <PDFDownloadLink
                document={<MyDocument />}
                fileName="ToDo_List.pdf"
                className="download_button text-blue-500 underline"
            >
                {({ blob, url, loading, error }) =>
                    loading ? 'Loading document...' : 'Download Notes'
                }
            </PDFDownloadLink>
        </div>
    </div>

    {showPopup && (
        <Popup
            setShowPopup={setShowPopup}
            popupContent={popupContent}
            setUpdateUI={setUpdateUI}
        />
    )}
</main>





    );
}

export default Notes;

