import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'

const Nav = ({ user }) => {
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
                <Link to={ user ? "rota-segura/profile" : "/rota-segura/login"}>
                    <div className='flex items-center gap-1 border overflow-y-hidden hover:bg-gray-50  rounded-full max-w-30 h-10 grow shadow-sm mb-1 px-2 bg-white max-sm:ml-10'>
                        {user ? (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-13 w-10 ml-1 text-gray-600">
                                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                                </svg>
                                <p className='truncate text-sm'>{user.name}</p>
                            </>
                        ) : (
                            <>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-13 w-6 ml-1 text-gray-600">
                                    <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
                                </svg>
                                <p className='text-sm'>Entrar</p>
                            </>
                        )}

                    </div>
                </Link>

            </div>
        </nav>
    )
};

export default Nav;
