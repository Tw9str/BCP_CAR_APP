import React from 'react';
import Map from '@/components/widgets/Map';
import Social from '@/components/widgets/Social';
import Breadcrumb from '@/components/widgets/Breadcrumb';

export default function About() {
  return (
    <div className="about">
      <div className="container">
        <Breadcrumb />
        <div className="details">
          <p>Welkom bij ons auto bedrijf&#44; waar we gespecialiseerd zijn in het inkopen&#44; verkopen en repareren van auto&apos;s. Naast deze diensten bieden we ook aanpassingen en customizing aan om uw voertuig te personaliseren en te verbeteren.</p>
          <p>Ons bedrijf is opgericht met als doel om onze klanten hoogwaardige auto&apos;s te bieden tegen betaalbare prijzen&#44; met uitstekende klantenservice en ondersteuning voor en na de verkoop. We begrijpen dat het kopen van een auto een belangrijke beslissing is en daarom werken we hard om ervoor te zorgen dat onze klanten zich op hun gemak voelen tijdens het hele proces.</p>
          <p>Onze ervaren en goed opgeleide monteurs zorgen voor alle reparaties en onderhoudswerkzaamheden van uw auto&#44; zodat u veilig en comfortabel kunt rijden. We zijn trots op onze vakmanschap en gebruiken alleen de beste onderdelen en apparatuur om ervoor te zorgen dat uw auto in topconditie blijft.</p>
          <p>Onze webshop biedt een breed scala aan auto-accessoires en onderdelen van hoge kwaliteit. Ons team staat klaar om u te helpen bij het vinden van de juiste producten voor uw auto.</p>
          <p>We willen dat onze klanten tevreden zijn met elke interactie die ze met ons hebben en we zijn toegewijd om de hoogste normen van klantenservice te handhaven. We willen dat u vertrouwen heeft in ons bedrijf en onze diensten&#44; en we zullen er alles aan doen om ervoor te zorgen dat uw ervaring bij ons positief en onvergetelijk is.</p>
          <p>Bedankt voor het overwegen van ons bedrijf voor uw auto-inkoop-&#44; reparatie- en aanpassingsbehoeften. Wij hopen u binnenkort te mogen verwelkomen bij ons bedrijf!</p>
        </div>
        <Social/>
        <Map />
      </div>
    </div>
  )
}
