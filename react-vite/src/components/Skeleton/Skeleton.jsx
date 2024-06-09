import './Skeleton.css';


const Skeleton = () => {
    return (
        <div className="skeleton">
            <div className="subscription-container">
                <div className='skelenton-text-box'>
                    <div className="skeleton-text short-text"></div>
                    <div className="skeleton-text"></div>
                    <div className="skeleton-text short-text"></div>
                </div>
            </div>
           
            <div className="main-container">
                <div className="skeleton-box">
                    <div className='skelenton-head'>
                        <div className='skelenton-profile-img'></div>
                        <div className='skelenton-profile-detail'>
                            <div className="skeleton-text"></div>
                            <div className="skeleton-text"></div>
                        </div>
                    </div>
                    <div className='skelenton-text-container'>
                        <div className="skeleton-text"></div>
                        <div className="skeleton-text"></div>
                        <div className="skeleton-text short-text"></div>
                    </div>
                </div>

                <div className="skeleton-box">
                    <div className='skelenton-head'>
                        <div className='skelenton-profile-img'></div>
                        <div className='skelenton-profile-detail'>
                            <div className="skeleton-text"></div>
                            <div className="skeleton-text"></div>
                        </div>
                    </div>
                    <div className='skelenton-text-container'>
                        <div className="skeleton-text"></div>
                        <div className="skeleton-text"></div>
                        <div className="skeleton-text short-text "></div>
                    </div>
                </div>

                <div className="skeleton-box">
                    <div className='skelenton-head'>
                        <div className='skelenton-profile-img'></div>
                        <div className='skelenton-profile-detail'>
                            <div className="skeleton-text"></div>
                            <div className="skeleton-text"></div>
                        </div>
                    </div>
                    <div className='skelenton-text-container'>
                        <div className="skeleton-text"></div>
                        <div className="skeleton-text"></div>
                        <div className="skeleton-text short-text"></div>
                    </div>
                </div>

            </div>

            <div className='topics-container'>
                <div className='skelenton-title'></div>
                <div className='skelenton-text-container'>
                    <div className="skeleton-text"></div>
                    <div className="skeleton-text"></div>
                    <div className="skeleton-text"></div>
                </div>
            </div>
        </div>
    );
};

export default Skeleton;