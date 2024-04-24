import { useState, useEffect } from 'react';
import { auth } from "../../db/firebase";
import { signOut } from "firebase/auth";
import toast, { Toaster } from 'react-hot-toast';

export default function Dashboard() {

    const [userEmail, setUserEmail] = useState(null);


    useEffect(() => {

        toast('Vannakam bro!', {
            icon: '🙏🏽',
            style: {
                borderRadius: '5px',
                background: '#171717',
                color: '#fff',
            },
        });


        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUserEmail(user.email);
            } else {
                setUserEmail(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleSignOut = () => {
        signOut(auth)
            .then(() => console.log('déconnexion réussie'))
            .catch((error) => console.log(error))
    }

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="flex flex-col h-screen">
                <div className="flex items-start justify-start p-8">
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                        Dashboard
                    </h2>
                </div>
                <div className="flex-grow flex flex-col items-center justify-center">
                    <p className="text-xl sm:text-lg font-semibold leading-6 text-white">
                        Salut 👋🏽 {userEmail}
                    </p>
                    <p className="text-sm font-semibold leading-6 text-neutral-500">
                        Le site est en construction brother
                    </p>
                </div>
                <div className="flex justify-end p-8">
                    <button
                        className="rounded-md bg-white px-4 py-2 text-base sm:text-lg font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        onClick={handleSignOut}
                    >
                        Se déconnecter
                    </button>
                </div>
            </div>
        </>
    )
}
