import { useState } from 'react';
import { X } from 'lucide-react';
import { enquiryApi } from '../../api';
import { useToast } from '../../context/ToastContext';
import { Button } from '../ui/Button';
import { Input, TextArea } from '../ui/Input';

interface EnquiryModalProps {
  open: boolean;
  onClose: () => void;
  defaults?: {
    destination?: string;
    packageId?: string;
    type?: string;
  };
}

export function EnquiryModal({ open, onClose, defaults }: EnquiryModalProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    travelDate: '',
    travelers: '2',
    destination: defaults?.destination || '',
    budget: '',
    message: '',
  });

  if (!open) return null;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await enquiryApi.create({
        ...form,
        travelers: Number(form.travelers),
        budget: form.budget ? Number(form.budget) : undefined,
        package: defaults?.packageId,
        type: defaults?.type || 'package',
      });
      setDone(true);
      toast('Enquiry submitted successfully', 'success');
    } catch {
      toast('Could not submit enquiry. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/50 p-0 sm:items-center sm:p-4">
      <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-white p-5 shadow-soft sm:rounded-3xl sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-extrabold">Get a free quote</h2>
            <p className="mt-1 text-sm text-muted">Our travel expert will contact you shortly.</p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-2 hover:bg-canvas">
            <X className="h-5 w-5" />
          </button>
        </div>

        {done ? (
          <div className="rounded-2xl bg-emerald-50 px-4 py-8 text-center">
            <p className="font-bold text-emerald-800">
              Thank you! Our travel expert will contact you shortly.
            </p>
            <Button className="mt-4" onClick={onClose}>
              Close
            </Button>
          </div>
        ) : (
          <form className="grid gap-3" onSubmit={submit}>
            <Input
              label="Name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Input
              label="Phone"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
            <Input
              label="Email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Travel date"
                type="date"
                value={form.travelDate}
                onChange={(e) => setForm({ ...form, travelDate: e.target.value })}
              />
              <Input
                label="Travelers"
                type="number"
                min={1}
                value={form.travelers}
                onChange={(e) => setForm({ ...form, travelers: e.target.value })}
              />
            </div>
            <Input
              label="Destination"
              value={form.destination}
              onChange={(e) => setForm({ ...form, destination: e.target.value })}
            />
            <Input
              label="Budget"
              type="number"
              value={form.budget}
              onChange={(e) => setForm({ ...form, budget: e.target.value })}
            />
            <TextArea
              label="Message"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <Button type="submit" disabled={loading} className="mt-2 w-full">
              {loading ? 'Submitting…' : 'Submit enquiry'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
