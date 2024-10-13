import React from 'react';
import MainModal from './MainModal';
import { Input } from '../UsedInputs';
import Uploder from '../Uploder';

function CastsModal({ modalOpen, setModalOpen, cast}) {
    return (
        <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <div className='inline-block sm-w-4/5 border border-border md:w-3/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl'>
                <h2 className='text-3xl font-bold'> {cast ? "Update Cast" : "Create Cast"}</h2>
                <form className='flex flex-col gap-6 text-left mt-6'>
                    <Input
                        label="Cast Name"
                        placeholder={cast ? cast.fullName : "John Doe"}
                        type="text"
                        bg={false}
                    />
                     <div className='flex flex-colo gap-2'>
                        <p className='text-border font-semibold text-sm'>
                            Cast Image
                        </p>
                        <Uploder/>
                        <div className='w-32 h-32 p-2 bg-main border border-border rounded'>
                            <img src={`${cast ? cast.image : "https://res.cloudinary.com/dwfmpiozq/image/upload/v1724864672/comics/irjukndtpzlz8j87mjsz.jpg"}`}
                             alt={cast?.fullName}
                             className='w-full h-full object-cover rounded'/>
                        </div>
                    </div>
                    <button
                        onClick={() => setModalOpen(false)}
                        className='w-full flex-colo gap-4 py-3 font-bold text-lg transitions hover:bg-dry rounded bg-subMain text-white'>
                        {cast ?  "Update Cast" : "Create Cast"}
                    </button>
                </form>
            </div>
        </MainModal>
    );
}

export default CastsModal;
