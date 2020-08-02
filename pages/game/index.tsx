import { useRouter } from 'next/router';
import useSWR from 'swr';

const fetcher = async (route) => {
  const res = await fetch(route);

  return res.json();
};

function City() {
  const { data } = useSWR(`/api/game/list`, fetcher);

  if (!data) {
    return 'Loading...';
  }

  return (
    <div>
      <p>Games: {data}</p>
    </div>
  );
}

export default City;
