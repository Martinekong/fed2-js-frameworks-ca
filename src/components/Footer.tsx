import { useState } from 'react';

export default function Footer() {
  const [currentYear] = useState(() => new Date().getFullYear());

  return (
    <div className="p-20 bg-[#2C2C2C] text-center mt-20">
      <p className="text-white">
        &copy; {currentYear} Martine Kongsrud. All rights reserved.
      </p>
    </div>
  );
}
