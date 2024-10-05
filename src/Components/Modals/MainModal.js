import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import {IoClose} from "react-icons/io5";

function MainModal ({modalOpen, setModalOpen, children}) {
    const cancelButtonRef = userRef()
    return (
        <>
        <Transition show={modalOpen} as={Fragment} appear>
            <Dialog 
            as="div" 
            className='fixed inset-0 z-30 overflow-y-auto text-center' 
            initialFocus={cancelButtonRef} 
            onClose={()=>setModalOpen(false)}
            >
                <div className='min-h-screen px-4'>
                    <Transition.child 
                    as={Fragment} 
                    enter="ease-out duration-300"
                    enterFrom="opacity-0" 
                    enterTo="opacity-100" 
                    leave="ease-in duration-200" 
                    leaveTo="opacity-0" 
                    leaveFrom="opacity-100 scale-100">
                        <Dialog.Overlay className="fixed inset-0 bg-black opacity-60"/>
                        
                    </Transition.child>
                    <span className='inline-block h-screen align-middle'aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.child 
                    as={Fragment} 
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95" 
                    enterTo="opacity-100 scale-100" 
                    leave="ease-in duration-200" 
                    leaveTo="opacity-0 scale-95" 
                    leaveFrom="opacity-100 scale-100"
                    >
                     {children}   
                    </Transition.child>
                    <div className='absolute right-5 top-5'>
                        <button 
                        onClick={() =>setModalOpen(false)} 
                        type ="button" 
                        className=' transitions w-10 h-10 flex-colo  text-base text-white bg-subMain rounded-full hover:bg-white hover:text-subMain'>
                            <IoClose/>
                        </button>
                    </div>
                </div>
            </Dialog>
        </Transition>
        </>
    )
}

export default MainModal;
