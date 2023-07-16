import './globals.css';
import '@/node_modules/react-modal-video/scss/modal-video.scss';
import Navbar from './components/Navbar/index';
import Footer from './components/Footer/index';
import Script from 'next/script'

export const metadata = {
	title: 'Evolution - EDOPro Server',
	description: 'Leaderboard for Evolution EDOPro Server',
	icons: {
		icon: '/logo.svg',
	},
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<head>
				<Script src="https://las-analytics.vercel.app/script.js" data-website-id="d49d0638-0710-4b43-91c8-e887c1afb079" />
			</head>
			<body>
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
	);
}
