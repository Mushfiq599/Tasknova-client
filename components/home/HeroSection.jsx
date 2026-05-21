'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { FiArrowRight } from 'react-icons/fi'
import { useTheme } from '../../context/ThemeContext'

const Illustration = ({ index, isLight }) => {
  const cardBg     = isLight ? '#FFFFFF' : '#111827'
  const cardBorder = isLight ? '#38BDF8' : '#1B3358'
  const textLight  = isLight ? '#0C4A6E' : '#8892A4'
  const textStrong = isLight ? '#0C1A2E' : '#E8EAF0'
  const cyan       = isLight ? '#0284C7' : '#00D4FF'
  const purple     = isLight ? '#6D28D9' : '#A78BFA'
  const bgDeep     = isLight ? '#E0F2FE' : '#0D1526'
  const green      = '#10B981'

  if (index === 0) return (
    <svg viewBox="0 0 420 360" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'100%' }}>
      <rect x="30" y="40" width="240" height="130" rx="14" fill={cardBg} stroke={cardBorder} strokeWidth="1.5"/>
      <rect x="50" y="62" width="100" height="10" rx="5" fill={cyan} opacity="0.8"/>
      <rect x="50" y="80" width="160" height="7" rx="3.5" fill={isLight ? '#BAE6FD' : '#1B3358'}/>
      <rect x="50" y="95" width="130" height="7" rx="3.5" fill={isLight ? '#BAE6FD' : '#1B3358'}/>
      <rect x="50" y="118" width="80" height="30" rx="8" fill={`${cyan}18`} stroke={cyan} strokeWidth="1"/>
      <text x="90" y="137" fontSize="11" fill={cyan} textAnchor="middle" fontFamily="Inter" fontWeight="600">View Task</text>
      <rect x="170" y="118" width="80" height="30" rx="8" fill={`${green}18`} stroke={green} strokeWidth="1"/>
      <text x="210" y="137" fontSize="11" fill={green} textAnchor="middle" fontFamily="Inter" fontWeight="600">+20 coins</text>
      <rect x="200" y="190" width="190" height="110" rx="14" fill={cardBg} stroke={cardBorder} strokeWidth="1.5"/>
      <circle cx="248" cy="230" r="26" fill={bgDeep} stroke={cyan} strokeWidth="1.5"/>
      <circle cx="248" cy="222" r="10" fill={isLight ? '#BAE6FD' : '#1B3358'}/>
      <path d="M224 248 Q248 238 272 248" fill={isLight ? '#BAE6FD' : '#1B3358'}/>
      <circle cx="268" cy="212" r="10" fill={green} stroke={cardBg} strokeWidth="2"/>
      <path d="M263 212 L266 216 L274 207" stroke="white" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <rect x="280" y="218" width="90" height="8" rx="4" fill={cyan} opacity="0.7"/>
      <rect x="280" y="232" width="70" height="7" rx="3.5" fill={isLight ? '#BAE6FD' : '#1B3358'}/>
      <rect x="280" y="246" width="55" height="7" rx="3.5" fill={isLight ? '#BAE6FD' : '#1B3358'}/>
      <circle cx="340" cy="80" r="28" fill={`${cyan}18`} stroke={cyan} strokeWidth="1.5"/>
      <text x="332" y="87" fontSize="20" fill={cyan}>⬡</text>
      <circle cx="375" cy="130" r="18" fill={`${purple}18`} stroke={purple} strokeWidth="1"/>
      <text x="368" y="137" fontSize="13" fill={purple}>⬡</text>
      <circle cx="310" cy="155" r="12" fill={`${cyan}12`} stroke={`${cyan}55`} strokeWidth="1"/>
      <text x="305" y="161" fontSize="9" fill={cyan}>⬡</text>
      <path d="M270 105 Q310 120 310 155" stroke={`${cyan}66`} strokeWidth="1.5" strokeDasharray="5 4" fill="none"/>
      <rect x="30" y="310" width="380" height="34" rx="10" fill={cardBg} stroke={cardBorder} strokeWidth="1"/>
      <text x="50" y="331" fontSize="11" fill={textStrong} fontFamily="Inter" fontWeight="600">Task submitted for review</text>
      <rect x="295" y="317" width="100" height="20" rx="6" fill={`${green}18`} stroke={green} strokeWidth="0.8"/>
      <text x="345" y="330" fontSize="10" fill={green} textAnchor="middle" fontFamily="Inter">✓ Pending</text>
    </svg>
  )

  if (index === 1) return (
    <svg viewBox="0 0 420 360" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'100%' }}>
      <rect x="20" y="20" width="380" height="280" rx="14" fill={cardBg} stroke={cardBorder} strokeWidth="1.5"/>
      <rect x="20" y="20" width="380" height="36" rx="14" fill={bgDeep}/>
      <rect x="20" y="42" width="380" height="14" fill={bgDeep}/>
      <circle cx="42" cy="38" r="5" fill="#EF444444"/>
      <circle cx="58" cy="38" r="5" fill="#F59E0B44"/>
      <circle cx="74" cy="38" r="5" fill="#10B98144"/>
      <text x="210" y="43" fontSize="10" fill={textLight} textAnchor="middle" fontFamily="Inter">TaskNova — Buyer Dashboard</text>
      {[{x:36,label:'Tasks',val:'12',color:cyan},{x:162,label:'Workers',val:'84',color:purple},{x:288,label:'Paid Out',val:'$340',color:green}].map((s,i)=>(
        <g key={i}>
          <rect x={s.x} y="72" width="110" height="56" rx="8" fill={bgDeep} stroke={`${s.color}44`} strokeWidth="1"/>
          <text x={s.x+55} y="97" fontSize="18" fill={s.color} textAnchor="middle" fontFamily="Inter" fontWeight="700">{s.val}</text>
          <text x={s.x+55} y="115" fontSize="8" fill={textLight} textAnchor="middle" fontFamily="Inter">{s.label}</text>
        </g>
      ))}
      {['Watch YouTube & Comment','Complete App Survey','Write Product Review'].map((t,i)=>(
        <g key={i}>
          <rect x="36" y={146+i*38} width="348" height="30" rx="6" fill={bgDeep} stroke={cardBorder} strokeWidth="0.5"/>
          <rect x="48" y={154+i*38} width="140" height="7" rx="3.5" fill={cyan} opacity="0.7"/>
          <rect x="48" y={165+i*38} width="90" height="5" rx="2.5" fill={isLight?'#BAE6FD':'#1B3358'}/>
          <rect x="310" y={152+i*38} width="60" height="14" rx="4" fill={`${green}18`} stroke={`${green}55`} strokeWidth="0.5"/>
          <text x="340" y={163+i*38} fontSize="7" fill={green} textAnchor="middle" fontFamily="Inter">Active</text>
        </g>
      ))}
      <rect x="36" y="264" width="160" height="24" rx="7" fill={`${cyan}18`} stroke={cyan} strokeWidth="1"/>
      <text x="116" y="280" fontSize="10" fill={cyan} textAnchor="middle" fontFamily="Inter" fontWeight="600">+ Add New Task</text>
      <rect x="20" y="310" width="380" height="30" rx="14" fill={bgDeep}/>
    </svg>
  )

  return (
    <svg viewBox="0 0 420 360" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', height:'100%' }}>
      <rect x="20" y="20" width="185" height="200" rx="14" fill={cardBg} stroke={cardBorder} strokeWidth="1.5"/>
      <circle cx="112" cy="74" r="32" fill={bgDeep} stroke={cyan} strokeWidth="1.5"/>
      <circle cx="112" cy="64" r="13" fill={isLight?'#BAE6FD':'#1B3358'}/>
      <path d="M80 96 Q112 80 144 96" fill={isLight?'#BAE6FD':'#1B3358'}/>
      <text x="112" y="130" fontSize="11" fill={textStrong} textAnchor="middle" fontFamily="Inter" fontWeight="600">Priya Nair</text>
      <text x="112" y="146" fontSize="9" fill={textLight} textAnchor="middle" fontFamily="Inter">Top Worker</text>
      <rect x="40" y="162" width="145" height="20" rx="6" fill={bgDeep}/>
      <rect x="40" y="162" width="110" height="20" rx="6" fill={`${cyan}22`}/>
      <text x="115" y="175" fontSize="8" fill={cyan} textAnchor="middle" fontFamily="Inter">2,840 coins</text>
      <rect x="36" y="198" width="154" height="1" fill={isLight?'#BAE6FD':'#1B3358'}/>
      {[{icon:'✓',label:'148 tasks done',y:218},{icon:'⬡',label:'$142 earned',y:238}].map(r=>(
        <g key={r.y}>
          <text x="48" y={r.y} fontSize="9" fill={green}>{r.icon}</text>
          <text x="62" y={r.y} fontSize="9" fill={textLight} fontFamily="Inter">{r.label}</text>
        </g>
      ))}
      <rect x="220" y="20" width="180" height="90" rx="14" fill={cardBg} stroke={`${purple}55`} strokeWidth="1.5"/>
      <text x="240" y="52" fontSize="10" fill={purple} fontFamily="Inter" fontWeight="600">Withdrawal</text>
      <text x="240" y="72" fontSize="22" fill={textStrong} fontFamily="Inter" fontWeight="700">$12.00</text>
      <rect x="240" y="82" width="80" height="16" rx="5" fill={`${green}18`} stroke={green} strokeWidth="0.8"/>
      <text x="280" y="93" fontSize="8" fill={green} textAnchor="middle" fontFamily="Inter">✓ Approved</text>
      <rect x="220" y="126" width="180" height="110" rx="14" fill={cardBg} stroke={cardBorder} strokeWidth="1.5"/>
      <text x="240" y="150" fontSize="10" fill={textLight} fontFamily="Inter">Recent earnings</text>
      {[{w:120,c:cyan,l:'Survey task',v:'+10'},{w:80,c:purple,l:'Comment task',v:'+20'},{w:100,c:green,l:'Review task',v:'+15'}].map((b,i)=>(
        <g key={i}>
          <rect x="240" y={160+i*22} width={b.w} height="12" rx="3" fill={`${b.c}30`}/>
          <text x="248" y={170+i*22} fontSize="8" fill={b.c} fontFamily="Inter">{b.l}</text>
          <text x="390" y={170+i*22} fontSize="8" fill={b.c} textAnchor="end" fontFamily="Inter">{b.v}</text>
        </g>
      ))}
      <rect x="20" y="236" width="380" height="104" rx="14" fill={cardBg} stroke={cardBorder} strokeWidth="1.5"/>
      <text x="40" y="262" fontSize="11" fill={textStrong} fontFamily="Inter" fontWeight="600">Top 3 Workers This Week</text>
      {[{n:'Priya N.',c:cyan,coins:'2840'},{n:'James O.',c:purple,coins:'2210'},{n:'Amina D.',c:green,coins:'1980'}].map((w,i)=>(
        <g key={i}>
          <circle cx={52+i*130} cy="300" r="18" fill={bgDeep} stroke={`${w.c}55`} strokeWidth="1"/>
          <text x={52+i*130} y="304" fontSize="9" fill={w.c} textAnchor="middle" fontFamily="Inter" fontWeight="600">{w.n.split(' ')[0]}</text>
          <text x={52+i*130} y="322" fontSize="8" fill={textLight} textAnchor="middle" fontFamily="Inter">{w.coins}⬡</text>
        </g>
      ))}
    </svg>
  )
}

