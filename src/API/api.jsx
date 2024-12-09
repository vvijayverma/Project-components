import axios from "axios";

const axiosInstance = axios.create({
    baseURL:"https://jsonplaceholder.typicode.com/"
});

export const fetchPost =async(pageNumber)=>{
       const res = await axiosInstance.get(`posts?_start=${pageNumber}&_limit=5`)
       return res;
}

export const infinitScroll =async({pageParam=1})=>{
    const res = await axios.get(`https://api.github.com/users?per_page=20&page=${pageParam}`)
    return res.data;
}

export const fetchPostDetails =async(id)=>{
    const res = await axiosInstance.get(`posts/${id}`)
    return res;
}

export const deletePost =async(id)=>{
    const res = await axiosInstance.delete(`posts/${id}`)
    return res;
}

export const fetchProducts =async()=>{
    const res = await axiosInstance.get(`https://dummyjson.com/products?limit=100`)
    return res.data;
}