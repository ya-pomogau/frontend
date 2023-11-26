import ContentLoader from 'react-content-loader';

interface ISkelitonProp {
  variant: 'avatar' | 'userInfo';
}

const Skeliton = ({ variant }: ISkelitonProp) => (
  <>
    {variant === 'avatar' && (
      <ContentLoader
        speed={1}
        width={175}
        height={175}
        viewBox="0 0 175 175"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <circle cx="89" cy="86" r="84" />
      </ContentLoader>
    )}
    {variant === 'userInfo' && (
      <ContentLoader
        speed={1}
        width={190}
        height={88}
        viewBox="0 0 190 88"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
      >
        <rect x="0" y="49" rx="3" ry="3" width="180" height="15" />
        <rect x="0" y="69" rx="3" ry="3" width="182" height="17" />
        <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
        <rect x="0" y="27" rx="3" ry="3" width="80" height="15" />
        <rect x="0" y="88" rx="3" ry="3" width="180" height="6" />
        <rect x="0" y="6" rx="3" ry="3" width="180" height="16" />
      </ContentLoader>
    )}
  </>
);

export default Skeliton;
