'use client';

import React, { useEffect, useState } from 'react';
import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import AdCard from '@/app/components/AdCard';
import { apiRequest } from '@/utils/axiosApiRequest';

interface Media {
  b64: string;
}

interface Ad {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  type: string;
  mediaData: Media[];
}

interface PageProps {
  params: {
    categorySlug: string;
    subcategorySlug: string;
  };
}

const SubcategoryAdsPage: React.FC<PageProps> = ({ params }) => {
  const { categorySlug, subcategorySlug } = params;
  const [ads, setAds] = useState<Ad[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAds = async () => {
      try {
        const response = await apiRequest({
          method: 'GET',
          url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/ads/category/${categorySlug}/subcategory/${subcategorySlug}`,
        });
        setAds(response.data.data as Ad[]);
      } catch (err: any) {
        setError(err.message || 'Unexpected error occurred.');
        console.error('Error fetching ads:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [categorySlug, subcategorySlug]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading ads...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div className="container mt-4">
      <h1 className="my-4">
        Ads in Subcategory: {subcategorySlug.replace(/-/g, ' ')}
      </h1>
      <Row>
        {ads.length > 0 ? (
          ads.map(ad => (
            <Col md={4} key={ad.id}>
              <AdCard ad={ad} />
            </Col>
          ))
        ) : (
          <Col>
            <p>No ads found in this subcategory.</p>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default SubcategoryAdsPage; 