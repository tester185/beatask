export default function MainNav({setAuthPage,loginActive,signActive}){
    return (
        <header>
            <label onClick={()=>setAuthPage(0)} id="nav-logo"></label>
        <nav>
            {loginActive && <button onClick={()=>setAuthPage(1)} className="nav-btn">Login</button>}
            {signActive && <button onClick={()=>setAuthPage(2)} className="nav-btn">Sign Up</button>}
        </nav>
        </header>
    )
}