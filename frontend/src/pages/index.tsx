import {Container, Link, Typography} from "@mui/material";

import Box from '@mui/material/Box';

export default function Home() {
    return (
        <Container maxWidth="lg">
            <Box
                sx={{
                    my: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant="h4" component="h1" gutterBottom>
                    Solidify Frontend
                </Typography>
                <Box component="p">
                    For <Link href="https://github.com/yepengding/solidify" target="_blank">Solidify Project</Link>
                </Box>
                <Box component="p">
                    By <Link href="https://yepengding.github.io/" target="_blank">Yepeng Ding</Link>
                </Box>
            </Box>
        </Container>
    )
}
