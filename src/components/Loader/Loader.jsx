import { TailSpin } from 'react-loader-spinner';

const LoaderSpiner = () => {
  const style = {
    display: 'flex',
    justifyContent: 'center',
    aligniitems: 'center',
  };
  return (
    <div style={style}>
      <TailSpin color="#00BFFF" height={80} width={80} />
    </div>
  );
};

export default LoaderSpiner;