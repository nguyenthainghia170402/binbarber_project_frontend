import React, { useContext } from 'react';
import './staff.css';

import { Link } from 'react-router-dom';

const Staff = () => {
    const staffData = [
        {
            name: 'John Doe',
            image: 'https://images.squarespace-cdn.com/content/v1/5e90a50c76018527203fc1f7/570fa024-8172-4ae2-b654-51159c46ef26/IMG_7845.jpg?format=750w',
        },
        {
            name: 'Jane Smith',
            image: 'https://images.squarespace-cdn.com/content/v1/5e90a50c76018527203fc1f7/1593731894028-7PQQV2L9WFAA32WJYPWO/Nate.jpg',
        },
        // Thêm các nhân viên khác vào đây
    ];

    return (
        <div className="staff-container">
            <div className="body-center">
                <h1 className="team-heading">OUR TEAM</h1>
                <h1 className="family-heading">Meet the family</h1>
                <p className="staff-p">
                    The barbers you'd trust with your hair and your life. You may know us from our years at Spearhead
                    Barber, or maybe you're a new face. Either way, you can trust us with yours. Welcome to the family.
                </p>
            </div>
            <div className="staff-list">
                {staffData.map((staff, index) => (
                    <Link key={index} to={'/booking/' + staff.name} className="staff-item">
                        <img src={staff.image} alt={staff.name} />
                        <h3>{staff.name}</h3>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Staff;
