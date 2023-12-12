import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './status_component.css';

const StatusComponent = ({ title, message }) => {
    return (
        <div className="container d-flex flex-column align-items-center text-center my-5">
            <div className="bg-success my-2">
                <FontAwesomeIcon icon={faCheck} style={{ color: '#0CA41B', fontSize: '6rem' }} />
            </div>
            <div style={{ maxWidth: '25%' }} className="mt-4">
                <h4>
                    {title}
                </h4>
                <p>
                    {message}
                </p>
            </div>
        </div>
    );
};

export default StatusComponent;
