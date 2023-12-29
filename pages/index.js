import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";

function HomePage(props) {
  // const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventList items={props.events} />
    </div>
  );
}

//🧬🧬[STATIC SITE GENERATION]🧬🧬 How to fetch Static Props Info's 👇
export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}
//🧬🧬[STATIC SITE GENERATION]🧬🧬

export default HomePage;
