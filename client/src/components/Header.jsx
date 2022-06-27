import logoRT from './assets/rt_logo_x.png';

export default function Header() {
  return (
    <nav className='navbar bg-light mb-4 p-0'>
        <div className="container">
            <a className="navbar-brand" href="/">
                <div className="d-flex">
                    <img src={logoRT} alt='logo' className="mr-2"/>
                    <div><strong>RT_Project Managenent</strong></div>
                </div>
            </a>
        </div>
    </nav>
  )
}
