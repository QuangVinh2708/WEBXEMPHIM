import React, { useEffect } from 'react';
import SideBar from './SideBar';
import Uploder from '../../Components/Uploder';
import { Input } from '../../Components/UsedInputs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProfileValidation } from '../../Components/Validation/UserValidation';

function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {userInfo} = useSelector(
        (state) => state.userLogin
    );

    // Validate user
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(ProfileValidation)
    });

    // On submit
    const onSubmit = (data) => {
        
    };

    useEffect(() => {
       if (userInfo) {
        
       }
    }, [userInfo]);
    return (
        <SideBar>
            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold">Profile</h2>
                <Uploder />
                <Input
                    label="FullName"
                    placeholder="DVP"
                    type="text"
                    bg={true}
                />
                <Input
                    label="Email"
                    placeholder="DVP@gmail.com"
                    type="email"
                    bg={true}
                />
                <div className="flex flex-wrap justify-between gap-4 my-4">
                    <button className="bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">
                        Delete Account
                    </button>
                    <button className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">
                        Update Profile
                    </button>
                </div>
            </div>
        </SideBar>
    );
}

export default Profile;
