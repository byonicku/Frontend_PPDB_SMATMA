import { faCheck, faClock, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./status_component.css";

const StatusComponent = ({ title, status, message }) => {
  return (
    <div className="container d-flex flex-column align-items-center text-center my-5">
        <div
            className={
                status === "success"
                    ? "bg-success my-2"
                    : status === "menunggu"
                    ? "bg-warning my-2"
                    : "bg-failed my-2"
            }
        >
            <FontAwesomeIcon
                icon={
                    status === "success"
                        ? faCheck
                        : status === "menunggu"
                        ? faClock
                        : faXmark
                }
                className={
                    status === "success"
                        ? "icon-success"
                        : status === "menunggu"
                        ? "icon-warning"
                        : "icon-failed"
                }
            />
        </div>
        <div style={{ maxWidth: "40%" }} className="mt-4">
            <h4>{title}</h4>
            <p>{message}</p>
        </div>
    </div>
  );
};

export default StatusComponent;
