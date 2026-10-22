import React, { createContext, useContext, useEffect, useState } from 'react';

interface RouterContextType {
  path: string;
  navigate: (to: string) => void;
  searchParams: URLSearchParams;
  setSearchParams: (params: Record<string, string>) => void;
}

const RouterContext = createContext<RouterContextType | null>(null);

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [path, setPath] = useState<string>(() => {
    if (typeof window === 'undefined') return '/';
    return window.location.pathname || '/';
  });

  const [searchParams, setParamsState] = useState<URLSearchParams>(() => {
    if (typeof window === 'undefined') return new URLSearchParams();
    return new URLSearchParams(window.location.search);
  });

  useEffect(() => {
    const handlePopState = () => {
      setPath(window.location.pathname || '/');
      setParamsState(new URLSearchParams(window.location.search));
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string) => {
    if (to === path && window.location.search === '') return;
    window.history.pushState({}, '', to);
    const [pathname, search] = to.split('?');
    setPath(pathname || '/');
    setParamsState(new URLSearchParams(search || ''));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setSearchParams = (params: Record<string, string>) => {
    const newParams = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        newParams.set(key, val);
      }
    });
    const newUrl = `${window.location.pathname}${newParams.toString() ? '?' + newParams.toString() : ''}`;
    window.history.pushState({}, '', newUrl);
    setParamsState(newParams);
  };

  return (
    <RouterContext.Provider value={{ path, navigate, searchParams, setSearchParams }}>
      {children}
    </RouterContext.Provider>
  );
};

export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
}

export const Link: React.FC<{
  to: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  title?: string;
  'aria-label'?: string;
  tabIndex?: number;
}> = ({ to, className, children, onClick, title, 'aria-label': ariaLabel, tabIndex }) => {
  const { navigate } = useRouter();

  return (
    <a
      href={to}
      className={className}
      title={title}
      aria-label={ariaLabel}
      tabIndex={tabIndex}
      onClick={(e) => {
        // Allow cmd/ctrl + click to open in new tab
        if (e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        if (onClick) onClick();
        navigate(to);
      }}
    >
      {children}
    </a>
  );
};
