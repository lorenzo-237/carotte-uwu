import LoaderOP from '../../assets/one_piece_loader.svg';

function Loading() {
  return (
    <div className='flex justify-center items-center min-h-screen'>
      <div className='animate-spin-slow ' role='status'>
        <img src={LoaderOP} alt='Loader' />
      </div>
    </div>
  );
}

export default Loading;
