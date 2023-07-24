import React, { Component } from 'react';
import './services.css';

class Services extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            services: [
                {
                    name: 'HAIRCUTS',
                    options: [
                        {
                            name: 'Hair Cut',
                            price: '$50',
                        },
                        {
                            name: 'Scissor Haircut',
                            price: '$30',
                        },
                        {
                            name: 'Kid Hair Cut',
                            price: '$20',
                        },
                        {
                            name: 'Long Hair ,  Hair Cut',
                            price: '$35',
                        },
                        {
                            name: 'Hair Cut & Beard Trim',
                            price: '$44',
                        },
                        {
                            name: 'Hair Cut & Shave ',
                            price: '$58',
                        },
                        {
                            name: 'Fade',
                            price: '$29',
                        },
                        {
                            name: 'Fade & Beard Trim',
                            price: '$44',
                        },
                    ],
                },
                {
                    name: 'BEARDS & SHAVES',
                    options: [
                        {
                            name: 'Classic Shave',
                            price: '$29',
                        },
                        {
                            name: 'Beard Trim',
                            price: '$15',
                        },
                        {
                            name: 'Royal Shave',
                            price: '$35',
                        },
                    ],
                },
                {
                    name: 'EXTRAS',
                    options: [
                        {
                            name: 'Face Massage',
                            price: '$15',
                        },
                        {
                            name: 'Men’s Hair Color',
                            price: '$35',
                        },
                        {
                            name: 'Line Up',
                            price: '$13',
                        },
                        {
                            name: "'Men's Hair Cut & Color'",
                            price: '$64',
                        },
                    ],
                },
            ],

            selectedService: null,
        };
    }

    handleServiceClick = (service) => {
        this.setState({ selectedService: service });
    };

    render() {
        const { services, selectedService } = this.state;

        console.log(services);
        return (
            <>
                <div className="services">
                    <h1 className="title-service">Barber Services</h1>
                    <div className="service-buttons">
                        {services.map((service, index) => (
                            <button
                                key={index}
                                className={`service-button ${selectedService === service ? 'active' : ''}`}
                                onClick={() => this.handleServiceClick(service)}
                            >
                                {service.name}
                            </button>
                        ))}
                    </div>
                    {selectedService && (
                        <div className="service-details">
                            {selectedService.options?.map((service, index) => (
                                <>
                                    <div className="service_info">
                                        <p className="price">{service.name}</p>
                                        <p className="price">{service.price}</p>
                                    </div>
                                </>
                            ))}
                        </div>
                    )}
                </div>
            </>
        );
    }
}

export default Services;
