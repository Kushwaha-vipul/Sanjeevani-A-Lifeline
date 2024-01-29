import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import AdbIcon from "@mui/icons-material/Adb";
import Container from "@mui/material/Container";

const settings = ["Profile", "Dashboard", "Logout"];

function Home() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      <div className="flex flex-col">
        <AppBar
          position="static"
          sx={{
            background: "white", // Replace with your color values
          }}
        >
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
              <div className="flex flex-row">
                <img
                  className="size-2/4 mb-4 ml-7 mt-3"
                  src="./logosan.png"
                  alt="No image"
                />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="#app-bar-with-responsive-menu"
                  sx={{
                    mr: -50,
                    display: { xs: "none", md: "flex" },
                    fontFamily: "monospace",
                    fontWeight: 500,
                    letterSpacing: ".0rem",
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <img
                    className="w-3/6 h-3/6 translate-x-5 mt-6"
                    src="./Sanjeevani.png"
                    alt="No image"
                  />
                </Typography>
              </div>

              <Typography
                variant="h5"
                noWrap
                component="a"
                href="#app-bar-with-responsive-menu"
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".0rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Sanjeevani
              </Typography>

              <div className="flex flex-row items-center">
                <Avatar alt="Remy Sharp" src="./Doctor.png" />
                <Typography
                        variant="h6"
                        sx={{
                            fontFamily: "Inter, sans-serif",
                            fontWeight: 400,
                            fontSize: "24px",
                            color: "black",
                            ml:3
                        }}
                        >
                        Hello UserName
                </Typography>

                <Box sx={{ flexGrow: 0, ml: 2 }}>
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      {/* <Avatar alt="Remy Sharp" src="./Doctor.png" /> */}
                    </IconButton>
                  </Tooltip>

                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              </div>
            </Toolbar>
          </Container>
        </AppBar>
      </div>
    </>
  );
}

export default Home;