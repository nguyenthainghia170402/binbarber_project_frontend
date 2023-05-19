import React, { useState } from 'react';
import './booking.css';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


const Booking = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [service, setService] = useState('');
    const [stylist, setStylist] = useState('');
    const [notes, setNotes] = useState('');

    // Add state to keep track of whether login form should be displayed
    const [showLoginForm, setShowLoginForm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Do something with the form data here
    };
    const handleBookingClick = () => {
        setShowLoginForm(true);
    };
    const stylists = [
        { id: 1, name: 'John' },
        { id: 2, name: 'Jane' },
        { id: 3, name: 'David' },
    ];

    const stylistOptions = stylists.map((stylist) => (
        <option key={stylist.id} value={stylist.name}>
            {stylist.name}
        </option>
    ));
    return (
        <div className='booking-main'>
            <h1 className='title'>Binbarber Haircut Booking </h1>
            <div className="booking-container">


                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3} className="input-field">
                        <Grid item xs={12}>
                            <TextField required id="name" label="FullName" value={name} onChange={(e) => setName(e.target.value)} />


                        </Grid>
                        <Grid item xs={12}>

                            <TextField required id="phone" label="Telephone" type="tel" pattern="[0-9]{10}" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField required id="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField required id="datetime-local" label="" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                id="service"
                                select
                                label="Service"
                                SelectProps={{
                                    native: true,
                                }}
                                value={service}
                                onChange={(e) => setService(e.target.value)}
                            >
                                <option value=""></option>
                                <option value="haircut">Haircut</option>
                                <option value="haircolor">Haircolor</option>
                                <option value="hairstyle">Hairstyle</option>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="staff"
                                select
                                label="Staff"
                                SelectProps={{
                                    native: true,
                                }}
                                value={stylist}
                                onChange={(e) => setStylist(e.target.value)}
                            >
                                <option value=""></option>
                                {stylistOptions}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="stylist"
                                select
                                label="Stylist"
                                SelectProps={{
                                    native: true,
                                }}
                                value={stylist}
                                onChange={(e) => setStylist(e.target.value)}
                            >
                                <option value=""></option>
                                <option value="john">John</option>
                                <option value="jane">Jane</option>
                                <option value="david">David</option>
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="notes"
                                label="Notes"
                                multiline
                                rows={4}
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit">
                                Booking
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </div>


        </div>

    );
};

export default Booking;
