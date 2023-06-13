import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

export default function AlertMessage(props) {
    let alertContent;

    switch (props.errorType) {
        case 'error':
            alertContent = <Alert severity="error">{props.alertMessage}</Alert>;
            break;
        case 'warning':
            alertContent = <Alert severity="warning">This is a warning alert — check it out!</Alert>;
            break;
        case 'info':
            alertContent = <Alert severity="info">This is an info alert — check it out!</Alert>;
            break;
        case 'success':
            alertContent = <Alert severity="success">This is a success alert — check it out!</Alert>;
            break;
        default:
            alertContent = null;
            break;
    }

    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            {alertContent}
        </Stack>
    );
}
