import React, { useEffect, useState } from 'react'
import { 
    Button,
    Container,
    Grid,
    Paper,
    Skeleton,
    styled,
} from '@mui/material';
import axiosClient from '../../axiosClient'

const Label = styled('div')(({ theme }) => ({
    ...theme.typography.h6,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.primary,
}));

const Value = styled('div')(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

const Config = styled('div')(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    position: 'relative',
    color: theme.palette.text.primary,
}));

const ConfigButton = styled(Button)(({ theme }) => ({
    position: 'absolute',
    right: '15px',
}));

const ProfileCell = (props) => {
    const {label, value} = props;
    return (
        <Paper elevation={3} sx={{ mb: 5, px: 3, pb: 1}}>
            <Grid container spacing={2}>
                <Grid item xs={6} md={8}>
                    <Label>
                        {label}
                    </Label>
                    {value ? (
                        <Value>
                            {value}
                        </Value>
                    ) : (
                        <Skeleton 
                            animation="wave"
                        />
                    )}
                </Grid>
                <Grid item xs={6} md={4}>
                    <Config>
                        <ConfigButton variant="outlined">
                            Change
                        </ConfigButton>
                    </Config>
                </Grid>
            </Grid>
        </Paper>
    );
}

const Information = () => {
    const [displayName, setDisplayName] = useState(null);
    const [email, setEmail] = useState(null);
    const [gender, setGender] = useState(null);
    const [phone, setPhone] = useState(null);
    const [userType, setUserType] = useState(null);
    useEffect(() => {
        async function fetchData() {
            const id = 1;
            try {
                const results = await axiosClient.get(`/account-users?id=${id}`);
                const data = results.data[0];
                console.log(results);
                setDisplayName(data.DisplayName);
                setEmail(data.Email);
                setGender(data.Gender);
                setPhone(data.Phone);
                setUserType(data.UserType);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, []);
    return (
        <Container>
            <ProfileCell
                label='Display Name'
                value={displayName}
            />
            <ProfileCell
                label='Email'
                value={email}
            />
            <ProfileCell
                label='Gender'
                value={gender}
            />
            <ProfileCell
                label='Phone'
                value={phone}
            />
            <ProfileCell
                label='User Type'
                value={userType}
            />
        </Container>
    )
}

export default Information
