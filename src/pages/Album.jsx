import Sidebar from "../components/Sidebar";

export default function Album() {   
    return(
       <div className="min-h-screen bg-gray-400">
            <div className="flex flex-row">
                <Sidebar />
                <div className="bg-gray-100 w-full">
                    <div className="bg-white h-16 mb-10"></div>
                    THIS IS
                </div>
            </div>
       </div>
    )

}