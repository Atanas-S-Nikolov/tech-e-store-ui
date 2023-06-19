import Collapse from "@mui/material/Collapse";
import MenuList from "@mui/material/MenuList";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export default function ProductTypeMenu({ itemId, items, itemOnClick, isOpen, category }) {
  return (
    <Collapse
      in={isOpen}
      timeout="auto"
      unmountOnExit
      sx={{ paddingLeft: 4 }}
    >
      <MenuList>
        {items.map((item) => (
          <ListItem key={crypto.randomUUID()} onClick={(event) => itemOnClick(event, itemId, category, item.name)} disablePadding>
            <ListItemText className="link-default-color" primary={item.plural}/>
          </ListItem>
        ))}
      </MenuList>
    </Collapse>
  );
}