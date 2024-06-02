import DashboardNav from "./_components/DashboardNav"
import { Inter, Nunito_Sans, Sevillana } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

export const nunito_sans = Nunito_Sans({
    weight: ["400", "600"],
    subsets: ["latin"],
    display: 'swap',
    variable: '--font-nunito-sans'
})

export const sevile = Sevillana({
    weight: ["400"],
    subsets: ["latin"],
    display: 'swap',
    variable: '--font-sevi'
})

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <body className={`flex h-screen flex-col ${inter.className} ${nunito_sans.variable}`}>
            <DashboardNav />
            <main className='px-20 pt-24 pb-24 bg-[#F5F5F5]'>
                {children}
            </main>
        </body>
    );
}