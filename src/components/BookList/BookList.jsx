import React, { useState } from 'react';
import { useGlobalContext } from '../../context.';
import Book from "../BookList/Book";
import Loading from "../Loader/Loader";
import coverImg from "../../images/cover_not_found.jpg";
import "./BookList.css";

//https://covers.openlibrary.org/b/id/240727-S.jpg

const BookList = () => {
  const [pageNo,setPageNo] = useState(1);
  const Booksperpage = 8;
  let lastIndex = pageNo*Booksperpage;
  let firstIndex = lastIndex-Booksperpage;
  const {books, loading, resultTitle} = useGlobalContext();
  const pages = Math.ceil(books.length/Booksperpage);
  const Numbers = [...Array(pages+1).keys()].slice(1);
  const booksWithCovers = books.map((singleBook) => {
    return {
      ...singleBook,
      // removing /works/ to get only id
      id: (singleBook.id).replace("/works/", ""),
      cover_img: singleBook.cover_id ? `https://covers.openlibrary.org/b/id/${singleBook.cover_id}-L.jpg` : coverImg
    }
  });

  if(loading) return <Loading />;

  const handlePrev = ()=>{
       if(pageNo !== 1){
        setPageNo(pageNo-1);
       }
  }
  const handlecpage = (id)=>{
     setPageNo(id);
}
const handleNext = ()=>{
  if(pageNo !== pages){
   setPageNo(pageNo+1);
  }
}
  return (
    <>
    <section className='booklist'>
      <div className='container'>
        <div className='section-title'>
          <h2>{resultTitle}</h2>
        </div>
        <div className='booklist-content grid'>
          {
            booksWithCovers.slice(firstIndex,lastIndex).map((item, index) => {
              return (
                <Book key = {index} {...item} />
              )
            })
          }
        </div>
      </div>
    </section>
    <div className='Pages'>
          <ul>
            <li className='Prev'>
              <button className='PageButtons' onClick={handlePrev}>Prev</button>
            </li>
            <li >
               {Numbers.map((number,ind)=>(
                  <li className='Numbers' key={ind}>
                     <a onClick={()=>handlecpage(number)}>{number}</a>
                  </li>
               ))}
            </li>
            <li className='Next'>
              <button className='PageButtons' onClick={handleNext}>Next</button>
            </li>
          </ul>
    </div>
    </>
  )
}

export default BookList