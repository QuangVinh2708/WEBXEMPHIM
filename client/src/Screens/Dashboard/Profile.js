import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import Uploder from '../../Components/Uploder';
import { Input } from '../../Components/UsedInputs';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProfileValidation } from '../../Components/Validation/UserValidation';
import { InlineError } from '../../Components/Notfications/Error';
import { ImagePreview } from '../../Components/ImagePreview';
import { updateProfileAction } from '../../Redux/Actions/userActions';
import { toast } from 'react-toastify';

function Profile() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.userLogin);
    
    const [imageUrl, setImageUrl] = useState(userInfo ? userInfo.image : ""); 
    // Validate user
    const { isLoading, isError, isSuccess } = useSelector(
        (state) => state.userUpdateProfile
    );

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(ProfileValidation)
    });

    // On submit
    const onSubmit = (data) => {
        dispatch(updateProfileAction({ ...data, image: imageUrl }));
    };

    useEffect(() => {
       if (userInfo) {
           setValue("fullName", userInfo?.fullName);
           setValue("email", userInfo?.email);
       }
       if(isSuccess) {
        dispatch({type:"USER_UPDATE_PROFILE_RESET"});
       }
       if(isError) {
        toast.error(isError)
       }
    }, [userInfo, setValue , isSuccess,isError,dispatch]);

    return (
        <SideBar>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <h2 className="text-xl font-bold">Profile</h2>
                <div className='w-full grid lg:grid-cols-12 gap-6'>
                    <div className='col-span-10'>
                        <Uploder setImageUrl={setImageUrl} />
                    </div>
                    {/* image preview */}
                    <div className='col-span-2'>
                        <ImagePreview 
                            image={imageUrl} 
                            name={userInfo ? userInfo.fullName : "DVP"}
                        />
                    </div>
                </div>
                
                <div className='w-full'>
                    <Input
                        label="FullName"
                        placeholder="DVP"
                        type="text"
                        name="fullName"
                        register={register("fullName")}
                        bg={true}
                    />
                    {errors.fullName && <InlineError text={errors.fullName.message} />}
                </div>
                <Input
                    label="Email"
                    placeholder="DVP@gmail.com"
                    type="email"
                    bg={true}
                    register={register("email")}
                />
                <div className="flex flex-wrap justify-between gap-4 my-4">
                    <button type="button" className="bg-subMain font-medium transitions hover:bg-main border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">
                        Delete Account
                    </button>
                    <button type="submit" className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded w-full sm:w-auto">
                        {
                            isLoading ? "Updating..." : "Update Profile"
                        }
                    </button>
                </div>
            </form>
        </SideBar>
    );
}

export default Profile;
