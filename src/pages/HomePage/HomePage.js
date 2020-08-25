import React from 'react';

import { homeObjOne} from './Data'

import Navbar from "../../components/Navbar/Navbar";
import HeroSection from "../../components/HeroSection/HeroSection";
import Footer from "../../components/Footer/Footer";

const HomePage = () => {

    return (
        <div>
            <Navbar/>
            <HeroSection {...homeObjOne} />
            <Footer/>
        </div>
    );

};

export default HomePage; 