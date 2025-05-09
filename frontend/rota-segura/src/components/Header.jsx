import React from "react";

const Header = () => {
    return (
        <div>
            <header className="absolute z-50 ">
                <div className="bg-gray-100 rounded-bl-[12rem] w-[100vw] shadow-md max-sm:rounded-bl-[5rem] pl-4 ">
                    <div className='max-w-7xl mx-auto py-[120px] max-xl:max-w-3xl  max-md:max-w-[600px] ' >
                        <p className='max-w-[600px] font-title text-6xl tracking-widest'>Conectar mobilidade ativa <br /> <span className='text-2xl text-gray-600 tracking-wide'>com informações práticas em tempo real</span></p>
                        <div className='py-10 max-sm:py-3'>
                            {/* <button className='bg-central rounded-full px-11 py-4 shadow-md shadow-neutral-400 max-sm:px-7 max-sm:py-5'>Começar</button> */}
                        </div>
                    </div>
                </div>
            </header>
            
        </div>
    )
};

export default Header;