const slides = [
  { badge:'For Workers', heading:'Complete Tasks,', highlight:'Earn Real Coins', sub:'Browse hundreds of micro-tasks, submit your work, and get paid instantly in coins you can withdraw to your bank or mobile wallet.', cta:{ label:'Start Earning', href:'/register' }, illustrationIndex:0 },
  { badge:'For Buyers', heading:'Post Tasks,', highlight:'Get Real Results', sub:'Create tasks in minutes, set your budget, and receive verified submissions from thousands of skilled workers worldwide.', cta:{ label:'Post a Task', href:'/register' }, illustrationIndex:1 },
  { badge:'Top Earners', heading:'Build Your', highlight:'Earning Profile', sub:'Climb the leaderboard, earn badges, and unlock higher-paying tasks. The more you work, the more you earn.', cta:{ label:'Join Now', href:'/register' }, illustrationIndex:2 },
]

const HeroSection = () => {
  const { theme } = useTheme()
  const isLight = theme === 'light'
  const timerRef = useRef(null)
  const trackRef = useRef(null)
  const currentRef = useRef(0)

  const cyan   = isLight ? '#0284C7' : '#00D4FF'
  const muted  = isLight ? '#0C4A6E' : '#8892A4'
  const strong = isLight ? '#0C1A2E' : '#E8EAF0'
  const subtleBg = isLight ? '#BAE6FD' : '#1B3358'

  const goTo = (index) => {
    currentRef.current = index
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(-${index * 100}%)`
    }
    document.querySelectorAll('.hero-dot').forEach((d, i) => {
      d.style.background = i === index ? cyan : subtleBg
      d.style.width = i === index ? '24px' : '8px'
    })
  }

  const next = () => goTo((currentRef.current + 1) % slides.length)
  const prev = () => goTo((currentRef.current - 1 + slides.length) % slides.length)

  useEffect(() => {
    timerRef.current = setInterval(next, 5000)
    return () => clearInterval(timerRef.current)
  }, [isLight])

  useEffect(() => { goTo(0) }, [isLight])

  return (
    <section style={{
      background: isLight ? '#E0F2FE' : '#0A0F1E',
      minHeight: '100vh',
      paddingTop: '72px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {!isLight && <div className="bg-grid" style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none' }} />}

      {/* Slider viewport — full width */}
      <div style={{ width: '100%', overflow: 'hidden', flex: 1, position: 'relative', zIndex: 1 }}>
        <div ref={trackRef} style={{ display:'flex', transition:'transform 0.6s cubic-bezier(0.4,0,0.2,1)', height:'100%' }}>
          {slides.map((slide, idx) => (
            <div key={idx} style={{ minWidth:'100%', display:'flex', alignItems:'center', justifyContent:'center' }}>
              {/* ✅ Centered container with equal left/right space */}
              <div style={{
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '60px 48px 40px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                alignItems: 'center',
                gap: '48px',
                boxSizing: 'border-box',
              }} className="hero-grid">

                {/* Left text — centered within its column */}
                <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-start' }}>
                  <div style={{
                    display:'inline-flex', alignItems:'center', gap:'8px',
                    background: isLight ? '#BAE6FD' : '#00D4FF12',
                    border: `1px solid ${isLight ? '#38BDF8' : '#00D4FF33'}`,
                    borderRadius:'20px', padding:'6px 14px', marginBottom:'24px',
                  }}>
                    <span style={{ width:'6px', height:'6px', borderRadius:'50%', background:cyan, display:'inline-block' }} />
                    <span style={{ fontSize:'12px', color:cyan, fontWeight:500 }}>{slide.badge}</span>
                  </div>

                  {/* Heading line 1 — plain color, no gradient */}
                  <h1 style={{
                    fontSize:'clamp(30px,4.5vw,52px)',
                    fontWeight:700,
                    lineHeight:1.15,
                    color: strong,
                    fontFamily:'Space Grotesk, sans-serif',
                    marginBottom:'4px',
                    WebkitTextFillColor: 'unset',
                  }}>
                    {slide.heading}
                  </h1>

                  {/* ✅ Gradient text fixed — no color override colliding */}
                  <h1 style={{
                    fontSize:'clamp(30px,4.5vw,52px)',
                    fontWeight:700,
                    lineHeight:1.15,
                    fontFamily:'Space Grotesk, sans-serif',
                    marginBottom:'20px',
                    display:'inline-block',
                    background: isLight
                      ? 'linear-gradient(135deg, #0284C7 0%, #7C3AED 100%)'
                      : 'linear-gradient(135deg, #00D4FF 0%, #A78BFA 100%)',
                    WebkitBackgroundClip:'text',
                    WebkitTextFillColor:'transparent',
                    backgroundClip:'text',
                    MozBackgroundClip:'text',
                    color:'transparent',
                  }}>
                    {slide.highlight}
                  </h1>

                  <p style={{
                    fontSize:'16px', color:muted, lineHeight:1.75,
                    marginBottom:'36px', maxWidth:'420px',
                  }}>
                    {slide.sub}
                  </p>

                  <div style={{ display:'flex', gap:'12px', flexWrap:'wrap' }}>
                    <Link href={slide.cta.href} style={{
                      background:'transparent', border:`1px solid ${cyan}`,
                      color:cyan, padding:'12px 24px', borderRadius:'8px',
                      fontSize:'14px', fontWeight:500, textDecoration:'none',
                      display:'inline-flex', alignItems:'center', gap:'8px', transition:'all 0.2s',
                    }}>
                      {slide.cta.label} <FiArrowRight size={15} />
                    </Link>
                    <Link href="/login" style={{
                      background:'transparent',
                      border:`1px solid ${isLight ? '#BAE6FD' : '#1B3358'}`,
                      color:muted, padding:'12px 24px', borderRadius:'8px',
                      fontSize:'14px', fontWeight:500, textDecoration:'none', transition:'all 0.2s',
                    }}>
                      Sign In
                    </Link>
                  </div>
                </div>

                {/* Right illustration */}
                <div className="hero-illustration" style={{ display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <div style={{ width:'100%', maxWidth:'440px' }}>
                    <Illustration index={slide.illustrationIndex} isLight={isLight} />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots + arrows */}
      <div style={{
        display:'flex', alignItems:'center', justifyContent:'center',
        gap:'16px', padding:'24px 0 48px', zIndex:2,
      }}>
        <button onClick={() => { clearInterval(timerRef.current); prev() }} aria-label="Previous" style={{
          background:'transparent', border:`1px solid ${isLight?'#38BDF8':'#1B3358'}`,
          borderRadius:'50%', width:'36px', height:'36px', cursor:'pointer', color:muted,
          fontSize:'18px', display:'flex', alignItems:'center', justifyContent:'center',
        }}>‹</button>

        <div style={{ display:'flex', gap:'8px', alignItems:'center' }}>
          {slides.map((_,i) => (
            <button key={i} className="hero-dot"
              onClick={() => { clearInterval(timerRef.current); goTo(i) }}
              style={{
                width: i===0 ? '24px' : '8px', height:'8px', borderRadius:'4px',
                background: i===0 ? cyan : subtleBg,
                border:'none', cursor:'pointer', padding:0, transition:'all 0.3s ease',
              }}
              aria-label={`Slide ${i+1}`}
            />
          ))}
        </div>

        <button onClick={() => { clearInterval(timerRef.current); next() }} aria-label="Next" style={{
          background:'transparent', border:`1px solid ${isLight?'#38BDF8':'#1B3358'}`,
          borderRadius:'50%', width:'36px', height:'36px', cursor:'pointer', color:muted,
          fontSize:'18px', display:'flex', alignItems:'center', justifyContent:'center',
        }}>›</button>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; padding: 40px 24px 20px !important; gap: 32px !important; }
          .hero-illustration { display: none !important; }
        }
      `}</style>
    </section>
  )
}

export default HeroSection