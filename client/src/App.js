import {CssBaseline,ThemeProvider} from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { themeSettings } from "theme";
import {useMemo} from 'react';
import Layout from "pages/layout";
import { BrowserRouter,Navigate,Route,Routes } from "react-router-dom";
import Server from "pages/server";
import Products from "pages/products";
import Customers from "pages/customers";
import Transactions from "pages/transactions";
import Geography from "pages/geography";
import Overview from "pages/overview";
import Daily from "pages/daily";
import Monthly from "pages/monthly";
import Breakdown from "pages/breakdown";
import Admin from "pages/admin";
import Performance from "pages/performance";

function App() {
  const mode=useSelector((state)=>state.global.mode);
  const theme=useMemo(()=>createTheme(themeSettings(mode)),[mode]);
  return (
    <div className="App">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route element={<Layout />}>
              <Route path="/" element={<Navigate to="/server" replace />} />
              <Route path="/server" element={<Server />} />
              <Route path="/products" element={<Products />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/performance" element={<Performance />} />
          </Route>
        </Routes>
      </ThemeProvider>
      </BrowserRouter>

    </div>
  );
}

export default App;