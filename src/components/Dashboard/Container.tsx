import { NavBar } from "./NavBar";
import { Grid, Paper } from "@mui/material";

export const Container = ({ children }: { children: React.ReactNode }) => {
    return (
        <Grid
            container
            margin={0}
            width={"100%"}
            height={"100%"}
            alignItems={"center"}
            // flexDirection={"column"}
            justifyContent={"center"}
            sx={{
                backgroundColor: "#ebdfcc"
            }}
        >
            <Grid
                lg={7}
                md={11}
                xs={10}
                sm={10}
                container
                height={"80%"}
            >
                <Paper
                    elevation={10}
                    style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "15px"
                    }}
                >
                    <Grid
                        item
                        height={"10%"}
                        width={"100%"}
                    >
                        <NavBar />
                    </Grid>
                    {children}
                </Paper>
            </Grid>
        </Grid>
    )
}