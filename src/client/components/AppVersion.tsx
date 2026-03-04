import React from 'react';
import { Label } from '@/client/components/shared/label';

export const AppVersion = () => {
  // @ts-ignore
  const version = (typeof process !== 'undefined' && process.env?.PACKAGE_VERSION) || '0.0.0';
  // @ts-ignore
  const sha = (typeof process !== 'undefined' && process.env?.GIT_SHA) || '';

  if (!version) return null;

  return (
    <div className="flex items-center gap-2">
      <Label data-testid="app-version" className="text-[color:#C5A55A] text-sm font-semibold tracking-wide">
        v{version}
      </Label>
      {sha && <span className="text-[color:#A09080] text-xs font-medium opacity-70">({sha})</span>}
    </div>
  );
};
