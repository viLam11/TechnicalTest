import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { faImages } from "@fortawesome/free-regular-svg-icons";

export default function Sidebar() {
    return(
        <div className="bg-white md:w-48 sm:w-0 sticky h-full min-h-screen">
            <div className="logo">
                <img src="https://geekup.vn/Icons/gu-logo-general.png" alt="GeekUp-logo" className="p-4" />
            </div>
            <div className="menu space-y-2">
                <div className="hover:bg-blue-50 hover:text-blue-700 pl-14 rounded-lg m-2 p-2 bg-green-50">
                    <span>
                        <FontAwesomeIcon icon={faImages} />
                    </span>  Albums
                </div>
                <div className="hover:bg-blue-50 hover:text-blue-700 pl-14 rounded-lg m-2 p-2 bg-green-50">
                    <span>
                    <FontAwesomeIcon icon={faAddressCard} />
                    </span>  Users
                </div>
            </div>

            
        </div>
    )
}