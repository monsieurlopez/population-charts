import phone_rotation from './assets/phone_rotation.png';

const RotateDevice = () => {
    return (
        <>
            <div className="information-img" style={{width: '100%'}}>
                    <p> You must rotate the device to see the graph </p>
                    <img src={phone_rotation} alt="phone_rotation" className='img-fluid'/>
            </div>
        </>
    );
};

export default RotateDevice;
