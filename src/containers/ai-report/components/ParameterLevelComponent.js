import React from 'react';
import ParameterLevelComponent from './ParameterLevelComponent';
import UniqueInvestmentReadiness from './UniqueInvestmentReadiness';

function CombinedComponent() {
  return (
    <section className="combined-container">
      <div className="left-section">
        <ParameterLevelComponent />
      </div>
      <div className="right-section">
        <UniqueInvestmentReadiness />
      </div>
    </section>
  );
}

export default CombinedComponent;
