import React, { useEffect } from 'react';
import SideBar from '../SideBar';
//import { HiPlusCircle } from 'react-icons/hi';
import Table2 from '../../../Components/Table2';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUsersAction, getAllUsersAction } from '../../../Redux/Actions/userActions';
import { toast } from 'react-toastify';
import Loader from '../../../Components/Notfications/Loader';
import { Empty } from '../../../Components/Notfications/Empty';

function Users() {
    const dispatch = useDispatch();

    const { isLoading, isError, users = [] } = useSelector(
        (state) => state.adminGetAllUsers
    );

    // delete
    const {
        isError: deleteError,
        isSuccess,
    } = useSelector((state)=> state.adminDeleteUsers);

    // delete movies handler
    const deleteMoviesHandler = (id) => {
        if(window.confirm("Are you sure you want to delete to this acc")){
            dispatch(deleteUsersAction(id))
        }
    };

    // useEffect
    useEffect(() => {
        dispatch(getAllUsersAction());
        if (isError || deleteError) {
            toast.error(isError || deleteError);
            dispatch({type: isError ? "GET_ALL_USERS_RESET" : "DELETE_USER_RESET"});
        }
    }, [dispatch, isError, deleteError, isSuccess]);

    return (
        <SideBar>
            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold">Users</h2>
                {isLoading ? (
                        <Loader />
                    ) : users?.length > 0 ? (
                        <Table2 
                        data={users} 
                        users={true} 
                        onDeleteFunction={deleteMoviesHandler} />
                    ) : (
                        <Empty message="Bạn không có người dùng nào " />
                    )
                }
            </div>
        </SideBar>
    );
}

export default Users;