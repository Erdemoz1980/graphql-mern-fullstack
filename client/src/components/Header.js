import logo from './assets/logo.png';

const Header = () => {
  return (
    <nav className="navbar bg-dark mb-3 p-0">
      <div className='container'>
        <a className='navbar-brand p-3' href='/'>
          <div className='d-flex'>
            <img src={logo} alt='logo' />
            <div>PrjctMgmt</div>
          </div>
        </a>
      </div>
    </nav>
  )
}

export default Header