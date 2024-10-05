import React from 'react';
import MainModal from './MainModal';
import { HiPlusCircle } from 'react-icons/hi';
import { Input } from '../UsedInputs';

function CategoryModal ({modalOpen, setModalOpen})  {
    return (
        <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
            <div className='inline-block sm-w-4/5 border border-border md:w-3/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl'>
            <h2 className='text-3xl font-bold'> Create</h2>
            <form className='flex flex-col gap-6 text-left mt-6'>
            <Input 
                    label="Category Name" 
                    placeholder="Action"
                    type="text"
                    bg={false}
                />
                <button 
                onClick={()=> setModalOpen(false)}
                className='w-full flex-rows gap-4 py-3 text-lg transition hover:bg-dry border-2 border-subMian rounded bg-subMain text-white'></button>
                <HiPlusCircle/>Add
            </form>
            </div>
        </MainModal>
    )
}

export default CategoryModal;
