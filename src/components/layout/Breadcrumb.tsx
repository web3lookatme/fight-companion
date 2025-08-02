import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useStore } from '../../store';
import type { Fighter, Event, News } from '../../types';

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const { fighters, events, news } = useStore();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const getBreadcrumbName = (name: string, index: number) => {
    if (pathnames[index - 1] === 'fighters' && fighters) {
      const fighter = fighters.find((f: Fighter) => f.id === parseInt(name));
      return fighter ? fighter.name : name;
    }
    if (pathnames[index - 1] === 'events' && events) {
      const event = events.find((e: Event) => e.id === parseInt(name));
      return event ? event.name : name;
    }
    if (pathnames[index - 1] === 'news' && news) {
      const article = news.find((n: News) => n.id === parseInt(name));
      return article ? article.title : name;
    }
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  return (
    <nav className="mb-6 text-lg">
      <Link to="/" className="text-medium-gray hover:text-gold">Home</Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const name = getBreadcrumbName(value, index + 1);

        return isLast ? (
          <span key={to} className="text-white">
            <span className="mx-2">/</span> {name}
          </span>
        ) : (
          <Link key={to} to={to} className="text-medium-gray hover:text-gold">
            <span className="mx-2">/</span> {name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
