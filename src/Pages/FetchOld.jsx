import React, { useEffect, useState } from "react";
import { fetchPost, deletePost } from "../API/api";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import ReactPaginate from "react-paginate";

const FetchOld = () => {
  const queryClient = useQueryClient();
  const [pageNumber, setPageNumber] = useState(0);
  const itemPerPage = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["posts", pageNumber],
    queryFn: () => fetchPost(pageNumber),
    placeholderData: keepPreviousData,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (data, id) => {
      queryClient.setQueryData(["posts", pageNumber], (item) => {
        return item?.data?.filter((post) => post?.id !== id);
      });
    },
  });

  if (isLoading) {
    return <p>....Loading</p>;
  }
  const totalItem = 100;
  const totalPages = Math.ceil(totalItem / itemPerPage);

  const handlePageClick = (event) => {
    setPageNumber(event.selected * itemPerPage);
  };

  return (
    <div className="flex flex-col gap-12">
      {data?.data?.map((item) => (
        <li key={item.id} className="list-none">
          <NavLink to={`/trad/${item.id}`}>
            <p>{item.id}</p>
            <p>{item.title}</p>
            <p>{item.body}</p>
          </NavLink>
          {/* <button
            onClick={() => deleteMutation.mutate(item.id)}
            className="bg-red-500 px-4 py-2 rounded"
          >
            Delete
          </button> */}
        </li>
      ))}

      <div className="flex">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={totalPages}
          previousLabel="previous"
          renderOnZeroPageCount={null}
          // containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"previous-item"}
          nextClassName={"next-item"}
          activeClassName={"active"}
          className="flex justify-center items-center"
        />
      </div>
    </div>
  );
};

export default FetchOld;
