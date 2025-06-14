import React, { useEffect  } from 'react'; // Import useState
import Titles from '../Titles';
import { Message, Select } from '../UsedInputs';
import Rating from '../Home/Stars';
import { BsBookmarkStarFill } from 'react-icons/bs';
import { Empty } from '../Notfications/Empty';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ReviewValidation } from '../Validation/MovieValidation';
import toast from 'react-hot-toast';
import { InlineError } from '../Notfications/Error';
import { Link } from 'react-router-dom';
import { reviewMovieAction } from '../../Redux/Actions/MoviesActions';
const Ratings = [
  { title: "0 - Quá tệ 🤢",        value: 0 },
  { title: "1 - Hơn mỗi chữ tệ  🥱",      value: 1 },
  { title: "2 - Cũng cũng 😏",         value: 2 },
  { title: "3 - Đáng để thử 🤤",     value: 3 },
  { title: "4 - Thua mỗi 5 sao 🔥", value: 4 },
  { title: "5 - Đỉnh nóc kịch trần  💯",     value: 5 },
];

function MovieRates({ movie }) {
    const dispatch = useDispatch();
    // user Selector
    const { isLoading, isError } = useSelector((state) => state.createReview);
    const { userInfo } = useSelector((state) => state.userLogin);

    // Validate user
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(ReviewValidation)
    });

    // On submit
    const onSubmit = (data) => {
        dispatch(reviewMovieAction({
            id:movie?._id ,
            review: {...data},
        }));
    };

    useEffect(() => {
        if (isError) {
            toast.error(isError);
            dispatch({ type: "CREATE_REVIEW_RESET" });
        }
    }, [isError, dispatch]);


    return (
        <div className='my-12'>
            <Titles title="Reviews" Icon={BsBookmarkStarFill} />
            <div className="mt-10 xl:grid flex-colo grid-cols-5 gap-12 bg-dry xs:p-10 py-10 px-2 sm:p-20 rounded">
                {/* Write review */}
                <form onSubmit={handleSubmit(onSubmit)} className="xl:col-span-2 w-full flex flex-col gap-8">
                    <h3 className="text-xl text-text font-semibold">
                        Review "{movie?.name}"
                    </h3>
                    <p className="text-sm leading-7 font-medium text-border">
                        Hãy cảm nhận bộ phim bạn đã xem nào </p>
                    <div className="text-sm w-full">
                        <Select
                            label="Chọn đánh giá"
                            options={Ratings}
                            name="rating"
                            register={{ ...register("rating") }}
                        />
                        {errors.rating && <InlineError text={errors.rating.message} />}

                        <div className="flex mt-4 text-lg gap-2 text-star">
                            <Rating value={watch("rating", false)} />
                        </div>

                    </div>
                    {/* Message */}
                    <div className='w-full'>
                        <Message
                            name="comment"
                            register={{ ...register("comment") }}
                            label="Message"
                            placeholder=" .................." />
                        {errors.comment && <InlineError text={errors.comment.message} />}

                    </div>

                    {/* Submit */}
                    {userInfo ? (
                        <button
                        disabled={isLoading}
                            type="submit"
                            className="bg-subMain text-white py-4 w-full flex-colo rounded"
                        >
                            {
                                isLoading ? "Đang tải..." : "Đăng"
                            }
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="bg-main border border-dashed border-border text-subMain py-4 w-full flex-colo rounded"
                        >
                            Hãy đăng nhập bạn mới có thể đánh giá
                        </Link>
                    )}

                </form>

                {/* Reviews */}
                <div className="col-span-3 w-full flex flex-col gap-6">
                    <h3 className="text-xl text-text font-semibold">Danh sách bình luận  ({movie?.numberOfReviews})</h3>
                    <div className="w-full flex flex-col bg-main gap-6 rounded-lg md:p-12 p-6 h-header overflow-y-scroll">
                        {
                            movie?.reviews?.length > 0 ? movie?.reviews?.map((review) => (
                                <div key={review?._id} className="md:grid flex flex-col w-full grid-cols-12 gap-6 bg-dry p-4 border border-gray-800 rounded-lg">
                                    <div className="col-span-2 bg-main hidden md:block">
                                        <img
                                            src={review?.userImage ? `${review.userImage} ` : "review.jpg"}
                                            alt={review?.userName}
                                            className="w-full h-24 rounded-lg object-cover"
                                        />
                                    </div>
                                    <div className="col-span-7 flex flex-col gap-2">
                                        <h2>{review?.userName}</h2>
                                        <p className="text-xs leading-6 font-medium text-text">
                                            {review?.comment}
                                        </p>
                                    </div>
                                    {/* Rates */}
                                    <div className="col-span-3 flex-rows border-l border-border text-xs gap-1 text-star">
                                        <Rating value={review?.rating} />
                                    </div>
                                </div>
                            )) : <Empty messsage={`Be first to rate "${movie?.name}"`} />


                        }

                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieRates;
