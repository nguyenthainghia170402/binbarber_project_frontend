import React from 'react';
import './carouselBarbers.scss';
import { Avatar, Grid } from '@mui/material';

export const CarouselBarbersItem = ({ barber }) => {
    const birthdayString = barber.barberBirthday;
    const birthdayObject = new Date(birthdayString);
    const formattedBirthday = birthdayObject.toLocaleDateString('en-US', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    });
    return (
        <div className="carousel-item">
            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <div className="carousel-avatar">
                        <Avatar
                            alt={barber.barberName}
                            src={require(`../../assets/barberImages/${barber.barberImage}`)}
                            sx={{ width: '400px', height: '400px' }}
                        />
                    </div>
                </Grid>
                <Grid item xs={8}>
                    <div className="carousel-item-content">
                        <div>
                            <div className="carousel-item-name">{barber.barberName}</div>
                            <div className="carousel-item-forte">{barber.barberForte}</div>
                            <div className="carousel-item-birthday">{formattedBirthday}</div>
                            <div className="carousel-item-description">{barber.barberDescription}</div>
                        </div>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
};
