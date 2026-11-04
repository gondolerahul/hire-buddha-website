import { MapPin, Phone, Mail, Clock, ShieldCheck } from 'lucide-react';
import { company } from '@/config/company';
import s from './ContactDetails.module.css';

// The registered office, opening hours, phone, mailbox and Grievance Officer,
// rendered on the server so they are in the page's HTML.
export function ContactDetails() {
  const g = company.grievanceOfficer;
  return (
    <div className={s.grid}>
      <div className={s.card}>
        <h2 className={s.head}>Headquarters &amp; registered office</h2>
        <p className={s.name}>{company.legalName}</p>
        <p className={s.line}><MapPin size={16} aria-hidden />{company.hq.full}</p>
        <p className={s.line}><Phone size={16} aria-hidden /><a href={`tel:${company.phone.tel}`}>{company.phone.display}</a></p>
        <p className={s.line}><Mail size={16} aria-hidden /><a href={`mailto:${company.email.contact}`}>{company.email.contact}</a></p>
        <p className={s.line}><Clock size={16} aria-hidden />{company.hours}</p>
        <p className={s.small}>CIN {company.cin}</p>
        <a className={s.map} href={company.hq.mapUrl} target="_blank" rel="noopener noreferrer">Open in Google Maps</a>
      </div>
      <div className={s.card} id="grievance">
        <h2 className={s.head}>Grievance Officer</h2>
        <p className={s.name}>{g.name}, {g.designation}</p>
        <p className={s.line}><Mail size={16} aria-hidden /><a href={`mailto:${g.email}`}>{g.email}</a></p>
        <p className={s.line}><Phone size={16} aria-hidden /><a href={`tel:${company.phone.tel}`}>{company.phone.display}</a></p>
        <p className={s.line}><MapPin size={16} aria-hidden />{company.hq.full}</p>
        <p className={s.small}>
          <ShieldCheck size={14} aria-hidden /> Appointed under the Information Technology Act, 2000 and the Digital Personal
          Data Protection Act, 2023. We acknowledge a grievance within 24 hours and resolve it within 15 days.
        </p>
      </div>
    </div>
  );
}
