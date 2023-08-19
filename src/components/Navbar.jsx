import { useState,useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link,useNavigate } from "react-router-dom";
import "../styles/Navbar.css";


function Navbar() {
  const [auth, setAuth] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate=useNavigate()

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setAuth(true)
    }else{
      setAuth(false)
    }
  }, [token]);

  const cerrarSesion=()=>{
    localStorage.removeItem('token');
    navigate("/login")
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ background: "#001233" }}>
        <Toolbar>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1 }}
            style={{ cursor: "pointer" }}
          >
            <Link to="/" style={{textDecoration:"none",color:"white"}}>Todo-List</Link>
          </Typography>
          {auth ? (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Perfil</MenuItem>
                <MenuItem onClick={cerrarSesion}>Cerrar sesion</MenuItem>
              </Menu>
            </div>
          ) : (
            <div>
              <Link to="/login" style={{ textDecoration: "none" }}>
                <button className="button-login">Login</button>
              </Link>
              <Link to="/register" style={{ textDecoration: "none" }}>
                <button className="button-login">Register</button>
              </Link>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
