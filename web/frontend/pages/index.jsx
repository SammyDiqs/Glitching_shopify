import circle from "../assets/blur-circle.svg";
import logo62 from "../assets/logo6fire.png";
import { FcGoogle } from "react-icons/fc";

import { useContext, useState, useEffect } from "react";

//import { useRouter } from "next/router";
import { auth, db } from "../firebase.config";
import {
	signInWithEmailAndPassword,
/* 	createUserWithEmailAndPassword,
	signOut,
	query,
	where,
	collection,
	onAuthStateChanged,
	GoogleAuthProvider,
	signInWithPopup,
	sendEmailVerification,
	sendPasswordResetEmail, */
} from "firebase/auth";
//import { doc, getDoc } from "firebase/firestore"; 

export default function HomePage() {
	const [email, setEmail] = useState();
	const [password, setPassword] = useState();
	const [currentUser, setCurrentUser] = useState(null);
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);
	//const { logIn, signInGoogle } = useAuth();

	 function logIn(email, password) {
		return signInWithEmailAndPassword(auth, email, password).then(() => {
			const user = auth.currentUser;

			setCurrentUser(user);

			// router.push('/GlitchingProds');

			console.log(user);

			return;
		});
	} 

	const handleSubmit = async () => {
		try {
			await logIn(email, password);
		} catch (e) {
			setError("An error has occured. Double-check your information.");
			setIsLoading(false);
		}
	};

/* 	const handleGoogleLogin = async () => {
		try {
			await signInGoogle();
		} catch (e) {
			setIsLoading(false);
			console.log(e);
			setError("An error has occured. Please try again.");
			return;
		}
	}; */

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
			</button>
		</div>

		/* <Page narrowWidth>
      <TitleBar title={t("HomePage.title")} primaryAction={null} />
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <Stack
              wrap={false}
              spacing="extraTight"
              distribution="trailing"
              alignment="center"
            >
              <Stack.Item fill>
                <TextContainer spacing="loose">
                  <Text as="h2" variant="headingMd">
                    {t("HomePage.heading")}
                  </Text>
                  <p>
                    <Trans
                      i18nKey="HomePage.yourAppIsReadyToExplore"
                      components={{
                        PolarisLink: (
                          <Link url="https://polaris.shopify.com/" external />
                        ),
                        AdminApiLink: (
                          <Link
                            url="https://shopify.dev/api/admin-graphql"
                            external
                          />
                        ),
                        AppBridgeLink: (
                          <Link
                            url="https://shopify.dev/apps/tools/app-bridge"
                            external
                          />
                        ),
                      }}
                    />
                  </p>
                  <p>{t("HomePage.startPopulatingYourApp")}</p>
                  <p>
                    <Trans
                      i18nKey="HomePage.learnMore"
                      components={{
                        ShopifyTutorialLink: (
                          <Link
                            url="https://shopify.dev/apps/getting-started/add-functionality"
                            external
                          />
                        ),
                      }}
                    />
                  </p>
                </TextContainer>
              </Stack.Item>
              <Stack.Item>
                <div style={{ padding: "0 20px" }}>
                  <Image
                    source={trophyImage}
                    alt={t("HomePage.trophyAltText")}
                    width={120}
                  />
                </div>
              </Stack.Item>
            </Stack>
          </Card>
        </Layout.Section>
        <Layout.Section>
          <ProductsCard />
          <ImportCard />
        </Layout.Section>
      </Layout>
    </Page> */
	);
}

/*  const MyPage = () => {
	useEffect(() => {
		setTimeout(() => {
			window.location.href = "http://localhost:3000";
		}, 3000);
	}, []);

	return (
		
		<div
			class="page"
			style={{
				height: "100vh",
				width: "100%",
			}}
		>
			<Page>
				<VerticalStack gap="5">
					<div className="text-color text-large">Loading App...</div>
					<Spinner
						size="large"
						color="teal"
						accessibilityLabel="Spinner example"
					/>
					<div className="text-color text-small">Helping you escape the matrix</div>
				</VerticalStack>
			</Page>
		</div>
		
	);
	
};




export default MyPage;   
 */
