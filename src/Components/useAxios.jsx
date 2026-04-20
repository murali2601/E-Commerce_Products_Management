import {useState,useEffect} from 'react';
import axios from 'axios';


export function useAxios(url) {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState([]);

    useEffect(() => {
        axios.get(url)
        .then(res => setProducts(res.data))
        .catch(err => setError(err))
    }, [url])
 
    return {products, error}
    
}