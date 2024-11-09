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

const categories = [
  { name: 'Imobiliare', slug: 'imobiliare', iconPath: '/images/category-icons/imobiliare.svg' },
  { name: 'Auto, Moto și Ambarcațiuni', slug: 'auto-moto-ambarcatiuni', iconPath: '/images/category-icons/auto.svg' },
  { name: 'Electronice și electrocasnice', slug: 'electronice-electrocasnice', iconPath: '/images/category-icons/electronice.svg' },
  { name: 'Modă și frumusețe', slug: 'moda-frumusete', iconPath: '/images/category-icons/moda.svg' },
  { name: 'Casă și grădină', slug: 'casa-gradina', iconPath: '/images/category-icons/casasigradina.svg' },
  { name: 'Mame și copii', slug: 'mame-copii', iconPath: '/images/category-icons/mamasicopilul.svg' },
  { name: 'Sport, timp liber, arta', slug: 'sport-timp-liber-arta', iconPath: '/images/category-icons/sport.svg' },
  { name: 'Agro și industrie', slug: 'agro-industrie', iconPath: '/images/category-icons/agrosiindustrie.svg' },
  { name: 'Servicii, afaceri, echipamente firme', slug: 'servicii-afaceri-echipamente', iconPath: '/images/category-icons/servicii.svg' }
];

const Ads: React.FC = () => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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
