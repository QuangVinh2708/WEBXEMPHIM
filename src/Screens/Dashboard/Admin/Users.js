import React from 'react';
import SideBar from './SideBar';
import { HiPlusCircle } from 'react-icons/hi';
import Table2 from '../../../Components/Table2';

function Users() {
    return (
        <SideBar>
            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold">Users</h2>
                
                <Table2 data={UserData} users={true}/>
            </div>
        </SideBar>
    );
}

export default Users;
