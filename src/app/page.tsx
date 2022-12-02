import SatoriTag from '../components/SatoriTag';

function HomePage() {
  return (
    <>
      <h1 className="text-center">Generate own your tag</h1>
      <div className="flex-center">
        <SatoriTag name="name" email="email" description="description" />
      </div>
    </>
  );
}

export default HomePage;
