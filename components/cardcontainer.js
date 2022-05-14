import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import axios from 'axios';
import "../styles/Home.module.css"
import styles from './card.module.css'

export default function CardContainer({filterArray}) {
    const [products, setProducts] = React.useState([]);
    const arr = filterArray;
    console.log(arr === true);
    
    React.useEffect(() => {
        axios.get('http://localhost:3004/products?_limit=9')
        .then(res => setProducts(res.data))
        .catch(e => console.log(e))
    },[]);

    React.useEffect(() => {
        if(arr.Size.length > 0 && arr.Color.length === 0){
          axios.get(`http://localhost:3004/products?size=${arr.Size}&_limit=9`)
            .then(res => setProducts(res.data))
            .catch(e => console.log(e))
        } else if(arr.Color.length > 0 && arr.Size.length === 0) {
            axios.get(`http://localhost:3004/products?color=${arr.Color}&_limit=9`)
            .then(res => setProducts(res.data))
            .catch(e => console.log(e))
        } else if(arr.Color.length > 0 && arr.Size.length > 0) {
            axios.get(`http://localhost:3004/products?size=${arr.Size}&color=${arr.Color}&_limit=9`)
            .then(res => setProducts(res.data))
            .catch(e => console.log(e))
        }

    },[arr])

  if(products.length === 0){
    return <div>Loading...</div>
  }

  return (
    <div className={styles.d}>
      { products.map(product => {
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
