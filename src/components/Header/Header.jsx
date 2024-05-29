import React from 'react'
import {Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import {useSelector , useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { modeToggle } from '../../store/themeSlice'; 

function Header() {
  const themeMode = useSelector((state) => state.themeMode.theme);
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    document.querySelector('html').classList.remove('light', 'dark');
    document.querySelector('html').classList.add(themeMode);
  }, [themeMode]);


  const handleToggle = () => {
    dispatch(modeToggle());
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ];


  return (
    <header className='py-3 shadow bg-blue-200 border-1 border-black dark:bg-gray-900'>
      <Container>
        <nav className='flex items-center justify-between'>
          <div className='mr-4'>
            <Link to='/'>
              <Logo width='70px' />
            </Link>
          </div>
          <div className='flex md:hidden'>
            <button
              onClick={toggleMobileMenu}
              className='text-gray-700 dark:text-gray-200'
            >
              <svg
                className='w-6 h-6'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d={isMobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
                />
              </svg>
            </button>
          </div>
          <ul className={`flex-col md:flex-row md:flex ml-auto ${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex`}>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className='md:inline-block'>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='text-2xl block px-6 py-2 duration-200 hover:bg-blue-500 dark:hover:bg-gray-700 rounded-full text-gray-100'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            <li className='inline-block px-6 text-2xl py-2 hover:duration-5000 hover:bg-blue-500 dark:hover:bg-gray-700 rounded-full text-gray-100'>
              <button onClick={handleToggle}>Toggle</button>
            </li>
            {authStatus && (
              <li className='inline-block px-6 text-xl py-2 duration-500 hover:bg-blue-400 dark:hover:bg-gray-700 rounded-full text-white'>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;