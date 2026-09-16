import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@shared/ui/atoms/Button';
import { LicenseSelector } from '@features/purchase-asset/ui/LicenseSelector';
import { useCartStore } from '@features/purchase-asset/model/useCart';
import { useI18n } from '@shared/i18n/LocaleProvider';

export function BuyPanel({ asset }) {
  const { t } = useI18n();
  const [license, setLicense] = useState(asset.licenses[0]);
  const addItem = useCartStore((s) => s.addItem);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      <LicenseSelector asset={asset} value={license} onChange={setLicense} />
      <Button
        variant="accent"
        size="lg"
        iconLeft={<ShoppingBag />}
        onClick={() => {
          addItem(asset, license);
          navigate('/checkout');
        }}
      >
        {t('common.buyLicense')}
      </Button>
      <Button variant="secondary" size="md" onClick={() => addItem(asset, license)}>
        {t('common.addToCart')}
      </Button>
    </div>
  );
}
