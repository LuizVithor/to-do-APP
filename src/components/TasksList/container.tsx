import { Grid } from "@mui/material"

export const Container = ({ children }: { children: React.ReactNode }) => {
    return (
        <Grid
            container
            width={"100%"}
            height={"90%"}
            alignItems={"flex-start"}
            justifyContent={"center"}
        >
            {children}
        </Grid>
    )
}