import React from 'react'
import Layout from '../Layout/Layout'
import Head from '../Components/Head'

function AboutUs() {
    return(
        <Layout>
            <div className='min-height-screen container mx-auto px-2 my-6'>
                <Head title="About Us"/>
                <div className="xl:py-20 py-10 px-4">
                    <div className="grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center">
                        <div>
                            <h3 className="text-xl lg:text-3xl mb-4 font-semibold">
                               CHÀO MỪNG ĐẾN VỚI DVP 
                            </h3>
                            <div className='mt-3 test-sm leading-8 text-text'>
                            <p>
                            DVP là một nền tảng xem phim trực tuyến hiện đại, mang đến cho người dùng trải nghiệm giải trí tuyệt vời với hàng nghìn bộ phim, chương trình truyền hình và video chất lượng cao. Với giao diện dễ sử dụng, DVP cho phép người dùng tìm kiếm và xem phim mọi lúc, mọi nơi trên nhiều thiết bị khác nhau, từ máy tính đến điện thoại di động. Nền tảng hỗ trợ nhiều thể loại phim từ hành động, hài, kịch tính đến các bộ phim tài liệu, phim hoạt hình, đáp ứng đa dạng sở thích của người xem. DVP không chỉ cung cấp các bộ phim mới nhất mà còn lưu trữ kho tàng phim cũ, giúp người xem dễ dàng tìm lại những bộ phim yêu thích. Với chất lượng video sắc nét, âm thanh sống động, DVP cam kết mang đến trải nghiệm xem phim trực tuyến tuyệt vời nhất cho mọi người.
                            </p>
                        
                        </div>
                        <div className="grid md:grid-cols-2 gap-6 mt-8">
                          <div className="p-8 bg-dry rounded-lg">
                            <span className="text-3xl block font-extrabold">10K+</span>
                            <h4 className='text-lg font-semibold mb-2'>List Movies</h4>
                            <p className="mb-0 text-text leading-7 text-sm">
                              
                            </p>
                          </div>
                          <div className="p-8 bg-dry rounded-lg">
                            <span className="text-3xl block font-extrabold">8K</span>
                            <h4 className='text-lg font-semibold mb-2'>Lovely Users</h4>
                            <p className="mb-0 text-text leading-7 text-sm">
                              
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-10 lg:mt-0">
                        <img 
                          src="https://res.cloudinary.com/dwfmpiozq/image/upload/v1727195281/Android_Collage_1920_vyw2zz.jpg"
                          alt="aboutus"
                          className="w-full xl:block hidden h-header rounded-lg object-cover"
                        />
                      </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default AboutUs