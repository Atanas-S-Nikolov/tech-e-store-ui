import Collapse from "@mui/material/Collapse";
import MenuList from "@mui/material/MenuList";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function ProductTypeMenu({ itemId, items, onClose, isOpen }) {
  return (
    <Collapse
      in={isOpen}
      timeout="auto"
      unmountOnExit
      sx={{ paddingLeft: 4 }}
    >
      <MenuList>
        {items.map((item) => (
          <ListItem key={crypto.randomUUID()} onClick={(event) => onClose(event, itemId)} disablePadding>
            <ListItemText primary={item}/>
          </ListItem>
        ))}
      </MenuList>
    </Collapse>
  );
}