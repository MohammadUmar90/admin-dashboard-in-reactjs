import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box width="100%" m="0 20px">
      <Box display="flex" justifyContent="space-between">
        <Box>
          {icon}
        </Box>
        <Box justifyContent="space-between" sx={{marginTop:"10px",marginRight:"10px"}}>
          <Typography variant="h6" sx={{ color: colors.primary[100] }}>
            {subtitle}
          </Typography>

          <Typography
              variant="h3"
              fontWeight="bold"
              sx={{ color: colors.grey[100] }}
            >
            {title}
          </Typography>
          <Typography
          variant="h6"
          fontStyle="italic"
          sx={{ color: colors.primary[100] }}
        >
          {increase}
        </Typography>
          
        </Box>
      </Box>
      
    </Box>
  );
};

export default StatBox;