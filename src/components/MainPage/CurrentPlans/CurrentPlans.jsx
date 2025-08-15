import React, { useEffect, useState } from "react";
import "./CurrentPlan.css";
import { getAllPlans } from '../../../ApiCall/mainPageLoader';

const CurrentPlan = () => {
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
      <div className="current-plan-grid">
        {plans.map((plan, index) => (
          <div key={plan.id || index} className="current-plan-card">
            <div className="pricing-card">
              <div className="discount-badge">
                {plan.discount}% OFF
              </div>
              <img
                src={plan.imageUrl}
                alt={plan.titleOfPlan}
                className="pricing-image"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/300x200?text=Plan+Image';
                }}
              />
              <div className="pricing-content">
                <h3 className="plan-title">{plan.titleOfPlan}</h3>
                <div className="plan-duration">{plan.totalDay} Days Plan</div>
                
                <div className="features-list">
                  {plan.features && plan.features.map((feature, i) => (
                    <div key={i} className="feature-item">
                      <span className="feature-icon">✅</span>
                      <span className="feature-text">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="price-section">
                  <div className="original-price">
                    <span className="currency">₹</span>
                    <span className="amount">{Math.round(plan.price + (plan.price * plan.discount / 100))}</span>
                  </div>
                  <div className="discounted-price">
                    <span className="currency">₹</span>
                    <span className="amount">{plan.price}</span>
                    <span className="period"></span>
                  </div>
                  <div className="savings">
                    Save ₹{Math.round(plan.price * plan.discount / 100)}
                  </div>
                </div>
                
                <button className="view-plans-btn">
                  Get Started →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CurrentPlan;
