import { useSettingsStore } from '@/stores/settings-store';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export function UpgradeView() {
  const plan = useSettingsStore((state) => state.plan);

  const features = {
    free: ['Basic rich-text editing', 'Up to 20 notes', 'Local storage'],
    premium: [
      'Advanced rich-text editing',
      'Unlimited notes',
      'Cloud sync',
      'Collaboration features',
      'Export to DOCX/Markdown',
      'Priority support',
    ],
  };

  return (
    <div className="p-8">
      <h1 className="mb-6 text-3xl font-bold">Upgrade to Premium</h1>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border p-6">
          <h2 className="mb-4 text-2xl font-bold">Free</h2>
          <p className="mb-4 text-3xl font-bold">$0</p>
          <ul className="mb-6 space-y-2">
            {features.free.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Button disabled={plan === 'free'} variant="outline" className="w-full">
            {plan === 'free' ? 'Current Plan' : 'Downgrade'}
          </Button>
        </div>

        <div className="rounded-lg border-2 border-primary p-6">
          <h2 className="mb-4 text-2xl font-bold">Premium</h2>
          <p className="mb-4 text-3xl font-bold">
            $9<span className="text-base font-normal">/month</span>
          </p>
          <ul className="mb-6 space-y-2">
            {features.premium.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-600" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          <Button disabled={plan === 'premium'} className="w-full">
            {plan === 'premium' ? 'Current Plan' : 'Upgrade Now'}
          </Button>
        </div>
      </div>
    </div>
  );
}

