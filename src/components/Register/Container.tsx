import { Grid } from "@mui/material"

export const Container = ({ children }: { children: React.ReactNode }) => {
    return (
        <Grid
            container
            width={"100%"}
            height={"100%"}
            alignItems={"center"}
            justifyContent={"center"}
        >
            {children}
        </Grid>
    )
} 