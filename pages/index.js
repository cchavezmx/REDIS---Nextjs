import Head from 'next/head'
import styles from '../styles/Home.module.css'
import useSWR from 'swr';

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function Home() {
  function refresh(e) {
    e.preventDefault();
    window.location.reload();
  }
  const { data, error } = useSWR("api/data", fetcher);
  if (error) return "An error has occurred.";
  if (!data) return "Loading...";
  return (
    <div className={styles.container}>
      <Head>
        <title>Covid Tracker</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Covid Tracker</h1>

        <p className={styles.description}>
          Top 10 countries with the most cases today
        </p>

        <div className={styles.grid}>
          <div className={styles.card} onClick={refresh}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Country</th>
                  <th>Today Cases</th>
                  <th>Today Deaths</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((item) => (
                  <tr key={item.id}>
                    <td>{item.country}</td>
                    <td>{item.todayCases}</td>
                    <td>{item.todayDeaths}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <br />
            <em>
              Loaded from {data.type} in <b>{data.latency}</b> milliseconds.
              Click to reload.
            </em>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        This is a sample project for the blogpost &nbsp;
        <a
          href="https://blog.upstash.com/nextjs-caching-with-redis"
          target="_blank"
          rel="noopener noreferrer"
        >
          Speed up your Next.js application using Serverless Redis for caching.
        </a>
      </footer>
    </div>
  );
}