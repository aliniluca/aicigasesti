'use client';

import React, { useEffect, useState } from 'react';
import { apiRequest } from '@/utils/axiosApiRequest';
import AdCard from './AdCard';
import CategoryCard from './CategoryCard';
import { Spinner, Row, Col } from 'react-bootstrap'; 

// Define TypeScript interfaces for the ad
interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: string;
  mediaData: { b64: string }[];
}

interface Subcategory {
  name: string;
  slug: string;
}

interface Category {
  name: string;
  slug: string;
  iconPath: string;
  subcategories: Subcategory[];
}

const categories: Category[] = [
  {
    name: 'Imobiliare',
    slug: 'imobiliare',
    iconPath: '/images/category-icons/imobiliare.svg',
    subcategories: [
      { name: 'Apartamente - Garsoniere de vanzare', slug: 'apartamente-garsoniere-de-vanzare' },
      { name: 'Apartamente - Garsoniere de inchiriat', slug: 'apartamente-garsoniere-de-inchiriat' },
      { name: 'Case de vanzare', slug: 'case-de-vanzare' },
      { name: 'Case de inchiriat', slug: 'case-de-inchiriat' },
      { name: 'Terenuri', slug: 'terenuri' },
      { name: 'Birouri - Spatii comerciale', slug: 'birouri-spatii-comerciale' },
      { name: 'Parcari si Garaje', slug: 'parcari-si-garaje' },
      { name: 'Depozite si Hale', slug: 'depozite-si-hale' },
      { name: 'Schimburi Imobiliare', slug: 'schimburi-imobiliare' },
      { name: 'Caut coleg - Camere de inchiriat', slug: 'caut-coleg-camere-de-inchiriat' },
      { name: 'Alte proprietati', slug: 'alte-proprietati' },
      { name: 'Proprietati Internationale', slug: 'proprietati-internationale' },
    ],
  },
  {
    name: 'Auto, Moto și Ambarcațiuni',
    slug: 'auto-moto-ambarcatiuni',
    iconPath: '/images/category-icons/auto.svg',
    subcategories: [
      { name: 'Autoturisme', slug: 'autoturisme' },
      { name: 'Autoutilitare', slug: 'autoutilitare' },
      { name: 'Camioane - Rulote - Remorci', slug: 'camioane-rulote-remorci' },
      { name: 'Motociclete', slug: 'motociclete' },
      { name: 'Scutere - ATV - UTV', slug: 'scutere-atv-utv' },
      { name: 'Ambarcatiuni', slug: 'ambarcatiuni' },
      { name: 'Utilaje agricole și industriale', slug: 'utilaje-agricole-si-industriale' },
    ],
  },
  {
    name: 'Electronice și electrocasnice',
    slug: 'electronice-electrocasnice',
    iconPath: '/images/category-icons/electronice.svg',
    subcategories: [
      { name: 'Telefoane', slug: 'telefoane' },
      { name: 'Videoproiectoare & Accesorii', slug: 'videoproiectoare-accesorii' },
      { name: 'Îngrijire Personală', slug: 'ingrijire-personala' },
      { name: 'Gadgets, Wearables & Camere foto-video', slug: 'gadgets-wearables-camere-foto-video' },
      { name: 'Casa inteligentă - Smarthome', slug: 'casa-inteligenta-smarthome' },
      { name: 'Reparații electrocasnice, electronice și telefoane', slug: 'reparatii-electrocasnice-electronice-telefoane' },
      { name: 'Electronice', slug: 'electronice' },
      { name: 'Rețelistică & Servere', slug: 'retelistica-servere' },
      { name: 'Periferice & Accesorii Laptop-PC-Gaming', slug: 'periferice-accesorii-laptop-pc-gaming' },
      { name: 'Drone & Accesorii', slug: 'drone-accesorii' },
      { name: 'Audio Hi-Fi & Profesionale', slug: 'audio-hi-fi-profesionale' },
      { name: 'Tablete - eReadere', slug: 'tablete-ereadere' },
      { name: 'Piese telefoane & tablete', slug: 'piese-telefoane-tablete' },
      { name: 'Imprimante, scannere', slug: 'imprimante-scannere' },
      { name: 'Componente Laptop-PC', slug: 'componente-laptop-pc' },
      { name: 'Aparate medicale & Wellness', slug: 'aparate-medicale-wellness' },
      { name: 'TV', slug: 'tv' },
      { name: 'Laptop-Calculator-Gaming', slug: 'laptop-calculator-gaming' },
      { name: 'Home Cinema & Audio', slug: 'home-cinema-audio' },
      { name: 'Căști Audio', slug: 'casti-audio' },
      { name: 'Accesorii telefoane & tablete', slug: 'accesorii-telefoane-tablete' },
    ],
  },
  {
    name: 'Modă și frumusețe',
    slug: 'moda-frumusete',
    iconPath: '/images/category-icons/moda.svg',
    subcategories: [
      { name: 'Haine damă', slug: 'haine-dama' },
      { name: 'Încălțăminte damă', slug: 'incaltaminte-dama' },
      { name: 'Haine bărbați', slug: 'haine-barbati' },
      { name: 'Încălțăminte bărbați', slug: 'incaltaminte-barbati' },
      { name: 'Accesorii', slug: 'accesorii' },
      { name: 'Ceasuri', slug: 'ceasuri' },
      { name: 'Lenjerie și costume de baie damă', slug: 'lenjerie-costume-de-baie-dama' },
      { name: 'Lenjerie și costume de înot bărbați', slug: 'lenjerie-costume-de-inot-barbati' },
      { name: 'Haine pentru gravide', slug: 'haine-pentru-gravide' },
      { name: 'Sănătate și frumusețe', slug: 'sanatate-frumusete' },
      { name: 'Palării, șepci și bandane', slug: 'palarii-sepci-bandane' },
      { name: 'Haine pentru nuntă', slug: 'haine-pentru-nunta' },
      { name: 'Alte accesorii de modă și frumusețe', slug: 'alte-accesorii-moda-frumusete' },
      { name: 'Servicii de înfrumusețare', slug: 'servicii-de-infrumusetare' },
      { name: 'Cadouri', slug: 'cadouri' },
    ],
  },
  {
    name: 'Casă și grădină',
    slug: 'casa-gradina',
    iconPath: '/images/category-icons/casasigradina.svg',
    subcategories: [
      { name: 'Articole menaj', slug: 'articole-menaj' },
      { name: 'Construcții', slug: 'constructii' },
      { name: 'Decorațiuni pentru interior', slug: 'decoratiuni-pentru-interior' },
      { name: 'Finisaj interior', slug: 'finisaj-interior' },
      { name: 'Grădină', slug: 'gradina' },
      { name: 'Hale metalice, structuri metalice și containere', slug: 'hale-metalice-structuri-metalice-containere' },
      { name: 'Iluminat', slug: 'iluminat' },
      { name: 'Instalații electrice', slug: 'instalatii-electrice' },
      { name: 'Instalații sanitare', slug: 'instalatii-sanitare' },
      { name: 'Instalații termice', slug: 'instalatii-termice' },
      { name: 'Mobilă', slug: 'mobila' },
      { name: 'Scule, unelte, feronerie', slug: 'scule-unelte-feronerie' },
      { name: 'Meseriași - Constructori', slug: 'meseriasi-constructori' },
      { name: 'Artă - Obiecte de colecție', slug: 'arta-obiecte-de-colectie' },
      { name: 'Electrocasnice', slug: 'electrocasnice' },
    ],
  },
  {
    name: 'Mame și copii',
    slug: 'mame-copii',
    iconPath: '/images/category-icons/mamasicopilul.svg',
    subcategories: [
      { name: 'Haine - Încălțăminte copii și gravide', slug: 'haine-incaltaminte-copii-si-gravide' },
      { name: 'La plimbare', slug: 'la-plimbare' },
      { name: 'Jocuri - Jucării', slug: 'jocuri-jucarii' },
      { name: 'Camera copilului', slug: 'camera-copilului' },
      { name: 'Alimentație - Îngrijire', slug: 'alimentatie-ingrijire' },
      { name: 'Articole școlare - Papetărie', slug: 'articole-scolare-papetarie' },
      { name: 'Alte produse copii', slug: 'alte-produse-copii' },
    ],
  },
  {
    name: 'Sport, timp liber, arta',
    slug: 'sport-timp-liber-arta',
    iconPath: '/images/category-icons/sport.svg',
    subcategories: [
      { name: 'Airsoft', slug: 'airsoft' },
      { name: 'Alergare', slug: 'alergare' },
      { name: 'Alpinism, escaladă', slug: 'alpinism-escalada' },
      { name: 'Baschet', slug: 'baschet' },
      { name: 'Baseball', slug: 'baseball' },
      { name: 'Biliard', slug: 'biliard' },
      { name: 'Box', slug: 'box' },
      { name: 'Biciclete – Fitness - Suplimente', slug: 'biciclete-fitness-suplimente' },
      { name: 'Camping', slug: 'camping' },
      { name: 'Dans, gimnastică', slug: 'dans-gimnastica' },
      { name: 'Drumeție', slug: 'drumetie' },
      { name: 'Echitație', slug: 'echitatie' },
      { name: 'Fotbal', slug: 'fotbal' },
      { name: 'Genti, trolere', slug: 'genti-trolere' },
      { name: 'Golf', slug: 'golf' },
      { name: 'Karate - Judo', slug: 'karate-judo' },
      { name: 'Moto, enduro, atv', slug: 'moto-enduro-atv' },
      { name: 'Parașută', slug: 'parasută' },
      { name: 'Pescuit', slug: 'pescuit' },
      { name: 'Sporturi de apă', slug: 'sporturi-de-apa' },
      { name: 'Sporturi de iarnă', slug: 'sporturi-de-iarna' },
      { name: 'Tenis', slug: 'tenis' },
      { name: 'Tir cu arcul', slug: 'tir-cu-arcul' },
      { name: 'Trambuline', slug: 'trambuline' },
      { name: 'Trotinete, role, skateboard', slug: 'trotinete-role-skateboard' },
      { name: 'Vânătoare', slug: 'vanatoare' },
      { name: 'Volei', slug: 'volei' },
      { name: 'Echipamente sportive și de turism', slug: 'echipamente-sportive-si-de-turism' },
      { name: 'Artă - Obiecte de colecție', slug: 'arta-obiecte-de-colectie' },
      { name: 'Cărți - Muzică - Filme', slug: 'carti-muzica-filme' },
      { name: 'Evenimente - Divertisment', slug: 'evenimente-divertisment' },
    ],
  },
  {
    name: 'Agro și industrie',
    slug: 'agro-industrie',
    iconPath: '/images/category-icons/agrosiindustrie.svg',
    subcategories: [
      { name: 'Utilaje agricole și industriale', slug: 'utilaje-agricole-si-industriale' },
      { name: 'Produse piață - Alimentație', slug: 'produse-piata-alimentatie' },
      { name: 'Cereale - Plante - Pomi', slug: 'cereale-plante-pomi' },
      { name: 'Animale domestice și păsări', slug: 'animale-domestice-si-pasari' },
      { name: 'Echipamente și articole zootehnie', slug: 'echipamente-si-articole-zootehnie' },
    ],
  },
  {
    name: 'Servicii, afaceri, echipamente firme',
    slug: 'servicii-afaceri-echipamente',
    iconPath: '/images/category-icons/servicii.svg',
    subcategories: [
      { name: 'Servicii Auto - Transport', slug: 'servicii-auto-transport' },
      { name: 'Meseriași - Constructori', slug: 'meseriasi-constructori' },
      { name: 'Reparații electrocasnice, electronice și telefoane', slug: 'reparatii-electrocasnice-electronice-telefoane' },
      { name: 'Evenimente', slug: 'evenimente' },
      { name: 'Cursuri - Meditații', slug: 'cursuri-meditatii' },
      { name: 'Servicii specializate și servicii pentru afaceri', slug: 'servicii-specializate-si-pentru-afaceri' },
      { name: 'Servicii de înfrumusețare', slug: 'servicii-de-infrumusetare' },
      { name: 'Servicii de curățenie', slug: 'servicii-de-curatenie' },
      { name: 'Servicii diverse', slug: 'servicii-diverse' },
      { name: 'Servicii medicale - Servicii de îngrijire - Croitorie', slug: 'servicii-medicale-ingrijire-croitorie' },
    ],
  },
];

interface AdsProps {
  ads: Ad[];
}

const Ads: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await apiRequest({
          method: 'GET',
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL_GET_AD}`,
          useCredentials: false,
        });
        setAds(response.data);
      } catch (error) {
        setError('Error fetching ads');
        console.error('Error fetching ads:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" role="status">
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  const toggleCategory = (slug: string) => {
    setExpandedCategory(expandedCategory === slug ? null : slug);
  };

  return (
    <div className="container">
      <h1 className="my-4">Categories</h1>
      <Row>
        {categories.map(category => (
          <Col md={3} key={category.slug}>
            <CategoryCard
              name={category.name}
              slug={category.slug}
              iconPath={category.iconPath}
              subcategories={category.subcategories}
              isExpanded={expandedCategory === category.slug}
              onToggle={() => toggleCategory(category.slug)}
            />
          </Col>
        ))}
      </Row>

      <h1 className="my-4">Recent Ads</h1>
      <Row>
        {ads.map(ad => (
          <Col md={4} key={ad.id}>
            <AdCard ad={ad} />
          </Col>
        ))}
      </Row>
    </div>
  );
};
export default Ads;
