interface IProps {
  imageUrl: string;
  alt: string;
  className?: string;
}

function Image({imageUrl, alt, className}: IProps) {
  return <img className={className} src={imageUrl} alt={alt} />;
}

export default Image;
