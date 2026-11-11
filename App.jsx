import { useEffect, useState } from 'react'
import {
  Menu, X, Mail, Shield, Target, Users, Zap, Trophy, Calendar, Radio,
  Send, Crosshair, Brain, Flame, Clock, ArrowUp, Check, Lock, Swords,
  User, Megaphone, ArrowRight, Newspaper,
} from 'lucide-react'
import { INSTAGRAM_URL, YOUTUBE_URL, BUSINESS_EMAIL, FORM_ENDPOINT } from './config.js'

/* ------------------------------------------------------------------ */
/*  Small helpers                                                      */
/* ------------------------------------------------------------------ */

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'roster', label: 'Roster' },
  { id: 'tournaments', label: 'Tournaments' },
  { id: 'recruitment', label: 'Recruitment' },
  { id: 'news', label: 'News' },
  { id: 'contact', label: 'Contact' },
]

function scrollToId(id) {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

// Fades sections in as they scroll into view
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.12 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

// Tracks which section is on screen so the nav can highlight it
function useActiveSection() {
  const [active, setActive] = useState('home')
  useEffect(() => {
    const sections = NAV.map((n) => document.getElementById(n.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        }),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])
  return active
}

/* ------------------------------------------------------------------ */
/*  Brand pieces (all original artwork, no Free Fire assets)           */
/* ------------------------------------------------------------------ */

function Logo({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <path d="M8 8h20l16 24-16 24H8l16-24z" fill="#e10613" />
      <path d="M34 8h22v48H34l10-24z" fill="#f5f5f5" />
    </svg>
  )
}

function Silhouette() {
  return (
    <svg viewBox="0 0 120 140" className="silhouette" aria-hidden="true">
      <circle cx="60" cy="42" r="24" />
      <path d="M10 140c0-34 22-56 50-56s50 22 50 56z" />
    </svg>
  )
}

function SectionHead({ eyebrow, title, text }) {
  return (
    <div className="section-head reveal">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      <div className="bar" />
      {text && <p>{text}</p>}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Navbar                                                             */
/* ------------------------------------------------------------------ */

function Navbar({ active }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const go = (id) => {
    setOpen(false)
    setTimeout(() => scrollToId(id), 50)
  }

  return (
    <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-inner">
        <button className="brand" onClick={() => go('home')} aria-label="DMN ESPORTS home">
          <Logo size={34} />
          <span>DMN<b>ESPORTS</b></span>
        </button>

        <nav className="nav-links" aria-label="Main">
          {NAV.slice(1, -1).map((n) => (
            <button
              key={n.id}
              className={active === n.id ? 'active' : ''}
              onClick={() => go(n.id)}
            >
              {n.label}
            </button>
          ))}
        </nav>

        <button className="btn btn-red btn-sm nav-cta" onClick={() => go('recruitment')}>
          Join the Team
        </button>

        <button
          className="burger"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <div className={`drawer ${open ? 'open' : ''}`}>
        {NAV.map((n, i) => (
          <button
            key={n.id}
            className={active === n.id ? 'active' : ''}
            style={{ transitionDelay: open ? `${i * 40}ms` : '0ms' }}
            onClick={() => go(n.id)}
          >
            {n.label}
          </button>
        ))}
        <button className="btn btn-red" onClick={() => go('recruitment')}>
          Join the Team
        </button>
      </div>
    </header>
  )
}

/* ------------------------------------------------------------------ */
/*  1. HOME                                                            */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-bg" aria-hidden="true">
        <div className="glow g1" />
        <div className="glow g2" />
        <div className="grid" />
        <div className="slash s1" />
        <div className="slash s2" />
        <div className="scan" />
      </div>

      <div className="container hero-content">
        <span className="pill"><Flame size={14} /> Free Fire India</span>
        <h1>
          WE ARE
          <span className="line-red">DMN ESPORTS<i>.</i></span>
        </h1>
        <p className="subtitle">A NEW GENERATION OF COMPETITIVE ESPORTS</p>
        <p className="tagline">BUILT FROM ZERO. BORN TO COMPETE.</p>

        <div className="hero-buttons">
          <button className="btn btn-red" onClick={() => scrollToId('recruitment')}>
            Join the Team <ArrowRight size={18} />
          </button>
          <button className="btn btn-ghost" onClick={() => scrollToId('roster')}>
            Explore Our Roster
          </button>
        </div>
      </div>

      <button className="scroll-hint" onClick={() => scrollToId('about')} aria-label="Scroll to About">
        <span />
      </button>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  2. ABOUT                                                           */
/* ------------------------------------------------------------------ */

const VALUES = [
  { icon: Users, title: 'Teamwork', text: 'Five players, one mind. Communication and trust win rounds before the first drop.' },
  { icon: Shield, title: 'Discipline', text: 'Structured scrims, honest reviews and routines that turn practice into results.' },
  { icon: Target, title: 'Dedication', text: 'Every session counts. We show up, put in the work and keep improving.' },
  { icon: Zap, title: 'Ambition', text: 'We are starting from zero with our eyes on the biggest stages in Indian Free Fire.' },
]

function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <SectionHead eyebrow="Who we are" title="ABOUT DMN ESPORTS" />
        <div className="about-grid">
          <div className="about-text reveal">
            <p className="lead">
              DMN ESPORTS is an upcoming competitive Free Fire organization from India, built
              from the ground up by players who love the game and respect the grind.
            </p>
            <p>
              We are at the very beginning of our journey, and we are proud of that. No
              shortcuts and no borrowed glory. We are assembling a roster, building a culture
              and preparing to compete, one match at a time.
            </p>
            <p>
              If you have the skill, the mindset and the hunger to grow with a team that is
              being built the right way, we want to hear from you.
            </p>
          </div>

          <div className="values">
            {VALUES.map((v, i) => (
              <div key={v.title} className="value reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                <div className="icon"><v.icon size={22} /></div>
                <div>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  3. TEAM ROSTER                                                     */
/* ------------------------------------------------------------------ */

const ROLES = [
  { role: 'IGL', full: 'In-Game Leader', icon: Brain, tag: 'Calls the shots' },
  { role: 'Entry Fragger', full: 'Entry Fragger', icon: Swords, tag: 'First into the fight' },
  { role: 'Support', full: 'Support', icon: Shield, tag: 'Holds the team together' },
  { role: 'Flex', full: 'Flex', icon: Crosshair, tag: 'Fills every gap' },
  { role: 'Substitute 1', full: 'Substitute', icon: User, tag: 'Ready to step in', sub: true },
  { role: 'Substitute 2', full: 'Substitute', icon: User, tag: 'Ready to step in', sub: true },
]

function Roster() {
  return (
    <section id="roster" className="section alt">
      <div className="container">
        <SectionHead
          eyebrow="The squad"
          title="TEAM ROSTER"
          text="Our lineup is being finalised. Every slot below is open until we find the right players."
        />
        <div className="roster-grid">
          {ROLES.map((r, i) => (
            <article
              key={r.role}
              className={`card player reveal ${r.sub ? 'sub' : ''}`}
              style={{ transitionDelay: `${(i % 3) * 90}ms` }}
            >
              <div className="player-top">
                <span className="num">{String(i + 1).padStart(2, '0')}</span>
                <span className="role-badge"><r.icon size={14} /> {r.role}</span>
              </div>
              <div className="player-art">
                <Silhouette />
                <div className="art-glow" />
              </div>
              <div className="player-info">
               <h3>{['DMN CAPTAIN', 'DMN ASSAULT', 'DMN GUARD', 'DMN FLEX', 'DMN RESERVE 1', 'DMN RESERVE 2'][i]}</h3>
<p className="muted">{i === 0 ? 'CAPTAIN • ' : ''}{r.tag}</p>
<div className="soon"><Clock size={14} /> UID: TO BE ANNOUNCED</div>
              </div>
            </article>
          ))}
        </div>
        <div className="center reveal">
          <button className="btn btn-ghost" onClick={() => scrollToId('recruitment')}>
            Think you belong here? Apply now <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  4. TOURNAMENTS                                                     */
/* ------------------------------------------------------------------ */

const TOURNAMENT_TABS = [
  { id: 'upcoming', label: 'Upcoming', icon: Calendar },
  { id: 'ongoing', label: 'Ongoing', icon: Radio },
  { id: 'results', label: 'Previous Results', icon: Trophy },
]

// Placeholder content. Replace with real events when you have them.
const TOURNAMENTS = {
  upcoming: [
    { title: 'Tournament Name TBA', meta: 'Date: To be announced', note: 'Qualifier details will be posted here.' },
    { title: 'Tournament Name TBA', meta: 'Date: To be announced', note: 'Registration information coming soon.' },
  ],
  ongoing: [
    { title: 'No ongoing tournaments', meta: 'Status: Preparing', note: 'When we are competing live, match info appears here.' },
  ],
  results: [
    { title: 'No results yet', meta: 'Status: Just getting started', note: 'Our first official results will be listed here.' },
  ],
}

function Tournaments() {
  const [tab, setTab] = useState('upcoming')
  return (
    <section id="tournaments" className="section">
      <div className="container">
        <SectionHead
          eyebrow="Compete"
          title="TOURNAMENTS"
          text="Schedules and results will appear here once we start competing. The entries below are placeholders."
        />
        <div className="tabs reveal" role="tablist">
          {TOURNAMENT_TABS.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              className={tab === t.id ? 'active' : ''}
              onClick={() => setTab(t.id)}
            >
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </div>
        <div className="t-grid" key={tab}>
          {TOURNAMENTS[tab].map((t, i) => (
            <div className="card t-card fade-up" key={i} style={{ animationDelay: `${i * 80}ms` }}>
              <span className="chip">Placeholder</span>
              <h3>{t.title}</h3>
              <p className="meta">{t.meta}</p>
              <p className="muted">{t.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  5. RECRUITMENT                                                     */
/* ------------------------------------------------------------------ */

const RANKS = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Heroic', 'Elite Heroic', 'Master', 'Grandmaster']
const PLAY_ROLES = ['IGL', 'Entry Fragger', 'Support', 'Flex', 'Substitute', 'Open to any role']
const EMPTY = {
  ign: '', uid: '', role: '', rank: '', video: '',
  experience: '', availability: '', website: '', // "website" is a hidden spam trap
}

function Recruitment() {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const set = (k) => (e) => {
    setForm({ ...form, [k]: e.target.value })
    if (errors[k]) setErrors({ ...errors, [k]: undefined })
  }

  function validate() {
    const e = {}
    if (form.ign.trim().length < 2) e.ign = 'Please enter your in-game name.'
    if (form.uid && !/^\d{6,14}$/.test(form.uid.trim())) e.uid = 'UID should be numbers only (6 to 14 digits).'
    if (!form.role) e.role = 'Please choose a preferred role.'
    if (!form.rank) e.rank = 'Please choose your current rank.'
    if (form.video && !/^https?:\/\/\S+\.\S+/i.test(form.video.trim())) e.video = 'Please enter a valid link starting with http:// or https://'
    if (form.experience.trim().length < 10) e.experience = 'Tell us a little about your experience (at least a sentence).'
    if (form.availability.trim().length < 3) e.availability = 'Please tell us when you are available.'
    return e
  }

  async function onSubmit(ev) {
    ev.preventDefault()
    if (form.website) return // bots fill the hidden field; humans never see it
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length) return

    const data = {
      IGN: form.ign.trim(),
      'Free Fire UID': form.uid.trim() || 'Not provided',
      'Preferred role': form.role,
      'Current rank': form.rank,
      'Gameplay video': form.video.trim() || 'Not provided',
      Experience: form.experience.trim(),
      Availability: form.availability.trim(),
    }

    setStatus('sending')
    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        })
        if (!res.ok) throw new Error('Request failed')
      } else {
        const body = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join('\n')
        window.location.href =
          `mailto:${BUSINESS_EMAIL}?subject=${encodeURIComponent('DMN ESPORTS Application - ' + data.IGN)}` +
          `&body=${encodeURIComponent(body)}`
      }
      setStatus('success')
      setForm(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  const Field = ({ id, label, optional, children }) => (
    <div className={`field ${errors[id] ? 'has-error' : ''}`}>
      <label htmlFor={id}>{label} {optional && <em>(optional)</em>}</label>
      {children}
      {errors[id] && <span className="err" role="alert">{errors[id]}</span>}
    </div>
  )

  return (
    <section id="recruitment" className="section alt">
      <div className="container">
        <SectionHead
          eyebrow="Recruitment"
          title="JOIN DMN ESPORTS"
          text="Think you have what it takes? Send us your application and show us who you are."
        />
        <div className="recruit-grid">
          <aside className="recruit-side reveal">
            <h3>What we look for</h3>
            <ul>
              <li><Check size={16} /> A team-first attitude</li>
              <li><Check size={16} /> Consistency and willingness to learn</li>
              <li><Check size={16} /> Reliable availability for scrims</li>
              <li><Check size={16} /> Respect for teammates and opponents</li>
            </ul>
            <div className="safe">
              <Lock size={18} />
              <p>
                We will <b>never</b> ask for your game password, OTP codes or identity
                documents. Never share these with anyone claiming to be DMN ESPORTS.
              </p>
            </div>
          </aside>

          <form className="card form reveal" onSubmit={onSubmit} noValidate>
            {status === 'success' ? (
              <div className="success">
                <div className="tick"><Check size={34} /></div>
                <h3>APPLICATION SENT</h3>
                <p className="muted">
                  {FORM_ENDPOINT
                    ? 'Thank you. Our team will review your application and get back to you.'
                    : 'Your email app should have opened with your application. Press send there to finish.'}
                </p>
                <button type="button" className="btn btn-ghost" onClick={() => setStatus('idle')}>
                  Submit another
                </button>
              </div>
            ) : (
              <>
                <div className="row">
                  <Field id="ign" label="In-Game Name (IGN)">
                    <input id="ign" value={form.ign} onChange={set('ign')} placeholder="Your IGN" autoComplete="off" />
                  </Field>
                  <Field id="uid" label="Free Fire UID" optional>
                    <input id="uid" value={form.uid} onChange={set('uid')} placeholder="Numbers only" inputMode="numeric" autoComplete="off" />
                  </Field>
                </div>
                <div className="row">
                  <Field id="role" label="Preferred Role">
                    <select id="role" value={form.role} onChange={set('role')}>
                      <option value="">Select a role</option>
                      {PLAY_ROLES.map((r) => <option key={r}>{r}</option>)}
                    </select>
                  </Field>
                  <Field id="rank" label="Current Rank">
                    <select id="rank" value={form.rank} onChange={set('rank')}>
                      <option value="">Select your rank</option>
                      {RANKS.map((r) => <option key={r}>{r}</option>)}
                    </select>
                  </Field>
                </div>
                <Field id="video" label="Gameplay Video Link" optional>
                  <input id="video" value={form.video} onChange={set('video')} placeholder="https://youtube.com/..." inputMode="url" />
                </Field>
                <Field id="experience" label="Experience">
                  <textarea id="experience" rows="4" value={form.experience} onChange={set('experience')} placeholder="Teams you have played for, scrims or tournaments, how long you have played..." />
                </Field>
                <Field id="availability" label="Availability">
                  <input id="availability" value={form.availability} onChange={set('availability')} placeholder="e.g. Weekdays 7 PM to 11 PM IST, weekends all day" />
                </Field>

                {/* Hidden spam trap - leave as is */}
                <input className="hp" tabIndex="-1" autoComplete="off" aria-hidden="true" value={form.website} onChange={set('website')} name="website" />

                {status === 'error' && (
                  <p className="err banner" role="alert">
                    Something went wrong sending your application. Please try again or email us at {BUSINESS_EMAIL}.
                  </p>
                )}

                <button className="btn btn-red btn-block" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending...' : <>Submit Application <Send size={18} /></>}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  6. NEWS & UPDATES                                                  */
/* ------------------------------------------------------------------ */

const NEWS_TABS = ['All', 'Announcements', 'Roster Updates', 'Match Highlights', 'Tournament Updates']

// Placeholder posts. Replace with real news over time.
const NEWS = [
  { cat: 'Announcements', title: 'Welcome to DMN ESPORTS', text: 'Our official website is live. Follow along as we build the team from zero.', date: 'Placeholder' },
  { cat: 'Roster Updates', title: 'Roster announcement coming soon', text: 'We will reveal our players here as soon as the lineup is confirmed.', date: 'Placeholder' },
  { cat: 'Match Highlights', title: 'Highlights will land here', text: 'Clips and recaps from our matches will be posted once we start competing.', date: 'Placeholder' },
  { cat: 'Tournament Updates', title: 'Tournament plans in progress', text: 'Qualifier entries and schedules will be shared as they are confirmed.', date: 'Placeholder' },
]

const CAT_ICON = {
  Announcements: Megaphone,
  'Roster Updates': Users,
  'Match Highlights': Flame,
  'Tournament Updates': Trophy,
}

function News() {
  const [filter, setFilter] = useState('All')
  const items = filter === 'All' ? NEWS : NEWS.filter((n) => n.cat === filter)
  return (
    <section id="news" className="section">
      <div className="container">
        <SectionHead eyebrow="Stay updated" title="NEWS & UPDATES" />
        <div className="tabs wrap reveal">
          {NEWS_TABS.map((t) => (
            <button key={t} className={filter === t ? 'active' : ''} onClick={() => setFilter(t)}>
              {t}
            </button>
          ))}
        </div>
        <div className="news-grid" key={filter}>
          {items.map((n, i) => {
            const Icon = CAT_ICON[n.cat] || Newspaper
            return (
              <article className="card news-card fade-up" key={n.title} style={{ animationDelay: `${i * 80}ms` }}>
                <div className="news-icon"><Icon size={20} /></div>
                <span className="chip">{n.cat}</span>
                <h3>{n.title}</h3>
                <p className="muted">{n.text}</p>
                <span className="date">{n.date}</span>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  7. CONTACT                                                         */
/* ------------------------------------------------------------------ */

function InstagramIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </svg>
  )
}

function YoutubeIcon({ size = 22 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2.5" y="5" width="19" height="14" rx="4" />
      <path d="M10 9.5v5l4.5-2.5z" fill="currentColor" />
    </svg>
  )
}

function Contact() {
  const links = [
    { icon: <InstagramIcon />, label: 'Instagram', value: INSTAGRAM_URL === '#' ? 'Link coming soon' : 'Follow us', href: INSTAGRAM_URL },
    { icon: <YoutubeIcon />, label: 'YouTube', value: YOUTUBE_URL === '#' ? 'Link coming soon' : 'Subscribe', href: YOUTUBE_URL },
    { icon: <Mail size={22} />, label: 'Business Email', value: BUSINESS_EMAIL, href: `mailto:${BUSINESS_EMAIL}` },
  ]
  return (
    <section id="contact" className="section alt">
      <div className="container">
        <SectionHead
          eyebrow="Get in touch"
          title="CONTACT"
          text="For partnerships, collaborations and business enquiries, reach out below."
        />
        <div className="contact-grid">
          {links.map((l, i) => (
            <a
              key={l.label}
              className="card contact-card reveal"
              style={{ transitionDelay: `${i * 90}ms` }}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              onClick={(e) => { if (l.href === '#') e.preventDefault() }}
            >
              <div className="icon">{l.icon}</div>
              <h3>{l.label}</h3>
              <p>{l.value}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Footer + back to top                                               */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <div className="brand static"><Logo size={30} /><span>DMN<b>ESPORTS</b></span></div>
          <p className="muted">BUILT FROM ZERO. BORN TO COMPETE.</p>
        </div>
        <nav className="footer-links" aria-label="Footer">
          {NAV.map((n) => (
            <button key={n.id} onClick={() => scrollToId(n.id)}>{n.label}</button>
          ))}
        </nav>
      </div>
      <div className="container legal">
        <p>&copy; {new Date().getFullYear()} DMN ESPORTS. All rights reserved.</p>
        <p>
          DMN ESPORTS is an independent organization and is not affiliated with, endorsed by
          or sponsored by Garena or Free Fire. Free Fire is a trademark of its respective owner.
        </p>
      </div>
    </footer>
  )
}

function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <button
      className={`to-top ${show ? 'show' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <ArrowUp size={20} />
    </button>
  )
}

/* ------------------------------------------------------------------ */
/*  App                                                                */
/* ------------------------------------------------------------------ */

export default function App() {
  useReveal()
  const active = useActiveSection()
  return (
    <>
      <Navbar active={active} />
      <main>
        <Hero />
        <About />
        <Roster />
        <Tournaments />
        <Recruitment />
        <News />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
