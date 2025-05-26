import { Link } from 'react-router-dom';
import logo from '../assets/logo.png'
import UserButton from './UserButton';

const Nav = ({ user }) => {
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
                            <p className='font-title text-amber-950 border-b-2 border-b-central hover:border-b-amber-300'>Buscar rota</p>
                        </div>
                    </Link>
                </div>
                <UserButton user={user} />
            </div>
        </nav>
    )
};

export default Nav;
