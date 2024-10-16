import styles from './styles.module.css';

interface SearchButtonProps {
  text: string;
  onClick?: () => void;
}

function SearchButton({ text, onClick }: SearchButtonProps) {
  return (
    <button className={styles.find_btn} onClick={onClick}>
      <div className={styles.find_btn_container}>
        <svg
          width="31"
          height="14"
          viewBox="0 0 31 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.0587 0.056338L0.303847 6.39437C0.151886 6.39437 0 6.52111 0 6.77463C0 6.90139 0.151886 7.02822 0.303847 7.15498L19.9068 14C20.0588 14 20.2108 14 20.3628 13.8733C20.5147 13.7465 20.5147 13.6198 20.5147 13.493L17.4755 7.28171L30.544 7.40844C30.848 7.40844 31 7.28169 31 7.02817C31 6.77465 30.848 6.6479 30.544 6.6479L17.4755 6.52117L20.6666 0.436604V0.309875C20.6666 0.183114 20.6666 0.183099 20.5147 0.056338C20.3627 0.056338 20.2107 -0.0704225 20.0587 0.056338ZM16.4116 6.77463V6.90144V7.02817L19.2989 12.8592L1.67153 6.6479L19.4508 0.943677L16.4116 6.77463Z"
            fill="#FBFDFF"
          />
        </svg>

        {text}
      </div>
    </button>
  );
}

export default SearchButton;
