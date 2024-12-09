import React, { useEffect } from 'react';
import { infinitScroll } from '../API/api';
import { useInfiniteQuery } from '@tanstack/react-query';

const FetchRq = () => {

 const {data , hasNextPage,fetchNextPage}=useInfiniteQuery({
    queryKey:['scroll'],
    queryFn:infinitScroll,
    getNextPageParam:(lastPage,allPages)=>{
        return lastPage.length === 20 ? allPages.length +1 :undefined;
    }
  });
  const handleScroll =()=>{
    const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight -1 ;
    if (bottom && hasNextPage) {
      fetchNextPage();
    }
  }
   useEffect(()=>{
     window.addEventListener("scroll",handleScroll);
     return ()=>window.removeEventListener("scroll",handleScroll);
   },[hasNextPage])

  return (
    <div>
      <h1 className='text-3xl font-bold text-center'>Infinite Scroll</h1>
      {data?.pages?.map((page,index)=>{
       return(
        <ul key={index}>
           {page?.map((user,index)=>{
            return(
              <li key={user.id}>
                  <p>{user.login}</p>
                  <img src={user.avatar_url} height={500} width={500}/>
              </li>
            )
           })}
        </ul>
       ) 
         })}
    </div>
  )
}

export default FetchRq