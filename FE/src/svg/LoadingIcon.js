export const LoadingIcon = ({ className }) => (
  <svg xmlns='http://www.w3.org/2000/svg' className={`animate-spin ${className}`} width='24' height='24' fill='none' viewBox='0 0 24 24'>
    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8v4a4 4 0 100 8v4a8 8 0 01-8-8z'></path>
  </svg>
);
