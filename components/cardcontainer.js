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
    console.log(filterArray);

    React.useEffect(() => {

        // if category is present display only the products with same category
        if(!category){
            axios.get('http://localhost:3004/products')
                .then(res => {
                    setProducts(res.data)
                    setInitial(res.data)
                })
                .catch(e => console.log(e))
        } else {
            axios.get(`http://localhost:3004/products?categorie=${category}`)
                .then(res => {
                    setProducts(res.data)
                    setInitial(res.data)
                })
                .catch(e => console.log(e))
        }
    },[category]);

    // if all the filters are unticks and category is present again display the all products of same category
    React.useEffect(() => {
        if(filterArray.length === 0 && category) {
            axios.get(`http://localhost:3004/products?categorie=${category}`)
                .then(res => {
                    setProducts(res.data)
                    setInitial(res.data)
                })
                .catch(e => console.log(e))
        }
    },[filterArray])

    // filter logic are written here

    React.useEffect(() => {
      let F_array = [...filterArray]
      let newProdList = []
      let temp_prodList = []
      let temp_prodList_2 = []
      let i = 0;
      console.log(products)

      F_array.map(filterobj => {
        
        if(i === 0){
           temp_prodList = [...products]
        } else {
           temp_prodList = [...temp_prodList_2]
           temp_prodList_2 = []
        }

        temp_prodList.map(prodObj => {

            prodObj.attributes.map(attObj => {
                if(attObj.id === filterobj.id) {
                   if(filterobj.value.includes(attObj.value) && !newProdList.includes(prodObj)){
                      temp_prodList_2.push(prodObj)
                   }
                }
            }) 
            
        })
        
        console.log(temp_prodList_2);
        // setInitial(newProdList);
        ++i
        //temp_prodList = []
        // temp_prodList_2 = newProdList;
        // newProdList=[]
      })
      setInitial(temp_prodList_2);
    },[filterArray])
    

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
