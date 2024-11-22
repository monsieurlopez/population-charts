function Header() {
    return (
        <header id='header' className="position-fixed top-0 w-100 z-index-999 bg-secondary" style={{ height: '70px' }}>
            <div className='text-center'>
                <p className='text-white fs-1 me-4'> <strong>Population Charts</strong></p>
            </div>
        </header>
    );
}

export default Header;