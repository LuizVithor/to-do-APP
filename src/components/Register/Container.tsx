import { Grid, useTheme } from "@mui/material"

export const Container = ({ children }: { children: React.ReactNode }) => {

    const theme = useTheme();

    return (
        <Grid
            container
            width={"100%"}
            height={"100%"}
            alignItems={"center"}
            justifyContent={"center"}
            sx={{
                backgroundColor: theme.palette.background.default
            }}
        >
            {children}
        </Grid>
    )
} 