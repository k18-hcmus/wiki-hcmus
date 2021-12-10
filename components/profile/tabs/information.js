import React, { useEffect, useState } from 'react'
import { 
    Button,
    Container,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Grid,
    Paper,
    MenuItem,
    TextField,
    Select,
    Skeleton,
    styled,
} from '@mui/material';
import { Icon } from '@iconify/react';
import axiosClient from '../../../axiosClient';

const genderValues = ['Male', 'Female', 'Unknown'];
const userTypeValues = ['Basic', 'Moderator', 'Adminstrator'];

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

const EditTextInput = (props) => {
    const {setCallbackValue, defaultValue} = props;
    const handleChange = (event) => {
        setCallbackValue(event.target.value);
    }
    return (
        <TextField
                autoFocus
                margin="dense"
                id="edit-information-text-input"
                type="text"
                defaultValue={defaultValue}
                fullWidth
                variant="standard"
                onChange={handleChange}
            />
    );
}

const EditSelect = (props) => {
    const {setCallbackValue, currentValue, values, label} = props;
    const [selectValue, setSelectValue] = useState(null);
    const handleChange = (event) => {
        setSelectValue(event.target.value);
        setCallbackValue(event.target.value)
    };
    const menuItems = values.map((value, index) => 
        <MenuItem value={value}>{value}</MenuItem>
        );
    return (
        <Select
            id="edit-information-select"
            value={selectValue}
            label={label}
            onChange={handleChange}
        >
        {menuItems}
        </Select>
    );
}

const EditDialog = (props) => {
    const {BaseEditComponent, callbackValueSet, label, property, uid} = props;
    const [openDialog, setOpenDialog] = useState(false);
    const [editValue, setEditValue] = useState(null);
    const handleOpen = () => {
        setOpenDialog(true);
    }
    const handleClose = () => {
        setOpenDialog(false);
    };
    const handleConfirm = () => {
        setOpenDialog(false);
        callbackValueSet(editValue);
    }
    const handleValueChange = (value) => {
        setEditValue(value);
    }
    const EditComponent = React.cloneElement(
        BaseEditComponent,
        {
            setCallbackValue: handleValueChange
        }
    );
    return (
        <div>
            <ConfigButton variant="outlined" onClick={handleOpen}>
                <Icon icon="mdi:grease-pencil" />
            </ConfigButton>
            <Dialog open={openDialog} onClose={handleClose}>
                <DialogTitle>Edit {label}</DialogTitle>
                <DialogContent>
                    {EditComponent}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirm}>Confirm</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const ProfileCell = (props) => {
    const {label, value, setValue, disabled, BaseEditComponent, uid, property} = props;
    const handleValueSet = (value) => {
        setValue(property, value);
    }
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
                {disabled ? (
                    <Grid> </Grid>
                ) : (
                <Grid item xs={6} md={4}>
                    <Config>
                        <EditDialog
                            label={label}
                            BaseEditComponent={BaseEditComponent}
                            callbackValueSet={handleValueSet}
                            uid={uid}
                            property={property}
                        />
                    </Config>
                </Grid>
                )}
            </Grid>
        </Paper>
    );
}

const Information = () => {
    const [userData, setUserData] = useState(
        {
            id: null,
            DisplayName: null,
            Email: null,
            Gender: null,
            Phone: null,
            UserType: null
        }
    );
    const handleUserDataChange = (property, value) => {
        const newUserData = {
            ...userData, 
            [property]: value
        }
        setUserData(newUserData);
        axiosClient({
            method: 'put',
            url: `/account-users/${newUserData.id}`,
            data: newUserData,
            headers: {
            }
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });;
    }
    useEffect(() => {
        async function fetchData() {
            const id = 1;
            try {
                const results = await axiosClient.get(`/account-users?id=${id}`);
                const data = results.data[0];
                setUserData(data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, []);
    return (
        <Container>
            <ProfileCell
                uid={userData.id}
                property='DisplayName'
                label='Display Name'
                value={userData.DisplayName}
                setValue={handleUserDataChange}
                BaseEditComponent={
                    <EditTextInput
                        defaultValue={userData.DisplayName}
                    />
                }
            />
            <ProfileCell
                uid={userData.id}
                property='Email'
                label='Email'
                value={userData.Email}
                setValue={handleUserDataChange}
                BaseEditComponent={
                    <EditTextInput
                        defaultValue={userData.Email}
                    />
                }
            />
            <ProfileCell
                uid={userData.id}
                property='Gender'
                label='Gender'
                value={userData.Gender}
                setValue={handleUserDataChange}
                BaseEditComponent={
                    <EditSelect
                        label='Gender'
                        currentValue={userData.Gender}
                        values={genderValues}
                    />
                }
            />
            <ProfileCell
                uid={userData.id}
                property='Phone'
                label='Phone'
                value={userData.Phone}
                setValue={handleUserDataChange}
                BaseEditComponent={
                    <EditTextInput
                        defaultValue={userData.Phone}
                    />
                }
            />
            <ProfileCell
                label='User Type'
                value={userData.UserType}
                disabled
            />
        </Container>
    )
}

export default Information
