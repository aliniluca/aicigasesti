'use client';

import React, { useEffect, useState } from 'react';
import { apiRequest } from '@/utils/axiosApiRequest';
import AdCard from '@/app/components/AdCard';
import { Spinner, Row, Col } from 'react-bootstrap';

interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: string;
  mediaData: { b64: string }[];
}

const CategoryPage = ({ params }: { params: { slug: string } }) => {
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await apiRequest({
          method: 'GET',
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL_GET_ADS_BY_CATEGORY}/${params.slug}`,
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
  }, [params.slug]);

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
      <h1 className="my-4">Ads in {params.slug}</h1>
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

export default CategoryPage;

