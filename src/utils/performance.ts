// Performance optimization utilities

// Lazy load images with intersection observer
export const lazyLoadImages = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src || '';
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

// Preload critical resources
export const preloadCriticalResources = () => {
  // Preload critical CSS
  const criticalCSS = document.createElement('link');
  criticalCSS.rel = 'preload';
  criticalCSS.as = 'style';
  criticalCSS.href = '/src/index.css';
  document.head.appendChild(criticalCSS);
};

// Optimize third-party scripts
export const optimizeThirdPartyScripts = () => {
  // Defer non-critical scripts
  const scripts = document.querySelectorAll('script[data-defer]');
  scripts.forEach(script => {
    const newScript = document.createElement('script');
    newScript.src = script.getAttribute('data-src') || '';
    newScript.defer = true;
    document.head.appendChild(newScript);
  });
};

// Web Vitals monitoring (optional)
export const initWebVitals = async () => {
  if (import.meta.env.PROD) {
    try {
      // Optional: Install web-vitals package for production monitoring
      // const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');
      // getCLS(console.log);
      // getFID(console.log);
      // getFCP(console.log);
      // getLCP(console.log);
      // getTTFB(console.log);
      console.log('Web Vitals monitoring ready (install web-vitals package to enable)');
    } catch (error) {
      console.warn('Web Vitals not available:', error);
    }
  }
};

// Initialize all performance optimizations
export const initPerformanceOptimizations = () => {
  // Run after DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      lazyLoadImages();
      preloadCriticalResources();
      optimizeThirdPartyScripts();
    });
  } else {
    lazyLoadImages();
    preloadCriticalResources();
    optimizeThirdPartyScripts();
  }
  
  // Initialize web vitals monitoring
  initWebVitals();
};