import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';

import './index.scss';
import Header from '../../components/Header/index';
import Calender from '../../components/Calender/Calender';
import CardService from '../../components/CardService/cardService';
import CustomerImages from '../../components/CustomerImages/customerImages';
import Footer from '../../components/Footer/footer';
import { CarouselBarbers } from '../../components/CarouselBarbers/carouselBarbers';
import * as servicesServices from '../../services/servicesServices';

const styleTitle = {
    fontFamily: `'Prata', sans-serif !important`,
    fontSize: '80px !important',
    color: '#9F7150 !important',
    lineHeight: '90px !important',
    marginBottom: '10px',
};

const useStyles = makeStyles({
    gridContainer: {
        paddingLeft: '20px',
        paddingRight: '20px',
    },
});

export const Home = () => {
    const classes = useStyles();
    //Handle services
    const [initServices, setInitServices] = useState([]);

    //Call API to get list services
    const fetchListServices = async () => {
        try {
            const result = await servicesServices.getListServices();
            const services = result.data['services'];
            const dataServices = services.map((service) => {
                const dataService = {
                    serviceid: service.serviceid,
                    servicename: service.servicename,
                    serviceimage: service.image,
                    timeofservice: service.timeofservice,
                    priceofservice: service.price,
                };

                return dataService;
            });
            const listServices = dataServices.map((service) => (
                <Grid key={service.serviceid} item xs={12} sm={6} md={4}>
                    <CardService service={service} />
                </Grid>
            ));
            setInitServices(listServices);
        } catch (error) {
            console.error(error);
        }
    };

    //Handle services

    useEffect(() => {
        fetchListServices();
    }, []);

    return (
        <>
            <div className="container-header">
                <Header />
            </div>

            <div className="container-introduction">
                <div className="main">
                    <div className="main-content">
                        <div>
                            <Typography sx={{ ...styleTitle }}>
                                Being a barber is about taking care of the people.
                            </Typography>
                        </div>
                        <div>
                            <p>
                                Binbarber Shop: Your go-to destination for men's grooming. Our skilled barbers
                                specialize in trendy haircuts, precise beard grooming, and refreshing hot towel shaves.
                                Step into our vibrant and stylish space, where we focus on delivering top-notch service
                                and ensuring you leave looking and feeling your best.
                            </p>
                        </div>
                    </div>

                    <div className="main-calendar">
                        <Calender />
                    </div>
                </div>
            </div>

            <div className="container-element">
                <div>
                    <div className="wrapper-title">
                        <h3 className="title">Our Services</h3>
                        <p className="subtitle">Binbarber Shop offers exceptional grooming services for men.</p>
                    </div>
                    <div className="wrapper-content">
                        <Grid container spacing={4} className={classes.gridContainer} justifyContent="center">
                            {initServices}
                        </Grid>
                    </div>
                </div>
            </div>

            <div className="container-element container-team">
                <div>
                    <div className="wrapper-title">
                        <h3 className="title">Our Creative Team</h3>
                        <p className="subtitle">
                            The barbers you'd trust with your hair and your life. You may know us from our years at
                            Spearhead Barber, or maybe you're a new face. Either way, you can trust us with yours.
                            Welcome to the family.
                        </p>
                    </div>
                    <div className="wrapper-content wapper-carousel">
                        <CarouselBarbers />
                    </div>
                </div>
            </div>

            <div className="container-element">
                <div>
                    <div className="wrapper-title">
                        <h3 className="title">Unforgettable Atmosphere</h3>
                        <p className="subtitle">Indulge in the Unforgettable Atmosphere at Binbarber Shop.</p>
                    </div>
                    <div className="wrapper-content">
                        <CustomerImages />
                    </div>
                </div>
            </div>
            <div className="container-element container-about">
                <Grid container>
                    <Grid item xs={12} md={6}>
                        <div className="about-image"></div>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <div className="container-about-content">
                            <div className="wrapper-title">
                                <h3 className="title">About Us</h3>
                                <p className="subtitle" style={{ width: '600px' }}>
                                    Transform Your Style, Embrace Confidence - Binbarber Shop
                                </p>
                            </div>
                            <div className="wrapper-content-about">
                                Binbarber Shop is your ultimate destination for premium men's grooming services. Step
                                into our world of style and sophistication, where our team of skilled barbers is
                                dedicated to delivering exceptional haircuts, precise beard grooming, and revitalizing
                                shaves. With a focus on attention to detail and customer satisfaction, we strive to
                                create a welcoming atmosphere where every visit is an experience to remember.
                                <br></br>Whether you're looking for a classic, trendy, or bespoke style, our expert
                                barbers will work closely with you to achieve the perfect look that reflects your
                                personality and enhances your confidence. Discover the art of grooming and indulge in
                                the luxurious ambiance of Binbarber Shop, where quality meets style.
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>

            <div className="container-element">
                <div>
                    <div className="wrapper-title">
                        <h3 className="title">Blogs</h3>
                        <p className="subtitle">Indulge in the Unforgettable Atmosphere at Binbarber Shop.</p>
                    </div>
                    <div className="wrapper-content">
                        <CustomerImages />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};
