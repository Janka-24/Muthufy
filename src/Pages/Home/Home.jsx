import { useState } from "react"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from '../../db/firebase'
import { Navigate } from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';

const notify = () => toast('Here is your toast.');

export default function Home({ user }) {

    const [isSignUpActive, setIsSignUpActive] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleFormChange = () => {
        setIsSignUpActive(!isSignUpActive)
    }

    const handleSignUp = (event) => {
        event.preventDefault();
        if (!email || !password) return;
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                toast.success('Compte créé avec succès !');
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                if (errorCode === "auth/email-already-in-use") {
                    toast.error("Cet email est déjà utilisé par un autre compte.");
                } else if (errorCode === "auth/weak-password") {
                    toast.error("Votre mot de passe n'est pas assez robuste.");
                } else if (errorCode === "auth/invalid-email") {
                    toast.error("L'email saisi n'est pas valide.");
                } else {
                    toast.error("Une erreur s'est produite lors de la création du compte.");
                }
            })
    }


    const handleSignIn = (event) => {
        event.preventDefault();
        if (!email || !password) return;
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                toast.success('Connecté !');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode, errorMessage);
                if (errorCode === "auth/user-not-found") {
                    toast.error("Aucun utilisateur trouvé avec cet email.");
                } else if (errorCode === "auth/invalid-credential") {
                    toast.error("Vos informations sont incorrect");
                } else {
                    toast.error("Une erreur s'est produite lors de la connexion.");
                }
            })
    }


    const handleEmailChange = (event) => setEmail(event.target.value);
    const handlePasswordChange = (event) => setPassword(event.target.value);


    if (user) {
        return <Navigate to="/dashboard"></Navigate>
    }
    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="flex items-center justify-center min-h-screen">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {isSignUpActive && <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-zinc-50">
                        Login
                    </h2>}

                    {!isSignUpActive && <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-zinc-50">
                        Inscription
                    </h2>}
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-zinc-50">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-zinc-950 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-950 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handleEmailChange}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-zinc-50">
                                    Mot de passe
                                </label>
                                {isSignUpActive && <div className="text-sm">
                                    <a href="#" className="font-semibold text-orange-600 hover:text-orange-500">
                                        Mot de passe oublié?
                                    </a>
                                </div>}

                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-zinc-950 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-950 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    onChange={handlePasswordChange}
                                />
                            </div>
                        </div>

                        {isSignUpActive && <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={handleSignIn}
                            >
                                Se connecter
                            </button>
                        </div>}

                        {!isSignUpActive && <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={handleSignUp}
                            >
                                Créer un compte
                            </button>
                        </div>}

                        {!isSignUpActive && <p className="mt-10 text-center text-sm text-gray-500">
                            Déja un compte?
                            <a href="#" onClick={handleFormChange} className="font-semibold leading-6 text-orange-700 hover:text-orange-900">
                                Se connecter
                            </a>
                        </p>
                        }


                        {isSignUpActive && <p className="mt-10 text-center text-sm text-gray-500">
                            Pas de compte ?
                            <a href="#" onClick={handleFormChange} className="font-semibold leading-6 text-orange-700 hover:text-orange-900">
                                Créer un compte
                            </a>
                        </p>}

                    </form>
                </div>
            </div>
        </>
    )
}