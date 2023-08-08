import circle from "../assets/blur-circle.svg";
import logo62 from "../assets/logo6fire.png";
import { FcGoogle } from "react-icons/fc";
import LoadingAnimation from "../assets/loading.jsx";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase.config";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";

export default function HomePage({ handleUserSignIn }) {
  const [email, setEmail] = useState("");
  const [savedProducts, setSavedProducts] = useState([]);
  const [password, setPassword] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();

  async function getSavedProducts(user) {
    const ref = await doc(db, "users", `${user.uid}`);
    const docSnap = await getDoc(ref);

    if (docSnap.exists()) {
      const savedProducts = docSnap.data().savedProducts;
      return savedProducts;
    }
    return [];
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);
        const savedProducts = await getSavedProducts(user);
        setSavedProducts(savedProducts);
        handleUserSignIn(user);
        navigate("/import", { state: { savedProducts, currentUser } });
      } else {
        console.log(error);
      }
    });

    return unsubscribe;
  }, []);

  function signInGoogle() {
    return signInWithPopup(auth, provider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;

        handleUserSignIn(user);

        navigate("/import", { state: { savedProducts, currentUser } });
      })
      .catch((error) => {
        // Handle Errors here.
        console.log(error);
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  async function logIn(email, password) {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = credentials.user;

      handleUserSignIn(user);

      setCurrentUser(user);
      const savedProducts = await getSavedProducts(user);
      setSavedProducts(savedProducts);

      navigate("/import", { state: { savedProducts, currentUser } });
    } catch (error) {
      console.log("Login failed", error);
    }
  }

  const handleSubmit = async () => {
    try {
      await logIn(email, password);
    } catch (e) {
      setError("An error has occured. Double-check your information.");
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInGoogle();
    } catch (e) {
      setIsLoading(false);
      console.log(e);
      setError("An error has occured. Please try again.");
      return;
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center lg:px-[35vw] px-[1rem] gap-3 bg-gradient-to-b from-slate-950 to-[#181c2a] to-slate-950 text-white relative">
      <img
        loading="lazy"
        width="500"
        height="500"
        decoding="async"
        data-nimg="1"
        className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] blur-[15rem] opacity-40 "
        src={circle}
      ></img>

      <div className="flex items-center">
        <div className="pb-4">
          <img
            src={logo62}
            width={250}
            alt="Unleash Your Shopify Potential - Uncover Hidden Gems with Glitching Dropshipping Product Finder"
          />
        </div>
      </div>

      <div className="font-[800] text-3xl text-left mb-2">
        Connect Your Shop
      </div>
      <button
        onClick={() => {
          setIsLoading(true);
          handleGoogleLogin();
        }}
        className="z-20 text-md border-[1px] border-slate-800 transition-all ease-in 200 lg:hover:from-black flex flex-row gap-2 w-full rounded-[.4rem] shadow-md text-white p-3 text-md items-center justify-start pl-4 font-bold bg-gradient-to-br from-[#131620] to-[#1d2130]"
      >
        {" "}
        <FcGoogle className="text-3xl" />
        Continue with Google
      </button>

      <div className="flex flex-row justify-center items-center gap-2 mt-2">
        <div className="w-1/4 border-[1px] border-slate-300"></div>
        <div className="w-1/2 text-[.75rem] text-slate-400 font-bold text-center">
          Or Continue With Email
        </div>
        <div className="w-1/4 border-[1px] border-slate-300"></div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[.8rem] font-bold">Email address</label>
        <input
          onKeyDown={async (event) => {
            if (event.key === "Enter") {
              setIsLoading(true);
              handleSubmit();
            }
          }}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          value={email}
          type="email"
          className=" z-20 border-[1px] border-slate-800 rounded-[.4rem] shadow-md  p-1 outline-none bg-gradient-to-br from-[#252a41] to-[#383f61] text-slate-400"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[.8rem] font-bold">Password</label>
        <input
          onKeyDown={async (event) => {
            if (event.key === "Enter") {
              setIsLoading(true);
              handleSubmit();
            }
          }}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          type="password"
          className=" z-20 border-[1px] border-slate-800 rounded-[.4rem] shadow-md  p-1 outline-none bg-gradient-to-br from-[#252a41] to-[#383f61] text-slate-400"
        />
      </div>

      <button
        className="z-20 transition-all ease-in-out 100 lg:hover:bg-blue-800 bg-blue-700 flex flex-row gap-3 w-full text-white py-2 rounded-[.4rem] items-center justify-center text-md font-bold mt-5  shadow-md"
        onClick={() => {
          setIsLoading(true);
          handleSubmit();
        }}
      >
        {" "}
        Continue with email
        {isLoading ? <LoadingAnimation /> : ""}
      </button>
    </div>
  );
}
