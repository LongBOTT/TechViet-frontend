import React, { useRef, useState } from "react";
import { Menu, MenuItem, Box, Button, styled } from "@mui/material";
import { links } from "./MyLinks"; // Adjust the import based on your file structure

const ButtonCategory = styled(Button)(({ theme }) => ({
  my: 2,
  color: "white",
  display: "flex",
  marginRight: "5px",
  fontSize: "12px",
  borderRadius: "0px",
  borderBottom: "2px solid #da031b",
  "&:hover": {
    borderColor: "white",
  },
}));

const ClearBoxItems = (boxRef: React.RefObject<HTMLDivElement>) => {
  if (boxRef.current) {
    // Clear all elements in the Box
    boxRef.current.innerHTML = '';
  }
};

const NavLinks = () => {
  const firstButtonRef = useRef<HTMLButtonElement | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [currentSubmenu, setCurrentSubmenu] = useState<any[]>([]);
  const [selectedSubmenu, setSelectedSubmenu] = useState<any[]>([]);
  const [openCategory, setOpenCategory] = useState<boolean>(false);
  const [onMenu, setOnMenu] = useState<boolean>(false);

  const handleOnClick = (event: React.MouseEvent<HTMLElement>, link: any) => {
    if (!firstButtonRef.current) {
      firstButtonRef.current = event.currentTarget as HTMLButtonElement;
    }
    setOpenCategory(true);
    setOnMenu(true);
    setAnchorEl(firstButtonRef.current);
    setCurrentSubmenu(link.sublinks);
    setSelectedSubmenu([]); // Reset selected submenu when new category is clicked
  };

  const handleMenuItemClick = (submenu: any[]) => {
    setSelectedSubmenu(submenu); // Set the submenu to display
  };

  const handleClose = () => {
    if (!openCategory && !onMenu) {
      setAnchorEl(null);
      setCurrentSubmenu([]);
      setSelectedSubmenu([]);
    }
  };

  const handleOnMouseLeaveMenu = () => {
    setOnMenu(false);
  };

  const handleOnMouseLeaveCategory = () => {
    setOpenCategory(false);
    handleClose();
  };

  const boxRef = useRef<HTMLDivElement | null>(null);

  const handleClearItems = () => {
    ClearBoxItems(boxRef); // Call the function to clear items in the Box
  };

  return (
    <>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          marginTop: "10px",
          height: "40px",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {links.map((link, index) => (
          <Box key={link.name}>
            <ButtonCategory
              onMouseEnter={(event) => handleOnClick(event, link)}
              onMouseLeave={handleOnMouseLeaveCategory}
              ref={index === 0 ? firstButtonRef : null}
            >
              <link.icon sx={{ paddingRight: "5px", display: "inline-flex" }} />
              {link.name}
            </ButtonCategory>
          </Box>
        ))}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onMouseOver={handleOnMouseLeaveMenu}
        PaperProps={{ 
          sx: { 
            display: 'flex', 
            width: '50%', 
            height: '500px', 
            marginTop: '8px' 
          } 
        }}
      >
        <Box 
          sx={{
            display: 'flex',
            width: '100%',
            height: '100%',
          }}
        >
          <Box sx={{
            width: '250px',
            height: '100%',
            borderRight: 'solid 4px #f3f4f6',
          }}>
            {currentSubmenu.map((submenu) => (
              <MenuItem 
                key={submenu.Head}
                  onMouseEnter={() => {
                    // Clear the previous submenu items before displaying new ones
                    setSelectedSubmenu([]);  // Clear the previous submenu completely
                    setTimeout(() => {
                      setSelectedSubmenu(submenu.sublinks);  // Set the new submenu items
                    }, 0);  // Timeout ensures the state clears before updating with new items
                  }}
                sx={{ 
                  "&:hover": {
                    transform: 'scale(1.02)',
                    fontWeight: 'bold',
                    transition: 'transform 0.1s ease-in-out',
                  },
                }}
              >
                <submenu.icon
                  sx={{ paddingRight: "5px", display: "inline-flex" }}
                />
                {submenu.Head}
              </MenuItem>
            ))}
          </Box>
          <Box sx={{
            width: '500px',
            height: '100%',
            display: 'inline-grid',
            gridTemplateColumns: 'repeat(2, 1fr)', // Creates two equal columns
            gap: '10px', // Adds space between the items
            overflowX: 'auto',
          }} ref={boxRef}>
            {/* Display selected submenu items */}
            {selectedSubmenu.map((subitem) => (
                <MenuItem key={subitem.name}
                  sx={{
                    display:'flex',
                  }}
                  onClick={handleClose}>
                  <subitem.icon
                    sx={{ paddingRight: "5px", display: "inline-flex" }}
                  />
                  {subitem.name}
                </MenuItem>
              ))}
          </Box>
        </Box>
      </Menu>
    </>
  );
};

export default NavLinks;
