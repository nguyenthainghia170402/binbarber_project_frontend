import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function CardService(props) {
    return (
        <Card sx={{ maxWidth: 400 }}>
            <CardMedia
                sx={{ height: 300 }}
                image={require(`../../assets/serviceImages/${props.service.serviceimage}`)}
                title={props.service.serviecname}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.service.servicename}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Time of service:{' '}
                    <Typography variant="body2" color="#9f7150" display={'inline'}>
                        {props.service.timeofservice} minutes
                    </Typography>{' '}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Price of service:
                    <Typography variant="body2" color="#9f7150" display={'inline'}>
                        {' '}
                        {Intl.NumberFormat('en-US', { style: 'currency', currency: 'VND' }).format(
                            props.service.priceofservice,
                        )}{' '}
                    </Typography>
                </Typography>
            </CardContent>
            {/* <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions> */}
        </Card>
    );
}
