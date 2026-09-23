export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div>
            <img
              className="footer-logo"
              src="/images/brand/ssi-company-logo.png"
              alt="Sri Sreenivasa Infra"
              width={280}
              height={46}
              decoding="async"
            />
            <p className="footer-brand">Fortune Waterfront</p>
            <p>Where the lake meets home — by Sri Sreenivasa Infra.</p>
            <p className="footer-rera">TS RERA NO: P02200009419</p>
          </div>
          <div>
            <h4>Visit</h4>
            <p>
              Sri Sreenivasa Infra
              <br />
              DSR Signature, Plot 506, Road 10
              <br />
              Kakatiya Hills, Madhapur
              <br />
              Hyderabad 500081
            </p>
          </div>
          <div>
            <h4>Contact</h4>
            <p>
              <a href="tel:+918790009000">+91 87 9000 9000</a>
              <br />
              <a href="tel:+919642434567">+91 96 4243 4567</a>
              <br />
              <a href="mailto:sales@srisreenivasa.com">
                sales@srisreenivasa.com
              </a>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Sri Sreenivasa Infra</span>
          <a
            href="https://srisreenivasa.com/portfolio/fortune-waterfront/"
            target="_blank"
            rel="noreferrer"
          >
            View on srisreenivasa.com
          </a>
        </div>
      </div>
    </footer>
  );
}
