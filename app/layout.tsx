import './globals.css';
import '@/node_modules/react-modal-video/scss/modal-video.scss';
import Navbar from './components/Navbar/index';
import Footer from './components/Footer/index';
import Script from 'next/script'
import { SessionProvider } from "next-auth/react"
import Providers from './Providers';
import { AuthProvider } from '@/context/auth/AuthProvider';
import { RoomsProvider } from '@/context/rooms/RoomsProvider';

export const metadata = {
	title: 'Evolution Server - Season 3',
	description: 'Leaderboard for Evolution EDOPro Server',
	icons: {
		icon: '/logo.svg',
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<head>
				<Script src="https://las-analytics.vercel.app/script.js" data-website-id="d49d0638-0710-4b43-91c8-e887c1afb079"/>
				<Script type="text/javascript" id="clarity-script">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window,document,"clarity","script","iukdbfryb2");
          `}
        </Script>
			</head>
			<body>
				<Providers>
					<AuthProvider>
						<RoomsProvider>
						<Navbar />
						{children}
						<Footer />
						</RoomsProvider>
					</AuthProvider>
				</Providers>
			</body>
		</html>
	);
}
