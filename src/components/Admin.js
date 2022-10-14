import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core';
import picture from '../images/logo.png';
import { db } from '../config/firebase';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { async } from '@firebase/util';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
    
    title: {
        fontSize:40,
        color : '#000000'
    
      },
      pic:{
        width:90,
        height:90,
        marginTop:-80,
    
      },
      displayCard:{
        marginLeft:20,
        marginTop:20,
        borderBottomRightRadius: 30,
        borderTopLeftRadius:30,
        width:'100%', 
        elevation: 60,
        
      },
      dashboard:{
        position: 'fixed',
        bottom: '0%'

      },
      navigation:{
        alignItems:'center',
        color: '#000000',
    },

    but:{
        backgroundColor:'#c62828',
        color: 'white',
        "&:hover": {
            backgroundColor: '#1de9b6',
          },
         },
         outlined: {
           color: "#1de9b6",
           "&:hover": {
             backgroundColor: '#00bfa5',
           },
         },

}));




const Admin = () => {
    const classes = useStyles();
    const [menu,setMenu] = useState([]);

    const menuRef = collection(db,"food Menu")

    //fetch food Menu from firebase

    const getMenu = async () => {
        const data = await getDocs(menuRef)

        console.log(data.docs.map((results)=>(results.data())))
        setMenu(data.docs.map((results)=>({...results.data(),id:results.id})));
    }
    useEffect(()=>{
        getMenu()
    },)

    //delete function

    function deleteMenu(id){
        console.log('delete is executed',{id});

        const getDoc = doc (db,"food Menu",id)
        deleteDoc(getDoc).then(()=>{
            alert("Successfully Deleted!")
        }).catch(error => {
            console.log(error);
        })
    }

    return(
        <div style={{width:'100%'}}>
            <div className={classes.root}>
                <AppBar position="fixed" style={{ height: 100, backgroundColor: 'white', width: '100%', justifyContent: "center" }}>
                    <Toolbar>
                        <Typography variant="h4" className={classes.title}>
                            Welcome to your dashboard 
                        </Typography>
                    </Toolbar>
                    <img src={picture} className={classes.pic} style={{alignSelf:'end'}}/>
                </AppBar>
            </div>
            
            <div className={classes.content} style={{width:"100%", marginTop:'10%'}}>
                <div><h1 style={{textAlign:'center', color:"#E85800"}}>Food Menu</h1></div>
                {
                    menu.length == 0 ? (
                        <h2 style={{ textAlign: 'center', color:'#E85800', marginTop: '280px' }}>Loading Please Wait...
                        <div><CircularProgress style={{color:'#E85800',flexGrow:1}}/></div></h2>
                        
                    ) : (
                        menu.map((res)=> (
                            <>
                            <Card className={classes.displayCard} style={{width:"72%",height:150}}>
                                <div>
                                    <h1 style={{color:"#E85800",marginTop:"-4px",textAlign:"left" ,marginLeft:'10px'}}>{res.foodName}</h1>
                                    <p style={{marginTop:"-20px",textAlign:"left",marginLeft:'10px', fontSize:20}}>Size:{res.size}</p>
                                    <p style={{marginTop:"-20px",textAlign:"left",marginLeft:'10px', fontSize:20}}>Description:{res.description}</p>
                                    <h2 style={{marginTop:"-10px",textAlign:"left",marginLeft:'10px', fontSize:20}}>R{res.price}</h2>
                                    <Button className={classes.but} color="inherit" style={{marginTop:"-80px",marginLeft:'30%',width:'8%'}}>Update</Button>
                                    <Button  className={classes.but} color="inherit" style={{marginTop:"-80px",marginLeft:'2%',width:'8%'}} onClick={(e) => { deleteMenu(res.id) }}>Delete</Button>
                                    <img style={{height:'200px',width:'350px',marginTop:'-100%',marginLeft:'83%',}} src={res.image}/>
                                    
                                </div>
                            </Card>
                            </>
                        ))
                    )
                }
            </div>
            <div className={classes.dashboard} style={{width:'23%',height:'700px',marginLeft:"76.5%"}}>
                <h1 style={{color:'#000000'}}>My Dashboard</h1>
                <div className={classes.navigation}>
                <Link to='/Admin' style={{textDecoration:'none',color:'white'}}><Button className={classes.but} color="inherit" style={{width:'40%'}}>Admin</Button></Link><br></br><br></br>
                <Link to='/'  style={{textDecoration:'none',color:'white'}}><Button className={classes.but} color="inherit" style={{width:'40%'}}>Add Food</Button></Link><br></br><br></br>
                <Link to='/edit' style={{textDecoration:'none',color:'#000000'}}><Button color="inherit">Edit Menu</Button></Link><br></br><br></br>
                
                </div>
                <div>
                    <h1 style={{ color: 'white' }}>Order Tracking</h1>
                    
                    <Button className={classes.but}  color="inherit" style={{width:'40%',marginTop:'30px'}}>Total Orders</Button><br></br>
                    <Button className={classes.but}  color="inherit" style={{width:'40%',marginTop:'30px'}}>Pending</Button><br></br>
                    <Button className={classes.but}  color="inherit" style={{width:'40%',marginTop:'30px'}}>Ready</Button>

                </div>
            </div>
            
        </div>
    )
}

export default Admin