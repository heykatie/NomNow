import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './Footer.css';

export default function Footer() {

  const sessionUser = useSelector(state => state.session.user)

  return (
    <>
      <div id="footer">
        <div id='footer-col-1'>
          <Link exact to="/home">
            <div id='footer-logo-text'>
              NomNow
            </div>
          </Link>
        </div>
        <div className='footer-right'>
          <div id='footer-col'>
            <div className='footer-right-header'>Features</div>
            <div className='footer-list'>
              <Link exact to="/">
                <div>Restaurants</div>
              </Link>
              <Link exact to="/menu-items">
                <div>Menu Items</div>
              </Link>
              <Link exact to="/reviews/restaurant/1">
                <div>Reviews</div>
              </Link>
              
                <Link exact to="/orders">
                  <div>Orders</div>
                </Link>

                <Link exact to="/">
                  <div>LandingPage</div>
                </Link>

            </div>
          </div>
          <div id='footer-col'>
            <div className='footer-right-header'>Contact Us</div>
            <div className='footer-list'>
              <div className='footer-name'>
                  <div>Gabriel Dean</div>
                <div className='footer-links'>
                  <a href="" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                  <a href="https://github.com/gabrdean" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-github"></i>
                  </a>
                </div>
              </div>
              <div className='footer-name'>
                  <div>Burak Ozdemir</div>
                <div className='footer-links'>
                  <a href="https://www.linkedin.com/in/burak-%C3%B6zdemir-64a2a9317/" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                  <a href="https://github.com/burakoncuy" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-github"></i>
                  </a>
                </div>
              </div>
              <div className='footer-name'>
                  <div>Samai Althiabat</div>
                <div className='footer-links'>
                  <a href="a" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                  <a href="https://github.com/SamaAlt" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-github"></i>
                  </a>
                </div>
              </div>
              <div className='footer-name'>
                <div>Katie Leong</div>
                <div className='footer-links'>
                  <a href="" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                  <a href="https://github.com/heykatie" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-github"></i>
                  </a>
                </div>
              </div>
              <div className='footer-name'>
                <div>Marcelle Armstrong</div>
                <div className='footer-links'>
                  <a href="" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                  <a href="https://github.com/Mcode4" target="_blank" rel="noopener noreferrer">
                    <i className="fa-brands fa-github"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id='footer-copyright'>
        @ 2025 NomNow
      </div>
    </>
  )
};
