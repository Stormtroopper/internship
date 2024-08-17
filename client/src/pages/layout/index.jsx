import React from 'react';
import { useState } from 'react';
import {Box,useMediaQuery} from '@mui/material';
import {Outlet} from "react-router-dom";
import { useSelector } from 'react-redux';
 // eslint-disable-next-line
import {userGetUserQuery} from"state/api";

import NavBar from "components/NavBar";
import SideBar from "components/SideBar";
const Layout=()=> {
  const isNonMobile=useMediaQuery("(min-width:600px)");
  const [isSideBarOpen,setIsBarOpen]=useState(true);
  const userId=useSelector((state)=>state.global.userId);
  const {data}=userGetUserQuery(userId);
  console.log('new data',data);
return (<Box display={isNonMobile ?"flex":"block"}width="100%" height="100%" sx={{display:"flex"}}>
        <SideBar
        user={data ||{}}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSideBarOpen={isSideBarOpen}
        setIsBarOpen={setIsBarOpen}
        />
      <Box flexGrow={1}>
        <NavBar 
          user={data ||{}}
          isSideBarOpen={isSideBarOpen}
          setisSideBarOpen={setIsBarOpen}
        />
        <Outlet />
      </Box>
  </Box>
  );
  };
  
export default Layout;