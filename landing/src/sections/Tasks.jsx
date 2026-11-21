import BoardDemo from './tasks/BoardDemo.jsx';
import InboxDemo from './tasks/InboxDemo.jsx';
import PrioritiesDemo from './tasks/PrioritiesDemo.jsx';

export default function Tasks() {
  return (
    <section id="tasks" className="sec">
      <div className="wrap"><h2 className="h2 rv" style={{ marginBottom: 40 }}>Your agents do the work. You make the calls.</h2></div>
      <div className="wrap bento">
        <InboxDemo />
        <BoardDemo />
        <PrioritiesDemo />
      </div>
    </section>
  );
}
