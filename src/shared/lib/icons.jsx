import {
  LayoutGrid, Receipt, Download, Heart, FolderHeart, CreditCard, Bell, Settings,
  Image, UploadCloud, BarChart3, Wallet, Landmark, Users, Star, ShieldAlert, Flag,
} from 'lucide-react';

const ICONS = {
  LayoutGrid, Receipt, Download, Heart, FolderHeart, CreditCard, Bell, Settings,
  Image, UploadCloud, BarChart3, Wallet, Landmark, Users, Star, ShieldAlert, Flag,
};

export function DynamicIcon({ name, className }) {
  const Cmp = ICONS[name];
  if (!Cmp) return null;
  return <Cmp className={className} aria-hidden />;
}
