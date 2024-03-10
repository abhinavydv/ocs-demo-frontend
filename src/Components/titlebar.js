import { Box, Typography } from "@mui/material";

export const TitleBar = () => {
    var title = "Title Bar";
    if (window){
        title = window.location.pathname.substring(1) + " /";
    }
    return (
        <Box>
            <Typography fontSize={12} color="gray">{title}</Typography>
        </Box>
    );
}