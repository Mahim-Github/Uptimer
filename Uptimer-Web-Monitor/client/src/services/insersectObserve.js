export default function insertSectObserve(sectionRef, callback, threshold) {
  const section = sectionRef.current;

  // Intersection Observer callback
  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(); // Trigger the animation when 30% is visible
        observer.unobserve(entry.target); // Stop observing after the animation
      }
    });
  };

  // Intersection Observer options
  const observerOptions = {
    root: null, // Default to viewport
    threshold, // Trigger when 30% of the element is visible
  };

  // Create the observer
  const observer = new IntersectionObserver(observerCallback, observerOptions);
  observer.observe(section); // Start observing the section

  // Cleanup observer when the component unmounts
  return () => {
    if (section) observer.unobserve(section);
  };
}
