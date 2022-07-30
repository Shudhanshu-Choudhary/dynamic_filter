import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CardContainer from '../components/cardcontainer';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import $ from "jquery";
const drawerWidth = 240;


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
}); 

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false)
  const [attributes, setAttributes] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [category, setCategory] = React.useState('');
  const [filterArray, setFilterArray] = React.useState([]);
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  }
  
  const clickHandler = (att_id, att_value)  => {
    
    let temp_Farray = [...filterArray]

    if(filterArray.length === 0) {
      setFilterArray([{id: att_id, value: [att_value]}])
    }
    else {
        const index = temp_Farray.findIndex(obj => obj.id === att_id);

        if(index < 0) {
          temp_Farray.push({id: att_id, value: [att_value]})
        }
        else {
           if(!temp_Farray[index].value.includes(att_value)){
                
                      temp_Farray[index] = {id: att_id, value: [...temp_Farray[index].value, att_value]}
                    }
                    else {
                      
                      console.log(index);
                      const arr = temp_Farray[index].value.filter(V => V !== att_value)
                      if(arr.length === 0){
                        temp_Farray.splice(index, 1)
                      }else {
                        temp_Farray[index] = {id: att_id, value: arr}
                      }
                      
                    }
            }
            setFilterArray(temp_Farray)
            console.log(filterArray);

    }
    
    // 
    $("category-btn").on("click", function(){
      if(this.checked){
        $("#form-input").prop("checked", true)
      } else {
        $("#form-input").prop("checked", false)
      }
    })
  }
  
    


  const categorieHandler = async (e) => {

    const param = e.target.getAttribute("data");
    const cate = e.target.getAttribute('category');
    let Attributes = [];
    
    await axios.get('http://localhost:3004/attributes')
            .then(res => Attributes = res.data)
            .catch(er => console.log(er))

    const ids = param.split(",");
    const attr_filter = [...Attributes]

    const final = attr_filter.filter(attribute => attribute.id == ids[0] || attribute.id == ids[1] );
    
    handleDrawerOpen();
    setAttributes(final);
    setCategory(cate)
    setFilterArray([])
    setChecked(false)
  }


  React.useEffect(() => {
      axios.get('http://localhost:3004/categories')
      .then(res => setCategories(res.data))
      .catch(e => console.log(e))
  },[])

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <div variant="h6" component="div" className='d-flex'>
              {
                categories.length > 0 && (
                  categories.map(categorie => {
                    return (
                      <div className='category-btn-container m-2' key={categorie.id}>
                          <Button data = {categorie.att_id} id="category-btn" category = {categorie.name} onClick={categorieHandler}>{categorie.name}</Button> 
                      </div>
                    )
                  })
                )
              }
          </div>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <div className='text-left'>
          <Typography variant='h6' className='m-2'>
              Filters
          </Typography>
        </div>
        <Divider />
        <div className="list-conntainer" style={{paddingLeft: '25px'}}>
            <List>
                {
                    attributes.length > 0 && attributes.map((attribute, index) => {
                        return (
                            <div className='mb-5' key={index}>
                                <h4>{attribute.att_id}</h4>
                                {
                                    attribute.att_value.map((v, index) => {
                                       return (
                                        <div className='mb-1' key={index}>
                                            <div className="form-check">
                                                <input className="form-check-input" id="form-input" onChange={() => clickHandler(attribute.att_id, v)} type="checkbox"/>
                                                <label className="form-check-label">{v}</label>
                                            </div>
                                        </div> 
                                       )}
                                    )
                                }
                            </div>
                        )
                    })
                }
            </List>
        </div>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <CardContainer filterArray={filterArray} category={category}/>
      </Box>
    </Box>
  );
}
