import React from 'react';
import Map from '@/components/widgets/Map';
import Social from '@/components/widgets/Social';
import Breadcrumb from '@/components/widgets/Breadcrumb';
import Link from 'next/link';
import { FiPhoneCall } from 'react-icons/fi';
import { AiOutlineMail } from 'react-icons/ai';

export default function Contact() {
  return (
    <div className="contact">
      <div className="container">
        <Breadcrumb />
        <div className="details">
          <p>Bedankt voor je interesse in ons auto bedrijf&#44; BestCarProvider. We zijn altijd blij om vragen te beantwoorden&#44; feedback te ontvangen en nieuwe klanten te verwelkomen. Hieronder vind je verschillende manieren om contact met ons op te nemen: </p>
          <Link href="mailto:BestCarProvider@gmail.com"><AiOutlineMail size={24} /> E-mail: BestCarProvider@gmail.com</Link>
          <Link href="tel: +31634025584"><FiPhoneCall size={24}/> Telefoon: 0614986278 (ook bereikbaar via WhatsApp)</Link>
          <Social/>
          <p>Aarzel niet om ons te contacteren als je vragen hebt over onze auto&apos;s&#44; diensten&#44; prijzen of iets anders. We zijn er om je te helpen!</p>
          <div className="regards">
            <p>Met vriendelijke groeten&#44;</p>
            <p>Het team van BestCarProvider</p>
          </div>
        </div>
        <Map />
      </div>
    </div>
  )
}
