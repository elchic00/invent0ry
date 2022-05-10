import { Box, IconButton, Paper } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useOpen } from "../../hooks";
import { API } from "../../services/api";

export const FormFieldItem = ({
  name,
  listFields,
  id,
  children,
}: {
  name: string;
  listFields: Function;
  id: string;
  children: ({ handleOpen }: { handleOpen: Function }) => JSX.Element;
}) => {
  const { open, handleOpen } = useOpen();
  const [_, setSearchParams] = useSearchParams();

  function handleEdit() {
    setSearchParams({ id });
    handleOpen();
  }

  async function handleDelete() {
    try {
      await API.removeCategory(id);
      await listFields();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Paper elevation={1} sx={{ p: 1 }}>
      {open ? (
        children({ handleOpen })
      ) : (
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          {name}

          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton onClick={handleEdit}>
              <EditIcon
                sx={{
                  width: "15px",
                  height: "15px",
                  color: "#dcdcdc",
                }}
              />
            </IconButton>
            <IconButton onClick={handleDelete}>
              <CloseIcon
                sx={{
                  width: "15px",
                  height: "15px",
                  color: "#dcdcdc",
                }}
              />
            </IconButton>
          </Box>
        </Box>
      )}
    </Paper>
  );
};
