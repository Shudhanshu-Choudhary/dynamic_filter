import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import axios from 'axios';
import "../styles/Home.module.css"
import styles from './card.module.css'

export default function CardContainer({filterArray}) {
    const [initial, setInitial] = React.useState([])
    const [products, setProducts] = React.useState([]);
    //console.log(filterArray);
    const arr = filterArray;
    
    React.useEffect(() => {
        axios.get('http://localhost:3004/products')
        .then(res => {
            setProducts(res.data)
            setInitial(res.data)
        })
        .catch(e => console.log(e))
    },[]);

    // React.useEffect(() => {
    //     if(arr.Size.length > 0 && arr.Color.length === 0){
    //       axios.get(`http://localhost:3004/products?size=${arr.Size}&_limit=9`)
    //         .then(res => setProducts(res.data))
    //         .catch(e => console.log(e))
    //     } else if(arr.Color.length > 0 && arr.Size.length === 0) {
    //         axios.get(`http://localhost:3004/products?color=${arr.Color}&_limit=9`)
    //         .then(res => setProducts(res.data))
    //         .catch(e => console.log(e))
    //     } else if(arr.Color.length > 0 && arr.Size.length > 0) {
    //         axios.get(`http://localhost:3004/products?size=${arr.Size}&color=${arr.Color}&_limit=9`)
    //         .then(res => setProducts(res.data))
    //         .catch(e => console.log(e))
    //     }else {
    //         axios.get('http://localhost:3004/products?_limit=9')
    //         .then(res => setProducts(res.data))
    //         .catch(e => console.log(e))
    //     }

    // },[arr])

    React.useEffect(() => {

        let size = filterArray.Size;
        let color = filterArray.Color;

        // if(color.length === 0 && size.length > 0){
        //     const sizesFilterArray = size.map(s => {
        //         let P = products.slice(0);
        //         let nw = P.filter( prod => prod.size === s);   
        //         return nw;
        //     })
        //     setInitial(sizesFilterArray.flat(1));
        // }

        // else if(color.length > 0 && size.length === 0) {
        //     const colorsFilterArray = color.map(c => {
        //         let P = products.slice(0);
        //         let nw = P.filter(prod => prod.color === c)
        //         let wn = [...nw]
        //         return wn
        //     })
        //     setInitial(colorsFilterArray.flat(1));
        // }
        // else if(size.length > 0 && color.length > 0) {
        //     const sizesFilterArray = size.map(s => {
        //         let P = products.slice(0);
        //         let nw = P.filter( prod => prod.size === s);   
        //         return nw;
        //     })
        //     const ar = sizesFilterArray.flat(1);
        //     const colorsFilterArray = color.map(c => {
        //         let P = ar.slice(0);
        //         let nw = P.filter(prod => prod.color === c)
        //         let wn = [...nw]
        //         return wn
        //     })
        //     const ra = colorsFilterArray.flat(1);
        //     setInitial(ra)
        // } 
        // else {
        //     setInitial(products)
        // }

        let filteredArray = [... products];
        if(size.length > 0){
            filteredArray = size.map(s => {
                let P = products.slice(0);
                let nw = P.filter( prod => prod.size === s);   
                return nw;
            })
        }
        if(color.length > 0){
            const ar = filteredArray.flat(1);
            filteredArray = color.map(c => {
                let P = ar.slice(0);
                let nw = P.filter(prod => prod.color === c)
                let wn = [...nw]
                return wn
            })
        }
        const ra = filteredArray.flat(1);
        setInitial(ra)

    }, [arr])

    

  if(products.length === 0){
    return <div>Loading...</div>
  }

  return (
    <div className={styles.d}>
      { initial.map(product => {
          return (
                <Card sx={{ maxWidth: 345 }} key={product.id}> 
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {product.products_name}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                                {product.size}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                                {product.color}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
          )
      }) 
    }
    </div>  
  );
}
