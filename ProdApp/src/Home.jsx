import { useRef } from "react"
import   "./home.css"
import {Parallax,ParallaxLayer} from  '@react-spring/parallax'
import axios from "axios"
import MainNav from './MainNav.jsx'
export default function Home(props){
    let setAuthPage=props.setAuthPage
axios.defaults.withCredentials=true
axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    return (
        <div id="home-container">
            <MainNav setAuthPage={(p)=>setAuthPage(p)} loginActive={true} signActive={true}/>
            <section className="home-section hsection1">
                <div className="home-saying"><p id="p"><h4>Maximize</h4> your efficiency <br/>with customizable timers <br/>designed for focused work</p>
                
                </div>
            </section>
            <section className="home-section hsection2"> <div className="home-saying"><p id="p"><h4 >Energize</h4>  your sessions <br/> with curated playlists<br/> that keep you in the zone</p>
                
                </div>
                </section>
                <section className="home-section hsection3"> <div className="home-saying"><p id="p"><h4 >Master</h4> productivity with our integrated <br/> Pomodoro technique <br/> for optimal time management</p>
                
                </div>
                </section>
                <section className="home-section hsection4"> <div className="home-saying"><p id="p"><h4 >Stay</h4> organized and on track with our intuitive, chronological to-do lists</p>
                
                </div>
                </section>

        </div>
    )

}