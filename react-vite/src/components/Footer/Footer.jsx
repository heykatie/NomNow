import restrictedLinks from "./restrictedLinks"
import FooterButton from "./FooterButton"
import { useLocation } from "react-router-dom"
import "./Footer.css"

function Footer(){
    const location = useLocation().pathname
    let isShown = true
    restrictedLinks.forEach(link =>{
        if(link === location){
            isShown = false
        }
    })

    return (
        <>
        {isShown && (
            <div className="footer">
                <FooterButton dev={"Gabe"} />
                <FooterButton dev={"Burak"} />
                <FooterButton dev={"Katie"} />
                <FooterButton dev={"Marcellies"} />
                <FooterButton dev={"Sama"} />
            </div>
        )}
        </>
    )
}

export default Footer