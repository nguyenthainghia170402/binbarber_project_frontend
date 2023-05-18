import React, { useState } from 'react';
import './booking.css';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const Booking = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [service, setService] = useState('');
    const [stylist, setStylist] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Do something with the form data here
    };

    return (
        <div className="booking-container">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField required id="name" label="Họ và tên" value={name} onChange={(e) => setName(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required id="phone" label="Số điện thoại" type="tel" pattern="[0-9]{10}" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required id="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField required id="datetime-local" label="Ngày giờ hẹn" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            id="service"
                            select
                            label="Loại dịch vụ"
                            SelectProps={{
                                native: true,
                            }}
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                        >
                            <option value=""></option>
                            <option value="haircut">Cắt tóc</option>
                            <option value="haircolor">Nhuộm tóc</option>
                            <option value="hairstyle">Tạo kiểu tóc</option>
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
                            label="Ghi chú"
                            multiline
                            rows={4}
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" type="submit">
                            Đặt lịch
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};

export default Booking;
