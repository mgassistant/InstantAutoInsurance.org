import {
  ArrowRight,
  BadgeCheck,
  CarFront,
  CheckCircle2,
  Clock3,
  FileCheck2,
  Headphones,
  Phone,
  ShieldCheck,
  Sparkles,
  WalletCards
} from "lucide-react";

const phone = "(323) 537-2083";
const tel = "tel:+13235372083";
const quote = "https://fastrakins.com";

const services = [
  { icon: CarFront, title: "Liability coverage", text: "Get help finding coverage that meets California requirements and your budget." },
  { icon: ShieldCheck, title: "Full coverage", text: "Compare options that may include comprehensive and collision protection for your vehicle." },
  { icon: FileCheck2, title: "SR-22 filings", text: "Need an SR-22? A licensed agent can help you review eligible policies and filing options." }
];

const reasons = [
  "Fast quotes with a real licensed agent",
  "Options for standard and higher-risk drivers",
  "Help with SR-22 and proof-of-insurance needs",
  "Multiple carrier options when available",
  "English and Spanish assistance"
];

export default function Home() {
  return (
    <main>
      <header className="nav">
        <a className="brand" href="/" aria-label="InstantAutoInsurance.org">
          <span className="logo"><ShieldCheck size={23}/></span>
          <span><strong>Instant Auto</strong><em>Insurance.org</em></span>
        </a>
        <nav>
          <a href="#coverage">Coverage</a>
          <a href="#how">How it works</a>
          <a href="#sr22">SR-22</a>
          <a href="#faq">FAQ</a>
        </nav>
        <a className="callTop" href={tel}><Phone size={18}/>{phone}</a>
      </header>

      <section className="hero">
        <div className="heroGrid">
          <div className="copy">
            <div className="eyebrow"><Sparkles size={14}/> FAST AUTO INSURANCE HELP</div>
            <h1>Get insured <span>today.</span><br/>Drive with confidence.</h1>
            <p>Need auto insurance now? We help drivers compare available options for liability, full coverage, and SR-22 filings — with support from a licensed agent.</p>
            <div className="actions">
              <a className="primary" href={quote}>Get my quote <ArrowRight size={18}/></a>
              <a className="secondary" href={tel}><Phone size={18}/> Call {phone}</a>
            </div>
            <div className="miniTrust">
              <span><CheckCircle2 size={16}/> Same-day help</span>
              <span><CheckCircle2 size={16}/> Licensed agents</span>
              <span><CheckCircle2 size={16}/> SR-22 options</span>
            </div>
          </div>

          <div className="heroPanel">
            <div className="panelHead">
              <span><Clock3 size={26}/></span>
              <div><small>START HERE</small><h2>Need proof of insurance fast?</h2></div>
            </div>
            <div className="steps">
              <div><b>01</b><span><strong>Tell us what you need</strong><small>Basic driver, vehicle, and coverage details.</small></span></div>
              <div><b>02</b><span><strong>Review available options</strong><small>We help compare eligible carrier choices.</small></span></div>
              <div><b>03</b><span><strong>Choose your coverage</strong><small>Complete your purchase and get proof of insurance.</small></span></div>
            </div>
            <a className="panelCta" href={quote}>Start my quote <ArrowRight size={18}/></a>
            <p className="fine">Pricing and eligibility vary by driver, carrier, vehicle, location, and coverage selected.</p>
          </div>
        </div>
      </section>

      <section className="strip">
        <div><Clock3/><span><strong>Fast process</strong><small>Built for drivers who need coverage now</small></span></div>
        <div><BadgeCheck/><span><strong>Licensed help</strong><small>Talk with a real insurance professional</small></span></div>
        <div><WalletCards/><span><strong>Flexible options</strong><small>Review available payment choices</small></span></div>
      </section>

      <section className="section" id="coverage">
        <div className="heading">
          <span>AUTO INSURANCE MADE SIMPLE</span>
          <h2>Coverage for the road ahead.</h2>
          <p>Whether you need basic protection, broader coverage, or an SR-22 filing, we can help you review available options.</p>
        </div>
        <div className="cards">
          {services.map(({icon:Icon,title,text}) => (
            <article key={title}>
              <span className="icon"><Icon size={25}/></span>
              <h3>{title}</h3><p>{text}</p>
              <a href={quote}>Get a quote <ArrowRight size={16}/></a>
            </article>
          ))}
        </div>
      </section>

      <section className="feature" id="how">
        <div className="featureVisual">
          <div className="speedCard"><Clock3 size={34}/><strong>Coverage without the runaround.</strong><p>Simple steps. Clear answers. Real help.</p></div>
          <div className="proofCard"><BadgeCheck size={23}/><span><strong>Proof of insurance</strong><small>Get documents after your policy is successfully bound.</small></span></div>
        </div>
        <div className="featureCopy">
          <span className="kicker">WHY INSTANTAUTOINSURANCE.ORG?</span>
          <h2>When you need insurance, speed matters — but so does getting it right.</h2>
          <p>We focus on helping you move from quote to coverage with less friction while keeping a licensed agent involved.</p>
          <div className="reasons">{reasons.map(r => <div key={r}><CheckCircle2 size={20}/>{r}</div>)}</div>
          <a className="textLink" href={quote}>Check my options <ArrowRight size={17}/></a>
        </div>
      </section>

      <section className="sr22" id="sr22">
        <div>
          <span>SR-22 INSURANCE HELP</span>
          <h2>Need an SR-22 today?</h2>
          <p>If an SR-22 filing is required, we can help you review eligible auto-insurance options and explain the next steps.</p>
          <div className="actions">
            <a className="white" href={quote}>Get an SR-22 quote <ArrowRight size={18}/></a>
            <a className="ghost" href={tel}><Headphones size={18}/> Talk to an agent</a>
          </div>
        </div>
        <div className="srBox">
          <FileCheck2 size={38}/><strong>Fast filing support</strong><p>An SR-22 is generally a certificate filed by an insurer to show proof of financial responsibility. Requirements depend on your situation.</p>
        </div>
      </section>

      <section className="section faq" id="faq">
        <div className="heading left"><span>COMMON QUESTIONS</span><h2>Quick answers before you quote.</h2></div>
        <div className="faqGrid">
          <article><h3>Can I get auto insurance the same day?</h3><p>Policies may be available with same-day effective dates when underwriting, payment, and eligibility requirements are satisfied.</p></article>
          <article><h3>What do I need to get a quote?</h3><p>Usually your driver information, vehicle details, address, current insurance status, and desired coverage.</p></article>
          <article><h3>Can you help if I need an SR-22?</h3><p>Yes. A licensed agent can review available options for drivers who need an SR-22 filing.</p></article>
          <article><h3>Is the quote guaranteed?</h3><p>No. Final rates and eligibility are determined by the insurance carrier based on the information submitted and coverage selected.</p></article>
        </div>
      </section>

      <section className="final">
        <div><span>READY TO GET STARTED?</span><h2>Get your auto insurance quote today.</h2></div>
        <div className="actions"><a className="primary" href={quote}>Start my quote <ArrowRight size={18}/></a><a className="plainCall" href={tel}><Phone size={18}/>{phone}</a></div>
      </section>

      <footer>
        <div className="footBrand"><span className="logo"><ShieldCheck size={21}/></span><span><strong>InstantAutoInsurance.org</strong><small>Fast help finding auto insurance.</small></span></div>
        <p className="legal">InstantAutoInsurance.org is an informational and lead-generation website. Coverage availability, rates, effective dates, filings, and eligibility are determined by the applicable insurance carrier and policy terms. Not all products or coverage options are available to every applicant.</p>
        <div className="bottom"><span>© {new Date().getFullYear()} InstantAutoInsurance.org</span><span>California · English & Spanish assistance</span></div>
      </footer>
    </main>
  );
}
