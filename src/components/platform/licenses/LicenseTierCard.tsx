import React from "react";

interface Tier {
  name: string;
  price: number;
  features: string[];
}

interface LicenseTierCardProps {
  tier: Tier;
  onSelect: (tier: Tier) => void;
}

export function LicenseTierCard({ tier, onSelect }: LicenseTierCardProps) {
  const handleSelect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onSelect(tier);
  };

  return (
    <div>
      <h2>{tier.name}</h2>
      <p>Price: ${tier.price}</p>
      <ul>
        {tier.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <button onClick={handleSelect}>Select</button>
    </div>
  );
}
