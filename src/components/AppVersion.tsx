import React from 'react';

export const AppVersion = () => {
  const version = import.meta.env?.PACKAGE_VERSION;
  const sha = import.meta.env?.GIT_SHA;

  if (!version) return null;

  return (
    <div data-testid="app-version" className="text-xs text-slate-400 text-center">
      v{version}{sha ? ` (${sha})` : ''}
    </div>
  );
};
