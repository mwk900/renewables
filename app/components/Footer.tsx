import { navLinks } from '../data/content';

export default function Footer() {
  return (
    <footer className="border-t border-surface-elevated">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <span className="font-heading text-xl text-text-primary tracking-tight">
                meridian
              </span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed max-w-xs">
              UK renewable energy developer. Solar, wind, and battery storage
              from feasibility to grid connection.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-text-muted hover:text-teal transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">Services</h4>
            <ul className="space-y-2.5">
              {['Solar Farms', 'Onshore Wind', 'Battery Storage', 'Hybrid Projects'].map((s) => (
                <li key={s}>
                  <span className="text-sm text-text-muted">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-4">Contact</h4>
            <ul className="space-y-2.5 text-sm text-text-muted">
              <li>14 King Street</li>
              <li>London, EC2V 8EA</li>
              <li className="pt-1">+44 (0)20 7946 0958</li>
              <li>enquiries@meridian-energy.co.uk</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-surface-elevated flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Meridian Energy Solutions Ltd. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-text-muted">
            <a href="#" className="hover:text-teal transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-teal transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-teal transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
