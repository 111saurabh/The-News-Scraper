import Card from "./Card";
import "./hero.css";

function Tours({ tours }) {
  return (
    <div className="  pureprlagao   rounded-xl">
      <div className="cards rounded-xl">
        {tours.map((tour) => (
          <Card key={tour.url} {...tour} />
        ))}
      </div>
    </div>
  );
}

export default Tours;
