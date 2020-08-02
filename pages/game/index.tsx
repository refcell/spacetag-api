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
  console.log(data);

  return (
    <div>
      <h2>Games</h2>
      <ol>
        {data ? data.res.map((game) => {
          return (<li key={game.gameID}>{game.gameID}</li>)
        }) : ""}
      </ol>
    </div>
  );
}

export default City;
