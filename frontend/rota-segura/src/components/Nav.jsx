import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'

const Nav = () => {
    return (
        <nav className="bg-gray-100">
            <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-3">
                <div className='flex items-center gap-10'>
                    <Link to="/" >
                        <div className='flex items-center gap-2'>
                            <img src={logo} alt="Logo da Rota Segura" className='w-28 object-fill' />
                        </div>
                    </Link>
                    <Link to="/rota-segura/buscar" >
                        <div className='flex items-center gap-2 pt-3'>
                            <p className='font-title text-amber-950 border-b-2 border-b-central hover:border-b-amber-300'>Buscar rota</p>
                        </div>
                    </Link>
                </div>
                <Link to="/rota-segura/login">
                    <div className='flex items-center gap-1 border border-gray-200 rounded-full px-5 py-2 shadow-sm mb-1 bg-white max-sm:ml-10'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 text-gray-600">
                            <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                        </svg>
                        <p className='max-sm: truncate'></p>
                    </div>
                </Link>

            </div>
        </nav>
    )
};

export default Nav;
