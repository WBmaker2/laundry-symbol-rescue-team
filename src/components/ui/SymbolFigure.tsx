import type { CareSymbol } from '../../domain/careTypes';
import type { RefObject } from 'react';
import { isRenderableSymbol } from '../../content/validateSymbolCatalog';

const displayKindLabels: Record<CareSymbol['displayKind'], string> = {
  'official-standard-symbol': '공식 취급 표시',
  'learning-icon': '학습용 아이콘',
};

function assetUrl(assetPath: CareSymbol['assetPath']): string {
  const baseUrl = import.meta.env.BASE_URL || '/';
  const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${base}${assetPath.replace(/^\/+/, '')}`;
}

export function SymbolFigure({
  symbol,
  expanded,
  descriptionRef,
}: {
  symbol: CareSymbol;
  expanded: boolean;
  descriptionRef?: RefObject<HTMLParagraphElement | null> | undefined;
}) {
  if (!isRenderableSymbol(symbol)) {
    return (
      <div className="symbol-figure" role="alert">
        <p>표시 이미지를 안전하게 불러올 수 없어요.</p>
      </div>
    );
  }
  return (
    <div className={`symbol-figure${expanded ? ' symbol-figure-expanded' : ''}`} data-symbol-id={symbol.id}>
      <img
        className={`symbol-image${expanded ? ' symbol-image-expanded' : ''}`}
        src={assetUrl(symbol.assetPath)}
        alt={symbol.accessibleDescription}
      />
      <div className="symbol-text-description">
        <h3>{symbol.name}</h3>
        <p>{symbol.categoryHint}</p>
        <p>{displayKindLabels[symbol.displayKind]}</p>
        <p ref={descriptionRef} className="symbol-description-focus" data-testid="symbol-description" tabIndex={-1}>{symbol.shortDescription}</p>
      </div>
    </div>
  );
}
