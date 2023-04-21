import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';

const MainPage = () => {
    return (
        <div className='px-5'>
            <Header></Header>
            <Outlet></Outlet>
        </div>
    );
};

export default MainPage;