import { useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom";
import "./AccountFormPage.css"

function AccountFormPage(){
    const user = useSelector((store) => store.session.user);
    const navigate = useNavigate()

    if(!user) return navigate('/login')


    return (
        <div className="main-page">
            <h1>Account Info</h1>

            <div>
                <img
                    src='../../public/icons/user.png'
                    alt=''
                    className='pfp'
                />
                <div className="info-container">
                    <label>
                    <div className="info-text">Name</div>
                    <div className="info-blocks">
                        {user.firstName} {user.lastName}
                        <button><NavLink to={'name'} className="info-text">{'>'}</NavLink></button>
                    </div>
                    </label>
                    <label>
                        <div className="info-text">Phone Number</div>
                        <div className="info-blocks">
                            {user.phoneNumber ? user.phoneNumber : 'Add your phone number'}
                            <button><NavLink to={'phone'} className="info-text">{'>'}</NavLink></button>
                        </div>
                    </label>
                    <label>
                        <div className="info-text">Email</div>
                        <div className="info-blocks">
                            {user.email ? user.email : 'Add your email'}
                            <button><NavLink to={'email'} className="info-text">{'>'}</NavLink></button>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    )
}

export default AccountFormPage