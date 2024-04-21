import logo from './../Assets/yaraa logo.png';
function Nav() {
    return (  
        <div className='nav'>
            <div className='left'>
                <img src={logo}></img>
            </div>
            <div className='right'>
                <p>Home</p>
                <button>HR Round</button>
            </div>
        </div>
    );
}

export default Nav;