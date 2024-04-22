import Link from 'next/link'

function NotFound() {
  return (
    <div>
        <h2>LAPA NEEKSISTĒ!</h2>
        <p>Atvainojiet, bet lapa, kuru jūs meklējat neeksistē!</p>
        <Link href="/">Uz sākumu</Link>
    </div>
  )
}
export default NotFound