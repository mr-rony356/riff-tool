import React from 'react';
// import { MemberStack } from '@memberstack/react';

export default function PremiumContent() {
  return (
    // <MemberStack.Visibility allowMembers="premium">
      <div className="mt-4 p-4 border rounded-lg bg-yellow-100">
        <h2 className="text-xl font-semibold">Premium Content</h2>
        <p>Access exclusive features by signing up for premium.</p>
      </div>
    // </MemberStack.Visibility>
  );
}
