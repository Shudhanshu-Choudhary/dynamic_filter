import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import axios from 'axios';
import "../styles/Home.module.css"
import styles from './card.module.css'

export default function CardContainer({filterArray, category}) {
    const [initial, setInitial] = React.useState([])
    const [products, setProducts] = React.useState([]);
    const arr = filterArray;

    React.useEffect(() => {
        if(!category){
            axios.get('http://localhost:3004/products')
                .then(res => {
                    setProducts(res.data)
                    setInitial(res.data)
                })
                .catch(e => console.log(e))
        } else {
            axios.get(`http://localhost:3004/products?categorie=${category}`)
                .then(res => setProducts(res.data))
                .catch(e => console.log(e))
        }
    },[category]);

    React.useEffect(() => {
        let Size = filterArray.Size;
        let Color = filterArray.Color;
        let Brand = filterArray.Brand;
        let Seller = filterArray.Seller;
        let Language = filterArray.Language;
        let Author = filterArray.Author;

        let filteredArray = [...products];
        if(Size.length > 0) {

        }
    })

    

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
                                {product.name}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                                {product.categorie}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="div">
                                {product.attributes.map(attri => { 
                                    return(
                                        <div key={attri.id}>{`${attri.id}: ${attri.value} `}</div>
                                    )
                                    })
                                }
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
