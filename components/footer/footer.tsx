import './footer.module.less';

export default function Footer() {
    return (
        <footer id="app_footer">
            <nav className="footer-inner">
                <section className="footer-item">
                    <h1 className="font-krona">Thinkinary</h1>

                    <h2>We create possibilities <br />for the connected world.<br /><b className="color">Be Bold.</b></h2>
                </section>

                <section className="footer-item">
                    <h3>Explore</h3>
                    <ul>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">About</a></li>
                        <li><a href="#">Capabilities</a></li>
                        <li><a href="#">Careers</a></li>
                    </ul>
                </section>

                <section className="footer-item">
                    <h3>Contact</h3>
                    <p className="desktop"><a href="#">info@thinkinary.com</a></p>
                    <p className="mobile"><a href="#">Email us</a></p>
                    <p><a href="#">+237 650 39 00 94</a></p>
                </section>

                <section className="footer-item">
                    <h3>Follow</h3>
                    <ul>
                        <li><a href="https://www.facebook.com/thinkinary" target="_blank">Facebook</a></li>
                        <li><a href="https://www.instagram.com/thinkinary" target="_blank">Instagram</a></li>
                        <li><a href="https://www.twitter.com/thinkinary" target="_blank">Twitter</a></li>
                    </ul>
                </section>

                <section className="footer-item">
                    <h3>Legal</h3>
                    <ul>
                        <li><a href="#">Terms</a></li>
                        <li><a href="#">Privacy policy</a></li>
                    </ul>
                </section>

                <section className="footer-item">
                    <a href="#" className="footer-button">Next: About</a>
                </section>
            </nav>
        </footer>
    );
}
