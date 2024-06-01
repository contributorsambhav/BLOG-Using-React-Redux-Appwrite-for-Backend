import React from 'react';
import { Container, Logo, LogoutBtn } from '../index';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { modeToggle } from '../../store/themeSlice';
import dark from '../SVGs/darkmode.svg'
import light from '../SVGs/lightmode.svg'

function Header() {
  const themeMode = useSelector((state) => state.themeMode.theme);
  const authStatus = useSelector((state) => state.auth.status);
  const activeUser = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
    { name: 'Sign Up', slug: '/signup', active: !authStatus },
    { name: 'My Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ];

  return (
    <header className='py-3 shadow bg-green-700 dark:bg-gray-900'>
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
                fill='white'
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
          {activeUser && (
            <div className='text-white text-balance text-3xl dark:text-gray-100'>
              {activeUser.name}
            </div>
          )}

          <ul className={`flex-col md:flex-row md:flex ml-auto ${isMobileMenuOpen ? 'flex' : 'hidden'} md:flex`}>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className='md:inline-block'>
                  <button
                    onClick={() => navigate(item.slug)}
                    className='text-2xl block px-8 py-2 duration-200 hover:bg-blue-500 dark:hover:bg-gray-700 rounded-full text-white dark:text-gray-100'
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li className='text-white dark:text-gray-100 inline-block px-8 text-xl py-2 duration-200 hover:bg-red-500 hover:text-gray-100 rounded-full'>
                <LogoutBtn />
              </li>
            )}
            <li className='text-white bg-inline-block px-8 text-2xl py-2 hover:duration-200 hover:bg-slate-700 hover:text-white dark:hover:bg-gray-700 rounded-full dark:text-gray-100'>
              {themeMode == 'dark' ? (<button onClick={handleToggle}>
                <img className="mt-1" src={light} alt="" />
              </button>) : (<button onClick={handleToggle}>
                <img className="mt-2" src={dark} alt="" />
              </button>)}

            </li>

          </ul>
        </nav>

      </Container>
    </header>
  );
}

export default Header;
