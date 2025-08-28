// SidebarLayout.jsx
import React, { useState } from "react";
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  CssBaseline,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Book as BookIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person"; // User icon
import DescriptionIcon from "@mui/icons-material/Description"; // Notes icon
import { useAdmin } from "../context/adminContext";
import Content from "../pages/Content";

const drawerWidth = 230;

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const { setActiveComponent, activeComponent } = useAdmin();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* Top AppBar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar Drawer */}
      <Drawer
        variant="persistent"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {[
              { text: "Home", icon: <HomeIcon /> },
              { text: "Courses", icon: <BookIcon /> },
              { text: "Notes", icon: <DescriptionIcon /> },
              { text: "All User", icon: <PersonIcon /> },
              { text: "Settings", icon: <SettingsIcon /> },
            ].map((item) => {
              const isActive = activeComponent === item.text.toLowerCase();
              return (
                <ListItem
                  key={item.text}
                  component="button"
                  selected={isActive}
                  onClick={() =>
                    setActiveComponent(item.text.toLowerCase())
                  }
                  className={`${isActive
                      ? "bg-[#1976d2] text-amber-50 cursor-pointer"
                      : "bg-white cursor-pointer text-gray-700"
                    }`}
                >
                  <ListItemIcon
                    className={`${isActive ? "text-amber-50" : "text-gray-700"}`}
                  >
                    {React.cloneElement(item.icon, {
                      htmlColor: isActive ? "#fef3c7" : "#374151",
                    })}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          marginLeft: open ? `${0}px` : -27,
          transition: "margin 0.3s ease",
        }}
      >
        <Toolbar />
        <Content />
      </Box>
    </Box>
  );
};

export default Sidebar; 
