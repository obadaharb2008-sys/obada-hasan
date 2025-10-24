import { useEffect } from 'react';

/**
 * Custom Hook for Dynamic SEO Meta Tags Management
 * Updates page title and meta tags for better SEO performance
 * 
 * Usage:
 * useSEO({
 *   title: "Page Title",
 *   description: "Page Description",
 *   keywords: "keyword1, keyword2",
 *   ogImage: "image-url",
 *   ogTitle: "OG Title",
 *   ogDescription: "OG Description",
 *   canonicalUrl: "url"
 * })
 */

export const useSEO = (seoData = {}) => {
  const defaultSEO = {
    title: "البيت التعليمي لتكنولوجيا المعلومات | BTEC Level 3 | عبادة غسان حسن",
    description: "البيت التعليمي المتخصص في تكنولوجيا المعلومات والبرمجة والأمن السيبراني في الأردن",
    keywords: "البيت التعليمي، تكنولوجيا المعلومات، الأردن، BTEC، برمجة",
    ogTitle: "البيت التعليمي لتكنولوجيا المعلومات",
    ogDescription: "مركز تدريب متخصص في BTEC والبرمجة والأمن السيبراني",
    ogImage: "https://obada-portfolio.onrender.com/obada.jpeg",
    ogType: "website",
    canonicalUrl: "https://obada-portfolio.onrender.com",
    twitterCard: "summary_large_image",
    author: "عيادة غسان حسن",
  };

  const seo = { ...defaultSEO, ...seoData };

  useEffect(() => {
    // Update document title
    document.title = seo.title;

    // Helper function to update or create meta tags
    const updateMetaTag = (name, content, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      
      meta.setAttribute('content', content);
    };

    // Update meta tags
    updateMetaTag('description', seo.description);
    updateMetaTag('keywords', seo.keywords);
    updateMetaTag('author', seo.author);
    updateMetaTag('og:title', seo.ogTitle, true);
    updateMetaTag('og:description', seo.ogDescription, true);
    updateMetaTag('og:image', seo.ogImage, true);
    updateMetaTag('og:type', seo.ogType, true);
    updateMetaTag('twitter:card', seo.twitterCard);
    updateMetaTag('twitter:title', seo.ogTitle);
    updateMetaTag('twitter:description', seo.ogDescription);
    updateMetaTag('twitter:image', seo.ogImage);

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = seo.canonicalUrl;

    // Add structured data if needed
    if (seo.structuredData) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(seo.structuredData);
      document.head.appendChild(script);
    }

  }, [seo]);
};

export default useSEO;