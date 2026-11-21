import { Claude } from '../components/Brands.jsx';

/* A Claude Code session started in your own terminal, and the same session in Agentbox beside
   the rest of the work. Read left to right without the words: it starts there, it shows up here. */
export default function Sync() {
  return (
    <section id="sync" className="sec">
      <div className="wrap syh2">
        <h2 className="h2 rv">Agents you start anywhere show up here.</h2>
        <p className="lede rv d1">Run Claude Code in your own terminal and the session appears in Agentbox, next to the rest of the work. Personal projects stay yours.</p>
      </div>
      <div className="wrap stage syv rv d2" aria-hidden="true">
        <figure>
          <div className="syt">
            <div className="syb"><span>~/storefront</span></div>
            <div className="sys2">
              <div><span className="cp">$</span>claude</div>
              <div className="syq">Fix the flaky checkout test</div>
              <div className="syw"><span className="ust" data-state="working"><i className="gl" /></span>Reading src/checkout/tax.ts</div>
            </div>
          </div>
          <figcaption>In your terminal</figcaption>
        </figure>
        <svg className="sya" viewBox="0 0 120 24"><path className="wire" d="M0 12 H112" /><path className="pulse d2" d="M0 12 H112" /><path className="sya-h" d="M104 5 L113 12 L104 19" /></svg>
        <figure>
          <div className="glassy syi">
            <div className="syih"><span>Thread</span><span>Status</span></div>
            <div className="syr2 on"><span className="syg"><Claude /></span><span className="syn2">Fix the flaky checkout test<em>Your terminal</em></span><span className="ust" data-state="working"><i className="gl" />Working</span></div>
            <div className="syr2"><span className="syg"><Claude /></span><span className="syn2">Checkout fails for some carts<em>Storefront</em></span><span className="ust" data-state="waiting"><i className="gl" />Needs you</span></div>
            <div className="syr2"><span className="syf">S</span><span className="syn2">Can an agent take the Android bug?<em>Sam Ortiz</em></span><span className="ust" data-state="done"><i className="gl" />Answered</span></div>
          </div>
          <figcaption>In Agentbox</figcaption>
        </figure>
      </div>
    </section>
  );
}
