import React from 'react';
import { fetchPostDetails } from '../API/api';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const PostDetails = () => {
     const {id} = useParams();
     
    const {data,isLoading,isError}=useQuery({
        queryKey:['post',id],
        queryFn:()=>fetchPostDetails(id),
    })
    if (isLoading) {
        return <div className='text-3xl font-bold text-center'>...Loading</div>
    }
    
  return (
    <div className="bg-gray-300">
    <p>{data?.data.id}</p>
    <p>{data?.data.title}</p>
    <p>{data?.data.body}</p>
  </div>
  )
}

export default PostDetails