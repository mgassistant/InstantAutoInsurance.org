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
import QuoteForm from "@/components/QuoteForm";

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

          <div className="heroPhoto" style={{backgroundImage: "linear-gradient(180deg,rgba(4,20,27,.02),rgba(4,20,27,.72)), url('data:image/jpeg;base64,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')" }}><QuoteForm /></div>
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
