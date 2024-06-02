import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import { Head } from "./head";
import bubbleCSS from "../styles/bubbleCSS.module.css"
import Image from "next/image";
import BubbleEffect from "../components/bubbleEffect";

export default function DefaultLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (


		<div className="relative flex flex-col h-screen w-screen overflow-x-hidden">

			<Head />
			<Navbar />

			<main className="container mx-auto max-w-7xl px-6 flex-grow pt-16 z-10">
				{children}
			</main>

			<footer className="w-full flex items-center justify-center py-3">
				<Link
					isExternal
					className="flex items-center gap-1 text-current"
					href="https://nextui-docs-v2.vercel.app?utm_source=next-pages-template"
					title="nextui.org homepage"
				>
					<span className="text-default-600">Created by </span>
					<p className="text-[#8800ff]">CIIE Core Team</p>
				</Link>
			</footer>
		</div >
	);
}
