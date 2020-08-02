import { useRouter } from 'next/router';
import useSWR from 'swr';

const fetcher = async (route) => {
  const res = await fetch(route);

  return res.json();
};

function City() {
  const { data } = useSWR(`/api/user/list`, fetcher);

  if (!data) {
    return 'Loading...';
  }

  return (
    <div>
      <p>Users: {data}</p>
    </div>
  );
}

export default City;
