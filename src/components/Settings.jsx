export default function Settings({ setUser, setRoom }) {
  //to do label
  return (
    <div className="settings">
      <div>
        <p>Ваше имя</p>
        <input onChange={(e) => setUser(e.target.value)} />
      </div>
      <div>
        <p>Комната</p>
        <input onChange={(e) => setRoom(e.target.value)} />
      </div>
    </div>
  );
}
