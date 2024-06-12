import "./Spinner.css";


const Spinner = () => {
    return (
        <div className="spinner-container">
            <div className="loading-spinner">
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
            </div>
        </div>
    )
}

export default Spinner;