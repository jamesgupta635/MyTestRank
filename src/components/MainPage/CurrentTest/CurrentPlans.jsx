import React, { useEffect, useState } from "react";
import "./CurrentTest.css";
import { getAllPlans } from '../../../ApiCall/mainPageLoader';

const CurrentTest = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const data = await getAllPlans();
        setPlans(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlans();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5 text-danger">
        Error loading plans: {error.message}
      </div>
    );
  }

  return (
    <section className="pricing-section" style={{ padding: '40px 12px' }}>
      <h2 className="section-title text-center">Current <span className="highlight">Plans</span></h2>
      <div className="current-test-grid">
        {plans.map((plan, index) => (
          <div key={index} className="current-test-card">
            <div className="pricing-card">
              <img
                src={plan.imageUrl}
                alt={plan.title}
                className="pricing-image"
              />
              <div className="pricing-content">
                <h3 className="plan-title">{plan.title}</h3>
                <div className="course-count">{plan.courses}</div>
                <p className="plan-description">
                  {plan.features && plan.features.map((feature, i) => (
                    <span key={i} className="feature">
                      ✅ {feature}
                    </span>
                  ))}
                </p>
                <p className="price">START FROM <br /><span className="price-value">{plan.price}</span> /MONTH</p>
                <a href="#" className="view-plans">View Plans →</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CurrentTest;
