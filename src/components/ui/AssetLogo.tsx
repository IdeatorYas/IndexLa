import { ASSETS, type AssetKey } from "@/lib/site";

type AssetLogoProps = {
  asset: AssetKey;
  size?: number;
  className?: string;
};

export function AssetLogo({ asset, size = 28, className = "" }: AssetLogoProps) {
  const data = ASSETS[asset];
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={data.src}
      alt={data.name}
      width={size}
      height={size}
      className={`object-contain ${className}`}
      decoding="async"
      loading="lazy"
      draggable={false}
      title={data.name}
    />
  );
}
