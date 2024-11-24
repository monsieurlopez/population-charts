function Header() {
    return (
        <header id="header" className="position-fixed top-0 w-100 bg-secondary-subtle" style={{ height: '60px' }}>
            <div className="text-center d-flex align-items-center justify-content-center">
                <p className="text-secondary fs-2 me-4 mb-0">
                    <strong>Population Charts</strong>
                </p>
                <img src="/logo_chartjs.svg" alt="Logo de ChartJS" className="img-fluid" style={{ width: '50px', height: 'auto' }} />
            </div>
        </header>
    );
}

export default Header;
