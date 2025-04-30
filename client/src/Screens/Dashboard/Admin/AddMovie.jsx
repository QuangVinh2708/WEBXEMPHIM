import React, { useEffect, useState } from 'react';
import SideBar from '../SideBar';
import { Input } from '../../../Components/UsedInputs';
import { Message, Select } from '../../../Components/UsedInputs';
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import { ImUpload } from 'react-icons/im';
import Uploder from '../../../Components/Uploder';
import CastsModal from '../../../Components/Modals/CastsModal';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { movieValidation } from '../../../Components/Validation/MovieValidation';
import { createMovieAction, removeCastAction } from '../../../Redux/Actions/MoviesActions';
import { toast } from 'react-toastify';
import { InlineError } from '../../../Components/Notfications/Error';
import { ImagePreview } from '../../../Components/ImagePreview';

function AddMovie() {
    const [modalOpen, setModalOpen] = useState(false);
    const [cast, setCast] = useState(null);
    const [imageWithoutTitle, setImageWithoutTitle] = useState("");
    const [imageTitle, setImageTitle] = useState("");
    const [videoUrl, setVideoUrl] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // use selectors
    const { categories } = useSelector((state) => state.categoryGetAll);
    const { isLoading, isError, isSuccess } = useSelector(
        (state) => state.createMovie
    );
    const { casts } = useSelector((state) => state.casts);

    // validate
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(movieValidation)
    });

    // Hàm kiểm tra link hợp lệ
    const isValidUrl = (url) => {
        const regex = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9\-_]+\.)+[a-zA-Z]{2,}\/?.*/;
        return regex.test(url);
    };

    // submit
    const onSubmit = (data) => {
        dispatch(createMovieAction({
            ...data,
            image: imageWithoutTitle,
            titleImage: imageTitle,
            video: videoUrl,
            casts,
        }));
    };

    // delete cast
    const deleteCastHandler = (id) => {
        dispatch(removeCastAction(id));
        toast.success("Cast deleted successfully");
    };

    // useEffect theo dõi trạng thái
    useEffect(() => {
        if (!modalOpen) {
            setCast();
        }
        if (isSuccess) {
            reset({
                name: "",
                time: 0,
                language: "",
                year: 0,
                category: "",
                desc: ""
            });
            setImageTitle("");
            setImageWithoutTitle("");
            setVideoUrl("");
            dispatch({ type: "CREATE_MOVIE_RESET" });
            navigate("/addMovie");
        }
        if (isError) {
            toast.error("Something went wrong");
            dispatch({ type: "CREATE_MOVIE_RESET" });
        }
    }, [modalOpen, isSuccess, isError, dispatch, reset, navigate]);

    return (
        <SideBar>
            <CastsModal modalOpen={modalOpen} setModalOpen={setModalOpen} cast={cast} />
            <div className="flex flex-col gap-6">
                <h2 className="text-xl font-bold">Thêm phim</h2>

                {/* Tên + Thời lượng */}
                <div className='w-full grid md:grid-cols-2 gap-6'>
                    <Input label="Tên phim" placeholder="Game of Thrones" type="text" bg={true} name="name" register={register("name")} />
                    {errors.name && <InlineError text={errors.name.message} />}

                    <Input label="Thời lượng" placeholder="2hr" type="number" bg={true} name="time" register={register("time")} />
                    {errors.time && <InlineError text={errors.time.message} />}
                </div>

                {/* Ngôn ngữ + Năm */}
                <div className='w-full grid md:grid-cols-2 gap-6'>
                    <Input label="Ngôn ngữ" placeholder="English" type="text" bg={true} name="language" register={register("language")} />
                    {errors.language && <InlineError text={errors.language.message} />}

                    <Input label="Năm phát hành" placeholder="2022" type="number" bg={true} name="year" register={register("year")} />
                    {errors.year && <InlineError text={errors.year.message} />}
                </div>

                {/* Ảnh */}
                <div className='w-full grid md:grid-cols-2 gap-6'>
                    <div className='flex flex-colo gap-2'>
                        <p className='text-border font-semibold text-sm'>Hình không có tiêu đề</p>
                        <Uploder setImageUrl={setImageWithoutTitle} />
                        <ImagePreview image={imageWithoutTitle} name="imageWithoutTitle" />
                    </div>
                    <div className='flex flex-colo gap-2'>
                        <p className='text-border font-semibold text-sm'>Hình có tiêu đề</p>
                        <Uploder setImageUrl={setImageTitle} />
                        <ImagePreview image={imageTitle} name="imageTitle" />
                    </div>
                </div>

                {/* Mô tả */}
                <div className="w-full">
                    <Message label="Mô tả" placeholder="Nội dung phim..." name="desc" register={{ ...register("desc") }} />
                    {errors.desc && <InlineError text={errors.desc.message} />}
                </div>

                {/* Thể loại */}
                <div className="text-sm w-full">
                    <Select label="Thể loại phim" options={categories?.length > 0 ? categories : []} name="category" register={{ ...register("category") }} />
                    {errors.category && <InlineError text={errors.category.message} />}
                </div>

                {/* Video */}
                <div className='w-full'>
                    <label className='text-border font-semibold text-sm'>Link nhúng video</label>
                    <Input
                        label=""
                        placeholder="https://..."
                        type="text"
                        bg={true}
                        name="video"
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                    />
                    {videoUrl && (
                        <>
                            {isValidUrl(videoUrl) ? (
                                <div className="w-full mt-4">
                                    <iframe
                                        src={videoUrl}
                                        title="Video Preview"
                                        className="w-full h-64 rounded"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            ) : (
                                <p className="text-red-600 mt-2 text-sm">❌ Link video không hợp lệ. Vui lòng nhập đúng URL!</p>
                            )}
                        </>
                    )}
                </div>

                {/* Diễn viên */}
                <div className="w-full grid lg:grid-cols-2 gap-6 items-start">
                    <button
                        onClick={() => setModalOpen(true)}
                        className="w-full py-4 bg-subMain text-white border-2 border-dashed border-white rounded-xl hover:bg-opacity-90 transition-all duration-300"
                    >
                        + Thêm diễn viên
                    </button>

                    <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols-2 gap-4">
                        {casts?.length > 0 &&
                            casts.map((user) => (
                                <div
                                    key={user.id}
                                    className="p-3 text-center rounded-xl bg-main border border-border shadow-md flex flex-col items-center gap-3"
                                >
                                    <img
                                        src={user.image || "https://res.cloudinary.com/dwfmpiozq/image/upload/v1730567122/Logo_m2ooop.png"}
                                        alt={user.name}
                                        className="w-20 h-20 object-cover rounded-full border border-subMain shadow-sm"
                                    />
                                    <p className="text-sm font-semibold truncate">{user.name}</p>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => deleteCastHandler(user.id)}
                                            title="Xóa"
                                            className="w-8 h-8 flex items-center justify-center bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                                        >
                                            <MdDelete size={16} />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setCast(user);
                                                setModalOpen(true);
                                            }}
                                            title="Sửa"
                                            className="w-8 h-8 flex items-center justify-center bg-green-100 text-green-600 rounded-full hover:bg-green-200"
                                        >
                                            <FaEdit size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>


                {/* Submit */}
                <button
                    disabled={isLoading}
                    onClick={handleSubmit(onSubmit)}
                    className="bg-subMain w-full flex-rows gap-6 font-medium text-white py-4 rounded"
                >
                    {isLoading ? "Vui lòng chờ ..." : <><ImUpload /> Đăng tải phim</>}
                </button>
            </div>
        </SideBar>
    );
}

export default AddMovie;
