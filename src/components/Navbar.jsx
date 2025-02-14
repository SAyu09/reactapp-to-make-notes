import React, { useState } from 'react'
import styles from "./Navbar.module.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { MdAssignmentAdd } from "react-icons/md";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import { LuFileSearch } from "react-icons/lu";
export default function Navbar({ note, setNote, arrNotes, setArrNotes }) {
    const [add, setAdd] = useState(true);
    const [search, setSearch] = useState(false);
    const [searchInp, setSearchInp] = useState("");
    const [searchArr, setSearchArr] = useState([]);
    const [update, setUpdate] = useState({ state: false, index: -1 });
    const success = (message) => {
        toast.success(message, {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };
    const warning = (message) => {
        toast.warning(message, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    function handleaddInput(e) {
        e.preventDefault();
        setAdd(true)
        setSearch(false);
        handleCancel(e)
    }
    function handleChange(e) {
        e.preventDefault();
        setNote({ ...note, [e.target.id]: e.target.value })
    }
    function handleClick(e) {
        e.preventDefault();
        if (note.title.trim() !== "") {
            setArrNotes([note, ...arrNotes])
            setNote({ title: "", text: "" })
            allWhite()
            setUpdate({ state: false, index: update.index })
        }
        else {
            warning("Enter the Title")
        }
       
    }
    function handleDelete(index) {
        setArrNotes(arrNotes.filter((ele, ind) => ind !== index))
        setNote({ title: "", text: "" })
        setUpdate({ state: false, index: update.index })
        allWhite()
    }
    function handleDisplay(index) {
        setNote(arrNotes[index])
        setUpdate({ state: true, index: [index] })
        allWhite()
        document.getElementById(`${index}`).style.backgroundColor = "lightgreen";
    }
    function allWhite() {
        for (let i = 0; i < arrNotes.length; i++) {
            document.getElementById(`${i}`).style.backgroundColor = "white";
        }
    }
    function handleSearchChange(e) {
        e.preventDefault()
        setSearchInp(e.target.value)
    }
    function handleSearch(e) {
        e.preventDefault()
        if (searchInp.trim() !== "") {
            setSearchArr(arrNotes)
            setArrNotes(arrNotes.filter((ele) => ele.title.includes(searchInp)))
        }
        setSearchInp("")
       
    }
    function handleSearchInput(e) {
        e.preventDefault()
        setSearch(true);
        setAdd(false)
    }
    function handleCancel(e) {
        e.preventDefault()
          setArrNotes(searchArr);
        setSearchInp("")
        
    }
    function handleUpdate(e) {
        e.preventDefault()
        if (note.title !== "") {
            arrNotes[update.index] = note;
            success("Note's Updated")
            
        }
        else {
            warning("Enter the Title")
        }
    }
    function handleClose(e) {
        e.preventDefault()
        setNote({ title: "", text: "" })
        setUpdate({ state: false, index: update.index })
        allWhite()
    }
    return (
        <div>
            <div>
                <ToastContainer
                    position="top-center"
                    autoClose={500}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
            <div className={styles.Navbox}>
                <div className={styles.addNotes}><button className={styles.addNotesBtn} onClick={handleaddInput}><MdAssignmentAdd/></button><button className={styles.searchBtn} onClick={handleSearchInput}><LuFileSearch /></button>
                    {add && (
                        <div className={styles.inputBox}>
                            <form >
                                <input type="text" placeholder=' Enter The Title' onChange={handleChange} value={note.title} id='title' />
                                <button onClick={handleClick} className={styles.btn}><MdOutlineFileDownloadDone /></button>
                            </form>
                        </div>
                    )}
                    {search && (
                        <div className={styles.inputBox}>
                            <form >
                                <input type="text" placeholder=' Search' onChange={handleSearchChange} className={styles.search} value={searchInp} id='title' />
                                <button className={styles.btn} onClick={handleSearch} ><i class="fa-solid fa-magnifying-glass">🔍</i></button>
                                <button className={styles.btn} onClick={handleCancel} ><i class="fa-solid fa-xmark">❌</i></button>
                            </form>
                        </div>
                    )}
                </div>
                <div className={styles.space}></div>
                <div className={styles.titlesBox}>
                    {arrNotes.map((element, index) => <div><button onClick={() => handleDisplay(index)} className={styles.titleBtn} id={`${index}`}>{element.title}</button> <button className={styles.deleteBtn} onClick={() => handleDelete(index)}><i class="fa-solid fa-trash"></i></button></div>)}
                </div>
            </div>
            {update.state && (
                <div className={styles.updateClose}>
                    <button className={styles.updateBtn} onClick={handleUpdate}>Update</button>
                    <button className={styles.closeBtn} onClick={handleClose}>Close</button>
                </div>)}
        </div>
    )
}