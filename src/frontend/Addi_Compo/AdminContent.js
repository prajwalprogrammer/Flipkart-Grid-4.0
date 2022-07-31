import Rahul from "../../images/Rahul.jpeg";
import Prajwal from "../../images/Prajwal.jpg";
import Ayush from "../../images/Ayush.jpg";
import './AdminContent.css';

const AdminContent=()=>{
    return(
        <div className="aboutUs">
            <h1 className="aboutTitle">About Us</h1>
            <p className="aboutContent">We are team : <span className="imp">Infinity</span> from <span className="imp">Vishwakarma Institiute of Technology Pune</span>.</p>
            <div className="team">
                <div className="teamMembers">
                    <div className="photo">
                        <img src={Rahul} className="teamImages" alt="Rahul Ponnuru"></img>
                        <h1 className="teamMates">Rahul Ponnuru</h1>
                    </div>

                    <div className="photo">
                        <img src={Ayush} className="teamImages" alt="Ayush Patni"></img>
                        <h1 className="teamMates">Ayush Patni</h1>
                    </div>
 
                    <div className="photo">
                        <img src={Prajwal} className="teamImages" alt="Prajwal Achwale"></img>
                        <h1 className="teamMates">Prajwal Achwale</h1>
                    </div>
                    
                    
                    
                </div>
            </div>
        </div>
    )
}

export default AdminContent;