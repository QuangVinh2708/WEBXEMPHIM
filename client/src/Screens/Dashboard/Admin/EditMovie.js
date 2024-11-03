import React, { useEffect, useState } from 'react';
import SideBar from '../SideBar';
import { Input } from '../../../Components/UsedInputs';
import Uploder from '../../../Components/Uploder';
import { Message, Select } from '../../../Components/UsedInputs';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { ImUpload } from 'react-icons/im';
import CastsModal from '../../../Components/Modals/CastsModal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { movieValidation } from '../../../Components/Validation/MovieValidation';
import { createMovieAction, getMovieByIdAction, removeCastAction, updateMovieAction } from '../../../Redux/Actions/MoviesActions';
import { toast } from 'react-toastify';
import { InlineError } from '../../../Components/Notfications/Error';
import { ImagePreview } from '../../../Components/ImagePreview';
import { RiMovie2Line } from 'react-icons/ri';
import Loader from '../../../Components/Notfications/Loader';
function EditMovie() {
    const sameClass = "w-full gap-6 flex-colo min-h-screen"
    const [modalOpen, setModalOpen] = useState(false);
    const [cast, setCast] = useState(null);
    const [imageWithoutTitle, setImageWithoutTitle] = useState("");
    const [imageTitle, setImageTitle] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();


    // use selectors
    const { categories } = useSelector((state) => state.categoryGetAll);
    const { isLoading, isError, movie } = useSelector(
        (state) => state.getMovieById
    );
    const { isLoading: editLoading, isError: editError, isSuccess } = useSelector(
        (state) => state.updateMovie
    );
    const { casts } = useSelector((state) => state.casts);

    // Validate user
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm({
        resolver: yupResolver(movieValidation)
    });

    // On submit
    const onSubmit = (data) => {
        dispatch(updateMovieAction(movie?._id,
            {
                ...data,
                image: imageWithoutTitle,
                titleImage: imageTitle,
                video: videoUrl,
                casts: casts.length > 0 ? casts : movie?.casts,
            }
        ));

    };
    // delete cast handler
    const deleteCastHandler = (id) => {
        dispatch(removeCastAction(id));
        toast.success("Cast deleted successfully");
    };




    useEffect(() => {
        // Only set form values if movie data is loaded and matches the current `id`
        if (movie?._id === id) {
            setValue("name", movie?.name);
            setValue("time", movie?.time);
            setValue("language", movie?.language);
            setValue("year", movie?.year);
            setValue("category", movie?.category);
            setValue("desc", movie?.desc);
            setImageWithoutTitle(movie?.image);
            setImageTitle(movie?.titleImage);
            setVideoUrl(movie?.video);
        } else {
            dispatch(getMovieByIdAction(id));
        }

        // Reset cast selection only when modal is closed
        if (!modalOpen) {
            setCast(null);
        }


    }, [dispatch, id, movie, modalOpen, setValue, isSuccess, editError, navigate]);

    useEffect(() => {
        if (isSuccess) {
            dispatch({ type: "UPDATE_MOVIE_RESET" });
            navigate(`/edit/${id}`);
        }
        if (editError) {
            toast.error("Something went wrong");
            dispatch({ type: "UPDATE_MOVIE_RESET" });
        }
    }, [isSuccess, editError, dispatch, navigate, id]);

    return (
        <SideBar>
            <CastsModal modalOpen={modalOpen} setModalOpen={setModalOpen} cast={cast} />
            {
                isLoading ? (
                    <Loader />
                ) :
                    isError ? (<div className={sameClass}>
                        <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
                            <RiMovie2Line />
                        </div>
                        <p className="text-border text-sm">
                            Something went wrong
                        </p>
                    </div>
                    ) : (
                        <div className="flex flex-col gap-6">
                            <h2 className="text-xl font-bold">Edit "{movie?.name}"</h2>
                            <div className='w-full grid md:grid-cols-2 gap-6'>
                                <div className="w-full">
                                    <Input
                                        label="Movie Title"
                                        placeholder="Game of Thrones"
                                        type="text"
                                        bg={true}
                                        name="name"
                                        register={register("name")}
                                    />
                                    {errors.name && <InlineError text={errors.name.message} />}
                                </div>

                                <div className="w-full">
                                    <Input
                                        label="Hours"
                                        placeholder="2hr"
                                        type="number"
                                        bg={true}
                                        name="time"
                                        register={register("time")}
                                    />
                                    {errors.time && <InlineError text={errors.time.message} />}
                                </div>

                            </div>
                            <div className='w-full grid md:grid-cols-2 gap-6'>
                                <div className="w-full">
                                    <Input
                                        label="Language Used"
                                        placeholder="English"
                                        type="text"
                                        bg={true}
                                        name="language"
                                        register={register("language")}
                                    />
                                    {errors.language && <InlineError text={errors.language.message} />}
                                </div>

                                <div className="w-full">
                                    <Input
                                        label="Year of Release"
                                        placeholder="2022"
                                        type="number"
                                        bg={true}
                                        name="year"
                                        register={register("year")}
                                    />
                                    {errors.year && <InlineError text={errors.year.message} />}
                                </div>

                            </div>
                            {/*IMAGES */}
                            <div className='w-full grid md:grid-cols-2 gap-6'>
                                {/*img without title */}
                                <div className='flex flex-colo gap-2'>
                                    <p className='text-border font-semibold text-sm'>
                                        Image without Title
                                    </p>
                                    <Uploder setImageUrl={setImageWithoutTitle} />
                                    <ImagePreview image={imageWithoutTitle} name="imageWithoutTitle" />
                                </div>
                                {/*img without title */}
                                <div className='flex flex-colo gap-2'>
                                    <p className='text-border font-semibold text-sm'>
                                        Image with Title
                                    </p>
                                    <Uploder setImageUrl={setImageTitle} />
                                    <ImagePreview image={imageTitle} name="imageTitle" />
                                </div>
                            </div>

                            {/*DESCRIPTION */}
                            <div className="w-full">
                                <Message
                                    label="Movie Description"
                                    placeholder="Make it short and sweet"
                                    name="desc"
                                    register={{ ...register("desc") }}
                                />
                                {errors.desc && <InlineError text={errors.desc.message} />}
                            </div>

                            {/*CATEGORY */}
                            <div className="text-sm w-full">
                                <Select
                                    label="Movie Category"
                                    options={categories?.length > 0 ? categories : []}
                                    name="category"
                                    register={{ ...register("category") }}
                                />
                                {errors.category && <InlineError text={errors.category.message} />}
                            </div>

                            {/*MOVIE VIDEO*/}
                            <div className='flex flex-colo gap-2 w-full '>
                                <label className='text-border font-semibold text-sm'>
                                    Movie Video
                                </label>
                                <div className={`w-full grid ${videoUrl && "md:grid-cols-2"} gap-6`}>
                                    {videoUrl && (
                                        <div className="w-full bg-main text-sm text-subMain py-4 border border-border rounded flex-colo">
                                            Video Uploaded!!!
                                        </div>
                                    )}
                                    <Uploder setImageUrl={setVideoUrl} />
                                </div>

                            </div>
                            {/*CASTS*/}
                            <div className='w-full grid lg:grid-cols-2 gap-6 items-start'>
                                <div className='w-full'>
                                    <button
                                        onClick={() => setModalOpen(true)}
                                        className='w-full py-4 bg-main border border-subMain border-dashed text-white rounded'>
                                        Add Cast
                                    </button>
                                    <span className="text-border text-xs">
                                        if you add new casts the previous casts will be deleted. So you should add them again
                                    </span>

                                </div>

                                <div className='grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols-2 gap-4'>
                                    {casts?.length > 0 &&
                                        casts?.map((user) =>
                                        (
                                            <div key={user}
                                                className='p-2 italic text-xs text-center rounded flex-col bg-main border border-border'>
                                                <img src={`${user.image ? user.image : "https://res.cloudinary.com/dwfmpiozq/image/upload/v1730567122/Logo_m2ooop.png"}`}
                                                    alt={user.name}
                                                    className='w-full h-24 object-cover rounded-mb-4' />
                                                <p>{user.name}</p>
                                                <div className='flex-rows mt-2 w-full gap-2'>
                                                    <button
                                                        onClick={() => deleteCastHandler(user?.id)}
                                                        className='w-6 h-6 flex-colo bg-dry border border-border text-subMain rounded'>
                                                        <MdDelete />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setCast(user);
                                                            setModalOpen(true)
                                                        }}
                                                        className='w-6 h-6 flex-colo bg-dry border border-border text-green-600 rounded'>
                                                        <FaEdit />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            {/* || !imageTitle ||!imageWithoutTitle ||!videoUrl */}
                            {/* SUBMIT */}
                            <button
                                disabled={isLoading}
                                onClick={handleSubmit(onSubmit)}
                                className="bg-subMain w-full flex-rows gap-6 font-medium  text-white py-4 rounded ">
                                {
                                    isLoading ? "Please wait ..." :
                                        <><ImUpload /> Publish Movie</>
                                }




                            </button>
                        </div>)}
        </SideBar>
    );
}

export default EditMovie;
