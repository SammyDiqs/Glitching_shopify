import logo62 from "../assets/logo6fire.png";
import mystery from "../assets/mystery.svg";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Toast } from "@shopify/app-bridge-react";
import { useAppQuery, useAuthenticatedFetch } from "../hooks";
import { useTranslation } from "react-i18next";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase.config";
import { doc, getDoc, onSnapshot} from "firebase/firestore";
import {FaShopify} from "react-icons/fa"

import "firebase/firestore";

export default function Glitchingproducts() {
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState();
  //const initialState = location?.state?.savedProducts || JSON.parse(localStorage.getItem('savedProducts')) || [];
  const { t } = useTranslation();
  const emptyToastProps = { content: null };
  const [isLoading, setIsLoading] = useState(true);
  const [loadingStatus, setLoadingStatus] = useState({});

  const [toastProps, setToastProps] = useState(emptyToastProps);
  const fetch = useAuthenticatedFetch();
  const [savedProducts, setSavedProducts] = useState([]);


  function getSavedProducts(user) {
    const ref = doc(db, "users", `${user.uid}`);
  
    onSnapshot(ref, (docSnap) => {
      if (docSnap.exists()) {
        const savedProducts = docSnap.data().savedProducts;
        setSavedProducts(savedProducts);  // use setSavedProducts() directly
      }
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        getSavedProducts(user);  // Call getSavedProducts() directly without await
        console.log(user);
      } else {
        console.log("User is not logged in"); 
      }
    });
  
    return unsubscribe;
  }, []);
  





  const toastMarkup = toastProps.content && (
    <Toast {...toastProps} onDismiss={() => setToastProps(emptyToastProps)} />
  );

  function trimString(s) {
    if (s.length > 30) {
      return s.substring(0, 30) + "...";
    } else {
      return s;
    }
  }

  const handleImport = async (index, title, price, description, image_url) => {
    //console.log("Importing product with title:", title, "and price:", price);
    setLoadingStatus((prev) => ({ ...prev, [index]: true }));

    setIsLoading(true);

    const response = await fetch("/api/products/import", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, price, description, image_url }),
    });

    const responseData = await response.json();
    console.log(responseData);

    if (response.ok) {
      setLoadingStatus((prev) => ({ ...prev, [index]: false }));
      setToastProps({
        content: t("You have imported your product!", {}),
      });
      setIsLoading(false);
    } else {
      setLoadingStatus((prev) => ({ ...prev, [index]: false }));
      setToastProps({
        content: t("There was an error importing your product..."),
        error: true,
      });
      setLoadingProductId(null);
    }
  };

  return (
    <div className="w-full min-h-screen  bg-slate-950 flex flex-col items-center gap-5 lg:gap-5 p-5 lg:p-8 lg:py-10 lg:pb-0 text-slate-400 overflow-auto overflow-x-hidden relative pb-16">
      {toastMarkup}

      <div className="flex items-center">
        <img
          src={logo62}
          width={400}
          alt="Unleash Your Shopify Potential - Uncover Hidden Gems with Glitching Dropshipping Product Finder"
        />
      </div>

      <div className="fade w-full flex flex-col items-start border-[1px] border-slate-800 rounded-[.6rem] px-5 py-5 z-20 bg-gradient-to-br from-[#131620] via-slate-950 to-slate-950 lg:px-8 lg:py-8 mb-8">
        <div className="w-full flex flex-row flex-wrap  gap-8">
          {savedProducts.map((product, index) => {
            //console.log("Product data:", product);
            let priceAsString;

            if (product.currencyAmount) {
              priceAsString = product.currencyAmount.toString();
            } else if (product.productPrice) {
              priceAsString = product.productPrice;
            } else {
              console.error("No valid price fiel found for product");
            }

            let imageUrl =
              product.landingImage ||
              `https://www.glitching.ai/v2-g-images/image${product.index}.jpg`;

            return (
              <div
                key={product.id}
                onClick={() =>
                  handleImport(
                    index,
                    product.productName,
                    priceAsString,
                    product.productDescription,
                    imageUrl
                  )
                }
                className="z-20 overflow-hidden w-full lg:w-[22%] rounded-[.4rem] shadow-xl bg-gradient-to-b from-[#131620] to-transparent border-[1px] border-slate-800 relative fade-p1 flex flex-col items-center transition-transform ease-in 200 lg:hover:border-blue-700 lg:hover:-translate-y-1 cursor-pointer"
              >
                <div className="w-full h-40 relative">
                  {" "}
                  {/* <-- This is your image container with a fixed height */}
                  <img
                    loading="lazy"
                    decoding="async"
                    data-nimg="1"
                    className="absolute w-full h-full object-cover"
                    src={
                      product.landingImage ||
                      `https://www.glitching.ai/v2-g-images/image${product.index}.jpg`
                    }
                    alt="placeholder"
                  />
                </div>

                <div className="p-3 flex flex-col gap-3">
                  <a className="font-bold h-[2.5rem] overflow-hidden flex items-center justify-center text-center text-[1em] lg:text-[.8rem]">
                    {trimString(product.productName)}
                  </a>
                </div>

                <button
               
                  className="bg-black  font-bold absolute top-2 right-2 text-white text-[.8rem] p-1 rounded-[.4rem]  flex items-center gap-1 justify-center z-20 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                  }}
                  disabled={loadingStatus[index]}
                >
                   <FaShopify/>
                  {loadingStatus[index] ? "Importing..." : "Import"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
