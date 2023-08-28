import React, { useState, useEffect } from 'react';
import { CarouselBarbersItem } from './carouselBarbersItem';
import * as barberServices from '../../services/barberServices';
import './carouselBarbers.scss';

export const CarouselBarbers = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const [iniBarbers, setIniBarbers] = useState([]);

    const updateIndex = (newIndex) => {
        if (newIndex < 0) {
            newIndex = 0;
        } else if (newIndex >= iniBarbers.length) {
            newIndex = iniBarbers.length - 1;
        }

        setActiveIndex(newIndex);
    };

    //Call API to get List Barber
    const getListBarbers = async () => {
        try {
            const result = await barberServices.getListBarbers();
            const barbers = result.data['barbers'];
            const dataBarbers = barbers.map((barber) => {
                const dataBarber = {
                    barberid: barber.barberid,
                    barberName: barber.barbername,
                    barberBirthday: barber.birthday,
                    barberForte: barber.forte,
                    barberDescription: barber.description,
                    barberImage: barber.image,
                };

                return dataBarber;
            });

            setIniBarbers(dataBarbers);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getListBarbers();
    }, []);

    return (
        <div className="carousel">
            <div className="inner" style={{ transform: `translate(-${activeIndex * 100}%)` }}>
                {iniBarbers.map((barber) => {
                    return <CarouselBarbersItem barber={barber} />;
                })}
            </div>
            <div className="carousel-buttons">
                <button
                    className="button-arrow"
                    onClick={() => {
                        updateIndex(activeIndex - 1);
                    }}
                >
                    <span className="material-symbols-outlined arrow-symbol">arrow_back_ios</span>
                </button>
                <div className="indicators">
                    {iniBarbers.map((barber, index) => {
                        return (
                            <button
                                className="indicator-buttons"
                                onClick={() => {
                                    updateIndex(index);
                                }}
                            >
                                <span
                                    className={`material-symbols-outlined ${
                                        index === activeIndex ? 'indicator-symbol-active' : 'indicator-symbol'
                                    }`}
                                >
                                    radio_button_checked
                                </span>
                            </button>
                        );
                    })}
                </div>
                <button
                    className="button-arrow"
                    onClick={() => {
                        updateIndex(activeIndex + 1);
                    }}
                >
                    <span class="material-symbols-outlined  arrow-symbol">arrow_forward_ios</span>
                </button>
            </div>
        </div>
    );
};
