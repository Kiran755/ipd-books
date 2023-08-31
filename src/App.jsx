import { useState } from 'react'
import db from "./config/database"
import { collection, getDocs, getCountFromServer, doc, setDoc, getDoc } from 'firebase/firestore'
function App() {
  const [BookName, setBookName] = useState({ first: "", second: "", third: "" })
  const [status, setStatus] = useState("")
  const [count, setCount] = useState(0)
  const [total, setTotal] = useState(0)
  const findBook = async () => {
    let book = BookName.first + "-"
    let colName = BookName.first
    if (BookName.second !== "") {
      colName += "-" + BookName.second
      book += BookName.second + "-"
    }

    book += BookName.third
    let docRef = doc(db, colName, book)
    const docSnap = await getDoc(docRef)
    console.log("bookName : " + book)
    console.log("colName : " + colName)

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setStatus("Document exists!")
    }
    else {
      console.log("No such document!");
      setStatus("Document Not found")
      const colRef = doc(db, "BooksNotFound", book)
      let key1 = "isOverwritten" + count
      let data = {}
      data[key1] = false
      setDoc(colRef, data, { merge: true })
      setCount(count + 1)
      localStorage.setItem("Count", count)
    }
    setTotal(total + 1)
    localStorage.setItem("Total", total)
  }
  const clearData = () => {
    setBookName({ first: "", second: "", third: "" })
  }
  return (
    <div className='flex flex-col justify-center items-center border border-black h-screen w-screen'>
      <div className='flex flex-row flex-wrap m-2 p-2'>
        <input type="text" className='border border-black w-20 text-center' onChange={(e) => setBookName({ ...BookName, first: e.target.value })} value={BookName.first}></input>
        <span className='text-3xl'>  -  </span>
        <input type="text" className='border border-black w-20 text-center' onChange={(e) => setBookName({ ...BookName, second: e.target.value })} value={BookName.second}></input>
        <span className='text-3xl'>  -  </span>
        <input type="text" className='border border-black w-20 text-center' onChange={(e) => setBookName({ ...BookName, third: e.target.value })} value={BookName.third}></input>
      </div>
      <div className='flex'>
        <button className='border border-black rounded-lg p-2 m-2 w-24' onClick={clearData}>
          Clear
        </button>
        <button className='border border-black rounded-lg p-2 m-2 w-24' onClick={findBook}>
          Search
        </button>
      </div>

      <div>
        {status}
      </div>
      <div>
        Books Not Found : {Number(localStorage.getItem("Count")) + 1}
      </div>
      <div>
        Total : {Number(localStorage.getItem("Total")) + 1}
      </div>
    </div>
  )
}

export default App
