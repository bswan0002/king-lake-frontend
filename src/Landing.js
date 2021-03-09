const Landing = () => {
  return (
    <div
      className="landing-div"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + `/landing-2.jpg`})`,
      }}
    >
      <h1 className="landing-header">Members Only</h1>
    </div>
  );
};

export default Landing;
