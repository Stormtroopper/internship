// import React,{useDebugValue, useState} from 'react'
import { LightModeOutlined,DarkModeOutlined,Menu as MenuIcon,Search,SettingsOutlined,ArrowDropDownOutlined } from '@mui/icons-material';
import FlexBetween from "components/FlexBetween";
import { useDispatch } from 'react-redux';
import { setMode } from 'state';
import { AppBar,Box,Typography,Button,Toolbar,InputBase,Menu,MenuItem,useTheme,IconButton } from '@mui/material';
import { useState } from 'react';
import profileImage from "assets/profile.jfif";

const NavBar = ({user,isSideBarOpen,setisSideBarOpen}) => {
  const dispatch=useDispatch();
  const[anchorEl,setAnchorEl]=useState(null);
  const isOpen=Boolean(anchorEl);
  const HandleClick=(event)=> setAnchorEl(event.currentTarget);
  const HandleClose=()=>setAnchorEl(null);
  const theme=useTheme();
  return<AppBar
  sx={{
      position:"static",
      background:"none",
      boxShadow:"none"
  }}
  > 
  <Toolbar sx={{justifyContent:"space-between"}}>
          {
              <FlexBetween>
                <IconButton onClick={()=>console.log('sidebar')}>
                  <MenuIcon />
                </IconButton>
             
                <FlexBetween
                    backgroundColor={theme.palette.background.alt}
                    borderRadius="7px"
                    gap="3rem"
                    padding="0.1rem 1.5 rem"
                >
                    <InputBase placeholder="Searching..." />
                    <IconButton>
                        <Search />
                    </IconButton>
                    </FlexBetween>
            </FlexBetween>
            }
        <FlexBetween gap="1.5 rem">
            <IconButton onClick={()=>dispatch(setMode())}>
            {theme.palette.mode==='dark'?(
            <DarkModeOutlined sx={{fontSize:"25px"}} />
                ):(
                    <LightModeOutlined sx={{fontSize:"25px"}} />
                )}
            </IconButton>
            <IconButton>
            <SettingsOutlined sx={{fontSize:"25px"}} />  
            </IconButton>
            <FlexBetween>
                <Button onClick={HandleClick} sx={{display:"flex",justifyContent:"space-between",alignItems:"center",textTransform:"none",gap:"1rem"}}>
                <Box
                        component="img"
                        alt="profile"
                        src={profileImage}
                        height="32px"
                        weight="32px"
                        borderRadius="50%"
                        sx={{objectFit:"cover"}}
                        />
                        <Box textAlign="left">
                                <Typography fontWeight="bold" fontSize="0.85rem"sx={{color:theme.palette.secondary[100]}}>
                                    {user.name}    
                                </Typography> 
                                
                                <Typography  fontSize="0.85rem"sx={{color:theme.palette.secondary[100]}}>
                                    {user.occupation}    
                                </Typography>   
                                </Box>
                                <ArrowDropDownOutlined 
                                    sx={{color:theme.palette.secondary[300],fontSize:"20px"}}
                                /> 
                </Button>
                <Menu anchorEl={anchorEl} open={isOpen} onClose={HandleClose} anchorOrigin={{vertical:"bottom",horizontal:"center"}}>
                    <MenuItem onClick={HandleClose}>
                        Logging Out.....
                    </MenuItem>
                </Menu>
            </FlexBetween>
        </FlexBetween>
        </Toolbar>
        </AppBar>
};

export default NavBar