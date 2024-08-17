
import React from 'react'
import profileImage from "assets/profile.jfif";
import {
    Box,Divider,Drawer,IconButton,List,ListItem,ListItemButton,ListItemIcon,ListItemText,Typography,useTheme
}from "@mui/material";
import 
 // eslint-disable-next-line
 {

     // eslint-disable-next-line
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    ShoppingCartOutlined,
    
     // eslint-disable-next-line
    ReceiptLongOutlined,
    PublicOutlined,
    PointOfSaleOutlined,
    TodayOutlined,
    CalendarMonthOutlined,
    AdminPanelSettingsOutlined,
    TrendingUpOutlined,
    PieChartOutlined,
    SettingsOutlined
}from "@mui/icons-material";
import { useEffect,useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
const navItems=[
    {
        text:"Dashboard",
        icon:<HomeOutlined />
    },
    {
        text:"Client Facing",
        icon:null,
    },
    {
        text:"Products",
        icon:<ShoppingCartOutlined />
    },
    {
        text:"Transactions",
        icon:<ReceiptLongOutlined />
    },
    {
        text:"Sales",
        icon:null
    },
    {
        text:"Geography",
        icon:<PublicOutlined />
    },
    {
        text:"Overview",
        icon:<PointOfSaleOutlined />
    },
    
    {
        text:"Daily",
        icon:<TodayOutlined />
    },
    {
        text:"Monthly",
        icon:<CalendarMonthOutlined />
    },
    {
        text:"Breakdown",
        icon:<PieChartOutlined/>
    },
    {
        text:"Management",
        icon:null
    },
    {
        text:"Admin",
        icon:<AdminPanelSettingsOutlined/>
    },
    {
        text:"Performance",
        icon:<TrendingUpOutlined/>
    }
        
]
const SideBar =({
    user,
  drawerWidth,
  isSideBarOpen,
  setisBarOpen,
  isNonMobile,
})=>{
const {pathname}=useLocation();
const[active,setActive]=useState("");
const navigate=useNavigate();
const theme=useTheme();
useEffect(()=>{
    setActive(pathname.substring(1));
},[pathname])
    return <Box component="nav">
        {isSideBarOpen &&(
            <Drawer 
                open={isSideBarOpen}
                onClose={()=>setisBarOpen(false)}
                variant="persistent"
                anchor="left"
                sx={{
                    width:drawerWidth,
                    "& .MuiDrawer-paper":{
                        color:theme.palette.background.secondary[200],
                        boxSizing:"border-box",
                        borderWidth:isNonMobile?0:"2px",
                        width:drawerWidth
                    }
                }}
            >
                <Box width="100%">
                    <Box m="1.5rem 2rem 2rem 3rem">
                        <FlexBetween color={theme.palette.secondary.main}>
                            <Box display="flex" alignItems="center"gap="0.5rem">
                                <Typography variant="h4" fontWeight="bold">
                                    Sustainext Dashboard
                                </Typography>
                            </Box>
                            {!isNonMobile && (
                                <IconButton onClick={()=>{
                                    setisBarOpen(!isSideBarOpen)}
                                }>
                                    <ChevronLeft />
                                </IconButton>
                            )}
                        </FlexBetween>
                    </Box>
                    <List>
                      {navItems.map(({text,icon})=>
                        {
                          if(!icon){
                              return(
                                  <Typography key={text}sx={{m:"2.25rem 0 1rem 3rem"}}>
                                      {text}
                                  </Typography>
                              )
                            }
                            const lowercasetext=text.toLowerCase();
                            return(
                                <ListItem key={text}disablePadding>
                                    <ListItemButton onClick={()=>{navigate(`/${lowercasetext}`);
                                    setActive(lowercasetext);    
                                    }}
                                    sx={{
                                        backgroundColor:active===lowercasetext?theme.palette.secondary[300]:"transparent",
                                        color:active===lowercasetext?theme.palette.primary[600]:theme.palette.secondary[100],
                                    }}>
                                    <ListItemIcon sx={{ml:"2rem",
                                    color:active===lowercasetext?theme.palette.primary[600]:theme.palette.secondary[200],
                                }}>

                                    </ListItemIcon>
                                    <ListItemText primary={text}/>
                                    {active===lowercasetext&&(
                                        <ChevronRightOutlined sx={{ml:"auto"}}/>
                                    )}
                                    </ListItemButton>
                                </ListItem>
                            );
                        })}
                    </List>
                </Box>
                    <Box position="absolute" bottom="2rem">
                        <Divider />
                        <FlexBetween textTransform="none"gap="1rem"m="1.5rem 2rem 0 3 rem">
                        <Box
                        component="img"
                        alt="profile"
                        src={profileImage}
                        height="35px"
                        weight="35px"
                        borderRadius="50%"
                        sx={{objectFit:"cover"}}
                        />
                            <Box textAlign="left">
                                <Typography fontWeight="bold" fontSize="0.9rem"sx={{color:theme.palette.secondary[100]}}>
                                    {user.name}    
                                </Typography> 
                                
                                <Typography  fontSize="0.9rem"sx={{color:theme.palette.secondary[100]}}>
                                    {user.occupation}    
                                </Typography>    
                            </Box>
                            <SettingsOutlined  sx={{color:theme.palette.secondary[300],fontSize:"25px"}}/>
                        </FlexBetween>
                </Box>
            </Drawer>
        )}
    </Box>
}

export default SideBar;