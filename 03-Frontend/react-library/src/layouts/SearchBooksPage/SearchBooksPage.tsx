import React, { useEffect, useState } from "react";
import { BookModel } from "../../models/BookModel";
import { SpinnerLoading } from "../utils/SpinnerLoading";
import { SearchBook } from "./components/SearchBook";
import { Paginaton } from "../utils/Pagination";

export const SearchBooksPage = () => {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [booksPerPage] = useState(5);
  const [totalNoOfBooks, setTotalNoOfBooks] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [search, setSearch] = useState('');
  const [searchUrl, setSearchUrl] = useState('');

  const [categorySelection, setCategorySelection] = useState('Book Category');

  useEffect(() => {
    const fetchBooks = async () => {
      const baseUrl = "http://localhost:8080/api/books";

      let url: string = '';
      if(searchUrl === ''){
        url = `${baseUrl}?page=${currentPage-1}&size=${booksPerPage}`;
      }
      else{
        url = baseUrl + searchUrl;
      }


      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("something went wrong!");
      }
      const responseJson = await response.json();
      const responseData = responseJson._embedded.books;
      const loadedBooks: BookModel[] = [];

      setTotalNoOfBooks(responseJson.page.totalElements);
      setTotalPages(responseJson.page.totalPages)

      for (let key in responseData) {
        loadedBooks.push({
          id: responseData[key].id,
          title: responseData[key].title,
          author: responseData[key].author,
          description: responseData[key].description,
          copies: responseData[key].copies,
          copiesAvailable: responseData[key].copiesAvailable,
          category: responseData[key].category,
          img: responseData[key].img,
        });
      }

      setBooks(loadedBooks);
      setIsLoading(false);
    };
    fetchBooks().catch((error: any) => {
      setIsLoading(false);
      setHttpError(error.message);
    });
    window.scrollTo(0, 0);
  }, [currentPage, searchUrl]);

  if (isLoading) {
    return (
      <div className="container m-5">
        <SpinnerLoading />
      </div>
    );
  }

  if (httpError) {
    return (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  }

  const searchHandleChange = () => {
    if(search === ''){
        setSearchUrl('');
    } else {
        setSearchUrl(`/search/findByTitleContaining?title=${search}&page=0&size=${booksPerPage}`);
    }
  }

  const categoryField = (value: string) => {
    if(
      value.toLowerCase() === 'fe' ||
      value.toLowerCase() === 'be' ||
      value.toLowerCase() === 'data' ||
      value.toLowerCase() === 'devops'
    ){
      setCategorySelection(value);
      setSearchUrl(`/search/findByCategory?category=${value}&page=0&size=${booksPerPage}`)
    }else{
      setCategorySelection("All");
      setSearchUrl(`?page=0&size=${booksPerPage}`);
    }
  }

  const indexOfLastBook: number = booksPerPage * currentPage;
  const indexOfFirstBook: number = indexOfLastBook - booksPerPage;
  let lastItem = (indexOfLastBook <= totalNoOfBooks)? indexOfLastBook : totalNoOfBooks;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="container">
        <div>
          <div className="row mt-5">
            <div className="col-6">
              <div className="d-flex">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-labelledby="Search"
                  onChange={e => setSearch(e.target.value)}
                />
                <button className="btn btn-outline-success" onClick={() => searchHandleChange()}>Search</button>
              </div>
            </div>
            <div className="col-4">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle"
                  id="dropdownMenu1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                {categorySelection}
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                  <li onClick={() => categoryField('All')}>
                    <a href="#" className="dropdown-item">
                      All
                    </a>
                  </li>
                  <li onClick={() => categoryField('FE')}>
                    <a href="#" className="dropdown-item">
                      Frontend
                    </a>
                  </li>
                  <li onClick={() => categoryField('BE')}>
                    <a href="#" className="dropdown-item">
                      Backend
                    </a>
                  </li>
                  <li onClick={() => categoryField('DATA')}>
                    <a href="#" className="dropdown-item">
                      Data
                    </a>
                  </li>
                  <li onClick={() => categoryField('DevOps')}>
                    <a href="#" className="dropdown-item">
                      DevOps
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {totalNoOfBooks > 0 ? 
          <>
          <div className="mt-3">
            <h5>Number of results: ({totalNoOfBooks})</h5>
          </div>
          <p>{indexOfFirstBook + 1} to {lastItem} of {totalNoOfBooks} items:</p>
          {books.map((book) => (
            <SearchBook book={book} key={book.id} />
          ))}
          </>
          :
          <div className="m-5">
            <h3>Can't find what you are looking for?</h3>
            <a href="#" className="btn main-color px-4 me-md-2 btn-md fw-bold text-white" type="button">
              Library Services
            </a>
          </div>
          }
          {
            totalPages > 1 &&
            <Paginaton currentPage={currentPage} totalPages={totalPages} paginate={paginate}/>
          }
        </div>
      </div>
    </div>
  );
};
