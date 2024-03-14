import React from "react";
import { useState, useEffect } from "react";
import { changeStatus, deleteBook, getBooks } from "../../../services/books";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { Delete } from "@mui/icons-material";

export default function MyLibrary() {
  const [myBooks, setMyBooks] = useState();
  const userData = useSelector((state) => state.user.data);
  const key = userData.data.key;
  const secret = userData.data.secret;

  const getAllMyBooks = () => {
    getBooks(key, secret).then((res) => {
      setMyBooks(res.data.data);
    });
  };

  useEffect(() => {
    getAllMyBooks();
  }, []);

  const handleChangeStatus = (status, id) => {
    changeStatus(id, +status, key, secret).then((res) => {
      getAllMyBooks()
    });
    
  };

  const handleDelete = (id) => {
    deleteBook(id, key, secret).then((res) => {
     getAllMyBooks()
    });
  };

  return (
    <div className="w-[1300px] m-auto mt-[100px] mb-[50px]">
      <div className="w-fit m-auto flex flex-wrap gap-y-[50px] gap-[30px]">
        {myBooks?.map(({ book, status }) => (
          <div
            className="w-[300px] bg-green-300 flex  flex-col justify-between rounded-[8px] shadow-lg h-[380px] p-4"
            key={book.id}
          >
            <div>
              <div className="w-[150px] m-auto h-[180px] bg-[url('/images/library_img.avif')] bg-cover flex items-center justify-center border">
                <img
                  src={book.cover}
                  className="w-[150px] h-[180px]"
                  alt={book.title}
                />
              </div>
              <p className="text-gray-700 mt-6 font-semibold">{book.author}</p>
              <p className="text-black font-semibold">{book.title}</p>
            </div>

            <div className=" flex justify-between  items-center">
              <select
                value={status}
                onChange={(e) => handleChangeStatus(e.target.value, book.id)}
                className="block font-semibold w-[180px] text-[18px] h-[40px] pl-3 pr-10 py-2 text-base bg-transparent border-[2px] border-gray-500 rounded-md"
              >
                <option className="font-semibold" value="0">
                  Yangi{" "}
                </option>
                <option className="font-semibold" value="1">
                  O'qilayotgan
                </option>
                <option className="font-semibold" value="2">
                  Tugatilgan
                </option>
              </select>
              <Button
                onClick={() => handleDelete(book.id)}
                variant="contained"
                sx={{
                  width: "40px",
                  fontSize: "30px",
                  height: "40px",
                }}
              >
                <Delete />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
