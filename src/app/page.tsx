import SatoriTag from '../components/SatoriTag';

function HomePage() {
  return (
    <>
      <h1 className="mt-10 text-4xl font-bold text-center">Generate own your tag</h1>
      <div className="flex justify-center items-center">
        <SatoriTag name="JHSeo" email="qnfqnfqnf@gmail.com" />
      </div>
    </>
  );
}

export default HomePage;
