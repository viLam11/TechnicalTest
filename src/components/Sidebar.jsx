import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { faImages } from "@fortawesome/free-regular-svg-icons";

export default function Sidebar({page}) {
    return( 
        <div className="bg-white md:w-48 sticky h-full min-h-screen text-sm">
            <div className="logo">
                <img src="https://geekup.vn/Icons/gu-logo-general.png" alt="GeekUp-logo" className="p-4" />
            </div>
            <div className="menu space-y-2 sm:hidden md:block">
                <div className={`${page === "album" ? "bg-blue-50 text-blue-700" : ""} pl-6 font-normal rounded-lg m-2 py-2`}>
                    <span>
                        <FontAwesomeIcon icon={faImages} />
                    </span>  Albums
                </div>
                <div className={`${page === "user" ? "bg-blue-50 text-blue-700" : ""} pl-6 font-normal rounded-lg m-2 py-2`}>
                    <span>
                    <FontAwesomeIcon icon={faAddressCard} />
                    </span>  Users
                </div>
            </div>

            
        </div>
    )
}