import Header from "../components/home/Header";
import React from "react";
import SectionAboutHome from "@/components/home/sectionAboutHome/SectionAboutHome";
import { UserContext } from '@/context/UserContext';
import { useContext } from 'react';

const Home = ({ user }) => {
  return (
    <>
      <Header />
      <SectionAboutHome />
    </>
  )
};

export default Home;
