import React from 'react';
import SideBar from '../SideBar';
import { FaRegListAlt, FaUser } from 'react-icons/fa';
import { HiViewGridAdd } from 'react-icons/hi';
import Table from '../../../Components/Table'; // Assuming Table component exists in this path
import { Movies } from '../../../Data/MovieData';

// Dummy Movie data, replace with real data or import it
const Movie = [
    { title: 'Movie 1', year: 2022 },
    { title: 'Movie 2', year: 2021 },
    { title: 'Movie 3', year: 2020 },
    { title: 'Movie 4', year: 2019 },
    { title: 'Movie 5', year: 2018 },
];

function Dashboard() {
    const DashboardData = [
        {
            bg: "bg-orange-600", // Fixed class name for Tailwind
            icon: FaRegListAlt,
            Titles: "Total Movies",
            total: 90
        },
        {
            bg: "bg-blue-700",
            icon: HiViewGridAdd,
            Titles: "Total Categories",
            total: 8
        },
        {
            bg: "bg-green-600",
            icon: FaUser,
            Titles: "Total User",
            total: 134
        },
    ];

    return (
        <SideBar>
            <h2 className="text-xl font-bold">Dashboard</h2>
            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4'>
                {DashboardData.map((data, index) => (
                    <div
                        key={index}
                        className='p-4 rounded bgmain border-border grid grid-cols-4 gap-2'>
                        <div className={`col-span-1 rounded-full h-12 w-12 flex-colo ${data.bg}`}>
                            <data.icon />
                        </div>
                        <div className='col-span-3'>
                            <h2>{data.Titles }</h2>
                            <p className='mt-2 font-bold'>{data.total}</p>
                        </div>
                    </div>
                ))}
            </div>
            <h3 className='text-md font-medium my-6 text-border'> Recent Movies</h3>
            <Table data={Movies.slice(0, 5)} admin={true} />
        </SideBar>
    );
}

export default Dashboard;
