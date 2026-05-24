import React, { useEffect, useState } from "react";

function BrahmsFinder() {
  const [data, setData] = useState({ generatedAt: "", month: "", items: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/data/brahms-performances.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Could not load Brahms performance data.");
        }
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <main className="page page--brahms-finder">
      <section className="container">
        <h1>Brahms in London Next Month</h1>
        <p>A curated list of upcoming London performances featuring Brahms.</p>

        {loading && <p>Loading performances…</p>}
        {error && <p>{error}</p>}

        {!loading && !error && (
          <>
            <p><strong>Month:</strong> {data.month || "Not available yet"}</p>
            <p><strong>Last updated:</strong> {data.generatedAt || "Not available yet"}</p>

            {data.items.length === 0 ? (
              <p>No performances found yet.</p>
            ) : (
              <ul className="brahms-performance-list">
                {data.items.map((item, index) => (
                  <li key={`${item.source}-${item.url}-${index}`} className="brahms-performance-card">
                    <h2>{item.title}</h2>
                    <p><strong>Date:</strong> {item.date}</p>
                    <p><strong>Venue:</strong> {item.venue}</p>
                    <p><strong>Source:</strong> {item.source}</p>
                    <p><strong>Programme:</strong> {item.programme}</p>
                    {item.url && (
                      <p>
                        <a href={item.url} target="_blank" rel="noreferrer">
                          View event
                        </a>
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </section>
    </main>
  );
}

export default BrahmsFinder;
