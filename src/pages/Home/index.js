import React from "react";
import Header from "../../components/Header/index";
import Calender from "../../components/Calender/Calender";
export const Home = () => {
    return <>
        <div className='container'>
            <div className='main'>
                <div className='main-content'>
                    <div>
                        <h1>Being a barber is about taking care of the people.</h1>
                    </div>
                    <div>
                        <p> Rem ipsum dolor sit amet, consectetur adipisicing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco.</p>
                    </div>
                </div>

                <div className='main-calendar'>
                    <Calender />
                </div>


            </div>

        </div>
    </>
}
