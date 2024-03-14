import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { addBook, searchBooks } from "../../../services/books";
import Loader from "../../UI/Loader";
import { useDebounce } from "../../../hooks/useDebounce";
import { Button } from "@mui/material";
import { Clear } from "@mui/icons-material";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function HomePage() {
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [books, setBooks] = useState();

  const userData = useSelector((state) => state.user.data);

  const key = userData.data.key;
  const secret = userData.data.secret;
  const debouncedQuery = useDebounce(searchValue, 300);

  useEffect(() => {
    if (debouncedQuery) {
      setLoading(true);
      searchBooks(debouncedQuery, key, secret)
        .then((res) => {
          setBooks(res.data.data);
        })
        .catch((err) => {
          console.log("search err ", err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [debouncedQuery]);

  const hanldeAddBook = (isbn) => {
    addBook(isbn, key, secret)
      .then((res) => {
        console.log("res", res.data);
        toast.success("Successfully added")
      })
      .catch((res) => {
        toast.error("Bu kitob javonda bor")
      });
  };

  return (
    <div className="w-fit m-auto mt-[50px]">
      <div className="w-fit relative m-auto">
        <input
          type="text"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          placeholder="Kitobni qidirish"
          className="border-[2px] border-gray-400 w-[500px] p-4 rounded-[6px] mt-[5px] h-[40px] focus:outline-none focus:border-blue-600 focus:border-[2px]"
        />

        {searchValue && (
          <button 
          onClick={() => setSearchValue("")} 
          className="absolute right-[-2px] top-[4px] text-gray-600">
            <Clear />
          </button>
        )}
      </div>

      {searchValue ? (
        <div className="w-[1300px] m-auto mt-[100px]">
          {loading ? (
            <Loader />
          ) : (
            <div className="w-fit m-auto flex flex-wrap gap-y-[50px] gap-[30px]">
              {books?.map((book, i) => (
                <div
                  className="w-[300px] bg-green-300 flex  flex-col justify-between rounded-[8px] shadow-lg h-[420px] p-4"
                  key={i}
                >
                  <div>
                    <div className="w-[150px] m-auto h-[180px] bg-[url('/images/library_img.avif')] bg-cover flex items-center justify-center border">
                      <img
                        src={book.cover}
                        className="w-[150px] h-[180px]"
                        alt={book.title}
                      />
                    </div>
                    <p className="text-gray-700 mt-6 font-semibold">
                      {book.author}
                    </p>
                    <p className="text-black font-semibold">{book.title}</p>
                  </div>

                  <div>
                    <div className="w-full flex items-center justify-between">
                      <p className="text-gray-600 font-medium">
                        ISBN: {book.isbn}
                      </p>
                      <p className="text-[18px] text-black font-semibold">
                        {book.published}
                      </p>
                    </div>
                    <Button
                      onClick={() => hanldeAddBook(book.isbn)}
                      variant="contained"
                      sx={{
                        width: "100%",
                        fontSize: "24px",
                        height: "35px",
                        marginTop: "10px",
                      }}
                    >
                      +
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="w-fit m-auto mt-[200px]">
          <p className="font-semibold text-[24px]">Javoningizga kitob qo'shish uchun kerakli kitob nomini qidiring.</p>
        </div>
      )}
      <ToastContainer position="top-center" />
    </div>
  );
}
