import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import UserButton from './UserButton';
import { UserContext } from '@/context/UserContext';
import { useContext } from 'react';

const Nav = () => {
    const {user, setUser} = useContext(UserContext);

    return (
        <nav className="bg-gray-100">
            <div className="flex justify-between items-center max-w-7xl mx-auto px-18 py-3">
                <div className='flex items-center gap-10'>
                    <Link to="/" >
                        <div className='flex items-center gap-2'>
                            <img src={logo} alt="Logo da Rota Segura" className='w-28 object-fill' />
                        </div>
                    </Link>
                    <Link to="/rota-segura/search" >
                        <div className='flex items-center gap-2 pt-3'>
                            <button className='bg-central cursor-pointer rounded-md mb-1 text-sm px-5 py-2 shadow-sm hover:opacity-95 hover:text-white shadow-neutral-600 max-xl:mt-10
                         max-xl:text-2xl max-sm:px-7 max-sm:py-5'>Buscar rotas</button>
                        </div>
                    </Link>
                </div>
                <UserButton user={user} setUser={setUser} />
            </div>
        </nav>
    )
};

export default Nav;
