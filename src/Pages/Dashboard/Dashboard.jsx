import { auth } from "../../db/firebase";
import { signOut } from "firebase/auth";


export default function Dashboard() {
    const handleSignOut = () => {
        signOut(auth)
            .then(() => console.log('deco bv'))
            .catch((error) => console.log(error))
    }
    return (
        <>
            <div className="flex items-center justify-center h-screen">
                <div className="max-w-md text-center lg:text-left">
                    <h2 className="text-3xl flex items-center justify-center font-bold tracking-tight text-white sm:text-4xl">
                        Dashboard
                    </h2>
                    <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                        <a
                            href="#"
                            className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            onClick={handleSignOut}
                        >
                            Se déconnecter
                        </a>
                        <a href="#" className="text-sm font-semibold leading-6 text-white">
                            Oe pas mal <span aria-hidden="true">→</span>
                        </a>
                    </div>
                </div>
            </div>
        </>
    )
}
