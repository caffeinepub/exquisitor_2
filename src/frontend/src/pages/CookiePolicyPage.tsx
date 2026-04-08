export default function CookiePolicyPage() {
  return (
    <section
      className="min-h-screen py-24 px-6"
      style={{ backgroundColor: "#050505" }}
    >
      <div className="max-w-[900px] mx-auto">
        {/* Page header */}
        <div className="mb-16">
          <p
            className="text-xs font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: "#A1A1AA" }}
          >
            Legal
          </p>
          <h1
            className="text-4xl md:text-5xl font-black tracking-tight text-white"
            style={{ letterSpacing: "-0.03em" }}
          >
            Cookie Policy
          </h1>
          <div
            className="mt-6 h-px w-16"
            style={{ background: "rgba(255,255,255,0.12)" }}
          />
        </div>

        <p className="text-xs text-[#666] mb-8">Last updated March 21, 2026</p>

        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: "#a0a0a0" }}
        >
          This Cookie Policy explains how Exquisitor (
          <strong className="text-white">"Company,"</strong>{" "}
          <strong className="text-white">"we,"</strong>{" "}
          <strong className="text-white">"us,"</strong> and{" "}
          <strong className="text-white">"our"</strong>) uses cookies and
          similar technologies to recognize you when you visit our website at{" "}
          <a
            href="https://exquisitor.co"
            className="text-white underline underline-offset-2"
          >
            https://exquisitor.co
          </a>{" "}
          (<strong className="text-white">"Website"</strong>). It explains what
          these technologies are and why we use them, as well as your rights to
          control our use of them.
        </p>
        <p
          className="text-sm leading-relaxed mb-8"
          style={{ color: "#a0a0a0" }}
        >
          In some cases, we may use cookies to collect personal information, or
          that becomes personal information if we combine it with other
          information.
        </p>

        {/* What are cookies */}
        <h2 className="text-xl font-bold tracking-tight text-white mt-10 mb-4">
          What are cookies?
        </h2>
        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: "#a0a0a0" }}
        >
          Cookies are small data files that are placed on your computer or
          mobile device when you visit a website. Cookies are widely used by
          website owners in order to make their websites work, or to work more
          efficiently, as well as to provide reporting information.
        </p>
        <p
          className="text-sm leading-relaxed mb-8"
          style={{ color: "#a0a0a0" }}
        >
          Cookies set by the website owner (in this case, Exquisitor) are called
          &ldquo;first-party cookies.&rdquo; Cookies set by parties other than
          the website owner are called &ldquo;third-party cookies.&rdquo;
          Third-party cookies enable third-party features or functionality to be
          provided on or through the website (e.g., advertising, interactive
          content, and analytics). The parties that set these third-party
          cookies can recognize your computer both when it visits the website in
          question and also when it visits certain other websites.
        </p>

        {/* Why do we use cookies */}
        <h2 className="text-xl font-bold tracking-tight text-white mt-10 mb-4">
          Why do we use cookies?
        </h2>
        <p
          className="text-sm leading-relaxed mb-8"
          style={{ color: "#a0a0a0" }}
        >
          We use first- and third-party cookies for several reasons. Some
          cookies are required for technical reasons in order for our Website to
          operate, and we refer to these as &ldquo;essential&rdquo; or
          &ldquo;strictly necessary&rdquo; cookies. Other cookies also enable us
          to track and target the interests of our users to enhance the
          experience on our Online Properties. Third parties serve cookies
          through our Website for advertising, analytics, and other purposes.
          This is described in more detail below.
        </p>

        {/* How can I control cookies */}
        <h2 className="text-xl font-bold tracking-tight text-white mt-10 mb-4">
          How can I control cookies?
        </h2>
        <p
          className="text-sm leading-relaxed mb-6"
          style={{ color: "#a0a0a0" }}
        >
          You have the right to decide whether to accept or reject cookies.
          Essential cookies cannot be rejected as they are strictly necessary to
          provide you with services. If you choose to reject cookies, you may
          still use our Website though your access to some functionality and
          areas of our Website may be restricted. You may also set or amend your
          web browser controls to accept or refuse cookies.
        </p>

        <h3 className="text-base font-semibold text-white mb-3">
          Essential website cookies:
        </h3>
        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: "#a0a0a0" }}
        >
          These cookies are strictly necessary to provide you with services
          available through our Website and to use some of its features, such as
          access to secure areas.
        </p>
        <ul className="space-y-2 mb-8">
          {[
            {
              name: "__cf_bm",
              provider: "Cloudflare",
              purpose: "Bot Management and security.",
            },
            {
              name: "_cfuvid",
              provider: "Cloudflare",
              purpose: "Enhances security and performance.",
            },
            {
              name: "ic_env",
              provider: "exquisitor.co",
              purpose: "Internal server routing.",
            },
          ].map((cookie) => (
            <li
              key={cookie.name}
              className="text-sm leading-relaxed"
              style={{ color: "#a0a0a0" }}
            >
              <strong className="text-white">Name:</strong>{" "}
              <code
                className="text-xs px-1.5 py-0.5 rounded"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  color: "#e0e0e0",
                }}
              >
                {cookie.name}
              </code>{" "}
              | <strong className="text-white">Provider:</strong>{" "}
              {cookie.provider} |{" "}
              <strong className="text-white">Purpose:</strong> {cookie.purpose}
            </li>
          ))}
        </ul>

        {/* Browser controls */}
        <h2 className="text-xl font-bold tracking-tight text-white mt-10 mb-4">
          How can I control cookies on my browser?
        </h2>
        <p
          className="text-sm leading-relaxed mb-8"
          style={{ color: "#a0a0a0" }}
        >
          As the means by which you can refuse cookies through your web browser
          controls vary from browser to browser, you should visit your
          browser&rsquo;s help menu for more information.
        </p>

        {/* Web beacons */}
        <h2 className="text-xl font-bold tracking-tight text-white mt-10 mb-4">
          What about other tracking technologies, like web beacons?
        </h2>
        <p
          className="text-sm leading-relaxed mb-8"
          style={{ color: "#a0a0a0" }}
        >
          Cookies are not the only way to recognize or track visitors to a
          website. We may use other, similar technologies from time to time,
          like web beacons (sometimes called &ldquo;tracking pixels&rdquo; or
          &ldquo;clear gifs&rdquo;). These are tiny graphics files that contain
          a unique identifier that enables us to recognize when someone has
          visited our Website or opened an email including them. This allows us
          to monitor traffic patterns and improve site performance.
        </p>

        {/* Targeted advertising */}
        <h2 className="text-xl font-bold tracking-tight text-white mt-10 mb-4">
          Do you serve targeted advertising?
        </h2>
        <p
          className="text-sm leading-relaxed mb-8"
          style={{ color: "#a0a0a0" }}
        >
          Third parties may serve cookies on your computer or mobile device to
          serve advertising through our Website. These companies may use
          information about your visits to this and other websites in order to
          provide relevant advertisements about goods and services that you may
          be interested in.
        </p>

        {/* Further information */}
        <h2 className="text-xl font-bold tracking-tight text-white mt-10 mb-4">
          Where can I get further information?
        </h2>
        <p
          className="text-sm leading-relaxed mb-2"
          style={{ color: "#a0a0a0" }}
        >
          If you have any questions about our use of cookies or other
          technologies, please contact us at{" "}
          <a
            href="mailto:founders@exquisitor.tech"
            className="text-white underline underline-offset-2"
          >
            founders@exquisitor.tech
          </a>{" "}
          or by post at:
        </p>
        <address
          className="not-italic text-sm leading-relaxed mt-4"
          style={{ color: "#a0a0a0" }}
        >
          <p className="text-white font-semibold">Exquisitor</p>
          <p>Office 933, 60 Tottenham Court Road Fitzrovia</p>
          <p>London, W1T 2EW</p>
          <p>United Kingdom</p>
        </address>
      </div>
    </section>
  );
}
