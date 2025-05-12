import React, { useEffect, useMemo, useState } from "react";
import Layout from "../Layout/Layout";
import Filters from "../Components/Filters";
import Movie from "../Components/Movie";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import Loader from "../Components/Notfications/Loader";
import { RiMovie2Line } from "react-icons/ri";
import { getAllMoviesAction } from "../Redux/Actions/MoviesActions";
import { LanguageData, RatesData, TimesData, YearData } from "../Data/FilterData";
import { useParams } from "react-router-dom";

function MoviesPage() {
  const { search } = useParams();
  const dispatch = useDispatch();
  const [category, setCategory] = useState({ title: "All Categories" });
  const [year, setYear] = useState(YearData[0]);
  const [times, setTimes] = useState(TimesData[0]);
  const [rates, setRates] = useState(RatesData[0]);
  const [language, setLanguage] = useState(LanguageData[0]);
  const sameClass = "text-white py-2 px-4 rounded-full font-semibold border-2 border-subMain hover:bg-subMain transition-all";

  // all movies
  const { isLoading, isError, movies, pages, page } = useSelector(
    (state) => state.getAllMovies
  );

  // get all categories
  const { categories } = useSelector((state) => state.categoryGetAll);

  // queries
  const queries = useMemo(() => {
    const query = {
      category: category?.title === "All Categories" ? "" : category?.title,
      // time: times?.title.replace(/\D/g, "") || "",
      language: language?.title === "Sort By Language" ? "" : language?.title,
      rate: rates?.title.replace(/\D/g, "") || "",
      search: search ? search : "",
    };

    return query;
  }, [category, language, rates, search]);

  // useEffect
  useEffect(() => {
    // errors
    if (isError) {
      toast.error(isError);
    }
    // get all movies
    dispatch(getAllMoviesAction(queries));
  }, [dispatch, isError, queries]);

  // pagination next and prev pages
  const nextPage = () => {
    dispatch(getAllMoviesAction({
      ...queries,
      pageNumber: page + 1
    }));
  };

  const prevPage = () => {
    dispatch(getAllMoviesAction({
      ...queries,
      pageNumber: page - 1
    }));
  };

  const datas = {
    categories: categories,
    category: category,
    setCategory: setCategory,
    language: language,
    setLanguage: setLanguage,
    rates: rates,
    setRates: setRates,
    times: times,
    setTimes: setTimes,
    year: year,
    setYear: setYear,
  };

  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-8">
        <Filters data={datas} />
        {/* <p className="text-lg font-medium my-6">
          Total <span className="font-bold text-subMain">
            {movies ? movies?.length : 0}
          </span>{" "}
          items found {search && `for "${search}"`}
        </p> */}
        {
          isLoading ? (
            <div className="w-full gap-6 flex-col min-h-screen">
              <Loader />
            </div>
          )
            :
            movies?.length > 0 ? (
              <>
                <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                  {movies.map((movie, index) => (
                    <Movie key={index} movie={movie} />
                  ))}
                </div>

                {/* Loading more */}
                <div className="w-full flex justify-center gap-4 my-10">
                  {/* Previous */}
                  <button
                    onClick={prevPage}
                    disabled={page === 1}
                    className={`
      flex items-center
      px-5 py-2
      bg-subMain text-white
      rounded-full
      shadow-md
      disabled:opacity-50 disabled:cursor-not-allowed
      hover:shadow-lg hover:bg-subMain/90
      transition
    `}
                  >
                    <TbPlayerTrackPrev className="mr-2 text-lg" />
                    Trang trước
                  </button>

                  {/* Next */}
                  <button
                    onClick={nextPage}
                    disabled={page === pages}
                    className={`
      flex items-center
      px-5 py-2
      bg-subMain text-white
      rounded-full
      shadow-md
      disabled:opacity-50 disabled:cursor-not-allowed
      hover:shadow-lg hover:bg-subMain/90
      transition
    `}
                  >
                    Trang sau
                    <TbPlayerTrackNext className="ml-2 text-lg" />
                  </button>
                </div>

              </>
            ) :
              (
                <div className="w-full min-h-[50vh] flex flex-col justify-center items-center gap-4">
                  {/* Icon lớn trong vòng tròn */}
                  <div className="flex justify-center items-center w-32 h-32 rounded-full bg-gray-200 text-subMain text-5xl">
                    <RiMovie2Line />
                  </div>

                  {/* Thông điệp chính */}
                  <h2 className="text-2xl font-semibold text-white">
                    Oops! Không tìm thấy phim nào
                  </h2>

                  {/* Thông điệp phụ */}
                  <p className="text-gray-400 text-center max-w-md">
                    Rất tiếc, chúng tôi không thể tìm thấy bất kỳ bộ phim nào khớp với bộ lọc của bạn.
                    Hãy thử thay đổi thể loại hoặc xóa bộ lọc tìm kiếm.
                  </p>
                </div>
              )}

    
      </div>
    </Layout>
  );
}

export default MoviesPage;
