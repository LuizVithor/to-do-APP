import { NavBar } from "./NavBar";
import { Grid } from "@mui/material";

export const Container = ({ children }: { children: React.ReactNode }) => {
    return (
        <Grid
            m={12}
            lg={12}
            md={12}
            sm={12}
            xs={12}
            margin={0}
            height={"100%"}
        >
            <NavBar />
            {children}
        </Grid>
    )
}