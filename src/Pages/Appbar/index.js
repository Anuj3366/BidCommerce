import Link from 'next/link'
export default function Appbar() {
    return (
        <div>
            <ul>
                <li>
                    <Link href="/Homepage"><h1>Appbar</h1></Link>
                </li>
                <li>
                    <Link href='/Login'>Login</Link>
                </li>
                <li>
                    <Link href="/Signup">Signup</Link>
                </li>
                <li>
                    <Link href="/auctionstatus">AuctionStatus</Link>
                </li>
            </ul>
        </div>
    )
}