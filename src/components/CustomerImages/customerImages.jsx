import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { makeStyles } from '@mui/styles';
import './customerImages.scss';
import * as cusImagesServices from '../../services/cusImagesServices';

const useStyles = makeStyles({
    gridContainer: {
        paddingLeft: '20px',
        paddingRight: '20px',
    },
});

function CustomerImages() {
    const classes = useStyles();
    const [cusImages, setCusImages] = useState([]);

    const getListCusImages = async () => {
        try {
            const result = await cusImagesServices.getListCusImages();
            const cusImages = result.data['cusimages'];
            const dataCusImages = cusImages.map((cusImage) => {
                const dataCusImage = {
                    cusimageid: cusImage.cusimageid,
                    image: cusImage.image,
                };

                return dataCusImage;
            });
            const listCusImages = [];
            const endIndex = Math.max(0, dataCusImages.length - 1);
            const startIndex = Math.max(0, endIndex - 5);

            for (let i = endIndex; i >= startIndex; i--) {
                const cusImage = dataCusImages[i];
                const listItem = (
                    <Grid key={cusImage.cusimageid} item xs={12} sm={6} md={4}>
                        <Card sx={{ maxWidth: 400 }}>
                            <CardMedia
                                sx={{ height: 400 }}
                                image={require(`../../assets/customerImages/${cusImage.image}`)}
                                title="customer image"
                            />
                        </Card>
                    </Grid>
                );

                listCusImages.push(listItem);
            }
            setCusImages(listCusImages);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getListCusImages();
    }, []);
    return (
        <div className="container">
            <Grid container spacing={4} className={classes.gridContainer} justifyContent="center">
                {cusImages}
            </Grid>
        </div>
    );
}

export default CustomerImages;
