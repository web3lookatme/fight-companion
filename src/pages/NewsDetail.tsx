import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from '../store';
import type { News } from '../types';
import AnimatedPage from '../components/motion/AnimatedPage';
import Spinner from '../components/ui/Spinner';
import CommentForm from '../components/comments/CommentForm';
import CommentList from '../components/comments/CommentList';

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { fetchNewsById, fetchComments, loading, error } = useStore();
  const [article, setArticle] = useState<News | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (id) {
        const currentArticle = await fetchNewsById(id);
        setArticle(currentArticle || null);
        await fetchComments(`news-${id}`);
      }
    };
    loadData();
  }, [id, fetchNewsById, fetchComments]);

  if (loading && !article) return <Spinner />;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!article) return <div className="text-white text-center text-4xl py-20">Article not found.</div>;

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 py-12">
        <div className="bg-charcoal p-8 rounded-lg shadow-xl">
          <img src={article.image} alt={article.title} className="w-full h-96 object-cover rounded-lg mb-8" />
          <h1 className="text-5xl font-bold text-white mb-4">{article.title}</h1>
          <p className="text-medium-gray text-lg mb-6">{article.source} - {new Date(article.date).toLocaleDateString()}</p>
          <div className="text-light-gray font-sans text-xl leading-relaxed space-y-6">
            <p>{article.summary}</p>
            <p>{article.summary}</p>
            <p>{article.summary}</p>
          </div>
          <CommentList />
          <CommentForm postId={`news-${article.id}`} />
        </div>
      </div>
    </AnimatedPage>
  );
};

export default NewsDetail;