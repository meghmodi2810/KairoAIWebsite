import { useState } from 'react';
import heroImg from './assets/hero.png';
import { NeoBox, NeoButton, NeoInput, NeoSticker } from './components/NeoComponents';
import './App.css';

const tabs = [
  { id: 'about', label: 'About KairoAI' },
  { id: 'contact', label: 'Contact Us' },
  { id: 'download', label: 'Download' }
];

function App() {
  const [activeTab, setActiveTab] = useState('about');
  const [contactForm, setContactForm] = useState({ email: '', phone: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  const handleContactSubmit = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const res = await fetch('/api/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...contactForm })
        });
        if (res.ok) {
          setFormStatus('Thanks for reaching out! We will reply within 2 business days.');
          setContactForm({ email: '', phone: '', message: '' });
        } else {
          const data = await res.json().catch(() => ({}));
          setFormStatus(data?.error || 'Failed to send message. Please try again later.');
        }
      } catch (err) {
        setFormStatus('Failed to send message. Please check your connection.');
      }
    })();
  };

  const updateField = (field) => (event) => {
    if (formStatus) {
      setFormStatus('');
    }
    setContactForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  return (
    <div className="app-shell">
      <header className="site-header container">
        <div className="brand-block">
          <div className="brand-mark" aria-hidden="true">
            <img src={heroImg} alt="KairoAI logo" />
          </div>
          <div>
            <NeoSticker text="Support Portal" className="header-sticker" />
            <h1 className="brand-title">KairoAI</h1>
            <p className="brand-subtitle">Sign language practice made playful for kids and families.</p>
          </div>
        </div>
        
      </header>

      <nav className="tabs-nav container" role="tablist" aria-label="Support sections">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${tab.id}-panel`}
            className={`tab-link ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="container">
        {activeTab === 'about' && (
          <section className="section about-section fade-in" id="about-panel" role="tabpanel" aria-labelledby="tab-about">
            <div className="hero-grid">
              <div className="hero-copy">
                <NeoSticker text="Play. Practice. Connect." className="hero-sticker" />
                <h2>Learning Sign Language Is Now a Game!</h2>
                <p>
                  Meet Kairo, a friendly guide that turns practice into play. Short sessions, clear steps, and a high-five when
                  you get it right.
                </p>
                <p>Designed for children and parents to learn together, celebrate progress, and build confidence.</p>
                <div className="hero-actions">
                  <NeoButton onClick={() => setActiveTab('download')}>Get the App</NeoButton>
                </div>
                <div className="hero-highlights">
                  <NeoBox className="card-hover">
                    <h3>Made for Kids</h3>
                    <p>Colorful lessons, simple prompts, and tiny wins that feel big.</p>
                  </NeoBox>
                  <NeoBox className="accent-mint card-hover">
                    <h3>Built for Families</h3>
                    <p>Practice together at home, on the couch, or on the go.</p>
                  </NeoBox>
                </div>
              </div>
              <div className="hero-media">
                <NeoBox className="hero-image-frame card-hover">
                  <img src={heroImg} alt="Playful Kairo mascot waving hello" />
                </NeoBox>
                <NeoBox className="accent-yellow card-hover">
                  <h3>Quick Start</h3>
                  <ol className="neo-steps">
                    <li>Open the app.</li>
                    <li>Show your hand to the camera.</li>
                    <li>Copy the sign and celebrate.</li>
                  </ol>
                </NeoBox>
              </div>
            </div>

            

            <div className="value-grid">
              <NeoBox className="card-hover">
                <h3>What is Kairo?</h3>
                <p>A friendly companion that cheers you on while you practice everyday signs.</p>
              </NeoBox>
              <NeoBox className="accent-yellow card-hover">
                <h3>Why it matters</h3>
                <p>When kids can communicate, confidence grows and families connect.</p>
              </NeoBox>
              <NeoBox className="accent-mint card-hover">
                <h3>How it feels</h3>
                <p>Like a game: short challenges, clear goals, and a celebratory high-five.</p>
              </NeoBox>
            </div>
          </section>
        )}

        {activeTab === 'contact' && (
          <section className="section contact-section fade-in" id="contact-panel" role="tabpanel" aria-labelledby="tab-contact">
            <div className="section-header">
              <h2>Contact Us</h2>
              <p>Questions, feedback, or partnership ideas? We would love to hear from you.</p>
            </div>
            <div className="contact-grid">
              <NeoBox className="card-hover">
                <h3>We respond fast</h3>
                <p>Most messages are answered within two business days.</p>
                <div className="contact-details">
                  <div className="detail-row">
                    <span>Support Email</span>
                    <span>support@kairoai.com</span>
                  </div>
                  <div className="detail-row">
                    <span>Community</span>
                    <span>Parents and educators welcome</span>
                  </div>
                  <div className="detail-row">
                    <span>Best Times</span>
                    <span>Mon to Fri, 9am to 5pm</span>
                  </div>
                </div>
              </NeoBox>
              <NeoBox className="card-hover">
                <form onSubmit={handleContactSubmit}>
                  <NeoInput
                    label="Your Email"
                    type="email"
                    name="email"
                    placeholder="hello@example.com"
                    value={contactForm.email}
                    onChange={updateField('email')}
                    required
                    autoComplete="email"
                  />
                  <NeoInput
                    label="Phone Number"
                    type="tel"
                    name="phone"
                    placeholder="+1 (555) 000-0000"
                    value={contactForm.phone}
                    onChange={updateField('phone')}
                    autoComplete="tel"
                    inputMode="tel"
                  />
                  <NeoInput
                    label="Message"
                    name="message"
                    isTextArea
                    rows={5}
                    placeholder="How can we help you?"
                    value={contactForm.message}
                    onChange={updateField('message')}
                    required
                  />
                  {formStatus && (
                    <p className="form-status" role="status" aria-live="polite">
                      {formStatus}
                    </p>
                  )}
                  <div className="form-footer">
                    <NeoButton type="submit">Send Message</NeoButton>
                    <p className="form-note">We never share your contact information.</p>
                  </div>
                </form>
              </NeoBox>
            </div>
          </section>
        )}

        {activeTab === 'download' && (
          <section className="section download-section fade-in" id="download-panel" role="tabpanel" aria-labelledby="tab-download">
            <div className="section-header center">
              <h2>Download</h2>
              <p>Choose your platform and start practicing today.</p>
            </div>
            <div className="download-grid">
              <NeoBox className="download-card download-card--android card-hover">
                <NeoSticker text="Get the App" className="download-sticker" />
                <div className="platform-icon">AND</div>
                <h3>Android</h3>
                <p>Full experience with real-time feedback.</p>
                <NeoButton href="/KairoAI.apk" download ariaLabel="Download Kairo app for Android">
                  Download APK
                </NeoButton>
                <p className="download-note">File: KairoAI.apk</p>
              </NeoBox>

              <NeoBox className="download-card download-card--ios is-muted card-hover">
                <NeoSticker text="Coming Soon" className="download-sticker sticker--alert" />
                <div className="platform-icon">IOS</div>
                <h3>iOS</h3>
                <p>We are polishing the App Store release.</p>
                <NeoButton disabled variant="mint">
                  App Store
                </NeoButton>
              </NeoBox>

              <NeoBox className="download-card download-card--windows is-muted card-hover">
                <NeoSticker text="Coming Soon" className="download-sticker sticker--alert" />
                <div className="platform-icon">WIN</div>
                <h3>Windows</h3>
                <p>Practice on the big screen with your webcam.</p>
                <NeoButton disabled variant="secondary">
                  Desktop App
                </NeoButton>
              </NeoBox>
            </div>
          </section>
        )}
      </main>

      <footer className="site-footer container">
        <p>(c) 2026 KairoAI. Built for connection and confidence.</p>
        <p>Need help fast? Use the Contact tab and we will jump in.</p>
      </footer>
    </div>
  );
}

export default App;
